import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase'; // Tu configuración de Firebase
import { signOut } from 'firebase/auth';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function Dashboard() {

  return (
    <AdminLayout title="Panel Principal">
          

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Área de Scroll */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          
          {/* Tarjetas de Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Solicitudes Hoy" value="12" icon={<FileText />} color="bg-blue-500" />
            <StatCard title="Ingresos Mes" value="S/ 24,500" icon={<TrendingUp />} color="bg-green-500" />
            <StatCard title="Pendientes" value="5" icon={<AlertCircle />} color="bg-orange-500" />
            <StatCard title="Servicios Completados" value="148" icon={<CheckCircle />} color="bg-purple-500" />
          </div>

          {/* Sección de Contenido: Tabla Reciente */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Solicitudes Recientes</h3>
              <button className="text-blue-600 text-sm font-semibold hover:underline">Ver todas</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Cliente</th>
                    <th className="px-6 py-4 font-semibold">Servicio</th>
                    <th className="px-6 py-4 font-semibold">Estado</th>
                    <th className="px-6 py-4 font-semibold">Fecha</th>
                    <th className="px-6 py-4 font-semibold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <TableRow name="Hospital Central" service="Aire Acondicionado" status="Pendiente" date="Hoy, 10:00 AM" />
                  <TableRow name="Fabrica Textil Peru" service="Electricidad Industrial" status="En Proceso" date="Ayer, 4:30 PM" />
                  <TableRow name="Condominio Los Olivos" service="Pozo a Tierra" status="Completado" date="28 Nov, 2025" />
                  <TableRow name="Juan Pérez" service="Repuestos" status="Cancelado" date="27 Nov, 2025" />
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </AdminLayout>
  );
}

// --- SUB-COMPONENTES ---


function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${color}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      </div>
    </div>
  );
}

function TableRow({ name, service, status, date }) {
  const getStatusColor = (s) => {
    switch(s) {
      case 'Pendiente': return 'bg-orange-100 text-orange-600';
      case 'En Proceso': return 'bg-blue-100 text-blue-600';
      case 'Completado': return 'bg-green-100 text-green-600';
      case 'Cancelado': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition">
      <td className="px-6 py-4 font-medium text-slate-900">{name}</td>
      <td className="px-6 py-4 text-slate-600">{service}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(status)}`}>{status}</span>
      </td>
      <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
        <Clock size={14} /> {date}
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-slate-400 hover:text-blue-600 transition font-bold">Ver</button>
      </td>
    </tr>
  );
}