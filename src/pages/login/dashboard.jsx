import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { 
  Users, FileText, TrendingUp, AlertCircle, Clock, ArrowRight, 
  Zap, Calendar, MapPin, User 
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, quotes: 0, income: 0 });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [todaysVisits, setTodaysVisits] = useState([]); // NUEVO: Visitas de hoy
  const [loading, setLoading] = useState(true);

  // Función para obtener fecha local "YYYY-MM-DD"
  const getTodayString = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsSnap = await getDocs(collection(db, "clientes"));
        const quotesSnap = await getDocs(collection(db, "cotizaciones"));
        
        // 1. Estadísticas Generales y Top Servicios
        let totalIncome = 0;
        const serviceMap = {}; 

        quotesSnap.forEach(doc => {
          const data = doc.data();
          const amount = Number(data.amount) || 0;
          const service = data.service || "Otros";
          
          totalIncome += amount; // Sumar ingreso total

          if (serviceMap[service]) {
            serviceMap[service] += amount;
          } else {
            serviceMap[service] = amount;
          }
        });

        // Ordenar servicios
        const servicesArray = Object.keys(serviceMap)
          .map(key => ({ name: key, total: serviceMap[key] }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 4);

        setStats({
          clients: clientsSnap.size,
          quotes: quotesSnap.size,
          income: totalIncome
        });
        setTopServices(servicesArray);

        // 2. Obtener Cotizaciones Recientes
        const qRecent = query(collection(db, "cotizaciones"), orderBy("date", "desc"), limit(5));
        const recentSnap = await getDocs(qRecent);
        setRecentQuotes(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // 3. NUEVO: Obtener Visitas de HOY
        const todayStr = getTodayString();
        // Nota: En producción, asegúrate de tener un índice compuesto si usas where + orderBy
        // Aquí filtramos en cliente por simplicidad si la base es pequeña, 
        // o usamos una query simple.
        const qVisits = query(collection(db, "visitas"), where("date", "==", todayStr));
        const visitsSnap = await getDocs(qVisits);
        const visitsData = visitsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setTodaysVisits(visitsData);
        setLoading(false);

      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aprobado': return 'bg-green-100 text-green-700';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700';
      case 'Rechazado': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <AdminLayout title="Panel Principal">
      
      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Clientes" value={stats.clients} icon={<Users />} color="bg-blue-500" />
        <StatCard title="Cotizaciones" value={stats.quotes} icon={<FileText />} color="bg-purple-500" />
        <StatCard title="Ingresos Totales" value={`S/ ${stats.income.toLocaleString()}`} icon={<TrendingUp />} color="bg-green-500" />
        {/* Usamos la tarjeta de pendientes para mostrar visitas de hoy */}
        <StatCard title="Visitas para Hoy" value={todaysVisits.length} icon={<Calendar />} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA (2/3): TABLAS DE ACTIVIDAD */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. SECCIÓN NUEVA: VISITAS DE HOY */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-blue-50">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Calendar size={20} className="text-blue-600"/> Agenda del Día
              </h3>
              <Link to="/dashboard/agenda" className="text-xs font-bold text-blue-600 hover:underline">Ver Calendario Completo</Link>
            </div>
            
            {loading ? (
              <div className="p-6 text-center text-slate-400">Cargando agenda...</div>
            ) : todaysVisits.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {todaysVisits.map((visit) => (
                  <div key={visit.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded text-sm min-w-[60px] text-center">
                        {visit.time}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{visit.client}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin size={12}/> {visit.address}
                        </p>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-600 justify-end">
                        <User size={12}/> {visit.tech}
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        visit.status === 'En Curso' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {visit.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <p>No hay visitas programadas para hoy.</p>
                <Link to="/dashboard/agenda" className="text-blue-500 text-sm hover:underline mt-2 inline-block">Programar una ahora</Link>
              </div>
            )}
          </div>

          {/* 2. COTIZACIONES RECIENTES */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-lg">Últimas Cotizaciones</h3>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Recientes</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-slate-400 animate-pulse">Cargando...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                    <tr>
                      <th className="px-6 py-4">Cliente</th>
                      <th className="px-6 py-4">Servicio</th>
                      <th className="px-6 py-4">Monto</th>
                      <th className="px-6 py-4 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {recentQuotes.length > 0 ? (
                      recentQuotes.map((quote) => (
                        <tr key={quote.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-medium text-slate-900">{quote.client}</td>
                          <td className="px-6 py-4 text-slate-600 truncate max-w-[150px]">{quote.service}</td>
                          <td className="px-6 py-4 font-bold text-slate-700">S/ {Number(quote.amount).toLocaleString()}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(quote.status)}`}>
                              {quote.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">Sin actividad reciente.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA (1/3): TOP SERVICIOS */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Zap size={20} /></div>
            <h3 className="font-bold text-slate-800 text-lg">Top Servicios</h3>
          </div>

          {loading ? (
            <div className="text-center text-slate-400 py-4">Calculando...</div>
          ) : (
            <div className="space-y-6">
              {topServices.length > 0 ? (
                topServices.map((service, index) => {
                  const percentage = stats.income > 0 ? (service.total / stats.income) * 100 : 0;
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">{service.name}</span>
                        <span className="font-bold text-slate-900">S/ {service.total.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-400 text-right mt-1">{percentage.toFixed(1)}%</div>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-400 text-sm">No hay datos suficientes.</p>
              )}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 py-2 rounded-lg transition">
              Ver reporte completo <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${color} shadow-lg shadow-opacity-20`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      </div>
    </div>
  );
}