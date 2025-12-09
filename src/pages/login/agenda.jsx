import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore'; // Agregamos getDocs
import { 
  Plus, Calendar, MapPin, Clock, User, CheckCircle, 
  X, Trash2, Database, AlertCircle 
} from 'lucide-react';

export default function Agenda() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // OBTENER FECHA LOCAL
  const getTodayString = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split('T')[0];
  };

  const [filterDate, setFilterDate] = useState(getTodayString()); 

  // --- PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredVisits = visits.filter(v => v.date === filterDate);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVisits = filteredVisits.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  // ------------------

  // ESTADO FORMULARIO
  const [newVisit, setNewVisit] = useState({
    client: '', address: '', phone: '', date: getTodayString(), time: '', service: '', tech: '', status: 'Programada'
  });

  // --- FUNCIÓN CARGAR DEMO (CON CLIENTES REALES) ---
  const cargarDemo = async () => {
    if(!window.confirm("¿Generar visitas usando tus clientes registrados?")) return;
    setLoading(true);
    
    try {
      // 1. Primero obtenemos los clientes reales de la base de datos
      const clientesSnap = await getDocs(collection(db, "clientes"));
      const clientesReales = clientesSnap.docs.map(doc => doc.data());

      if (clientesReales.length === 0) {
        alert("¡Error! No tienes clientes registrados. Ve a la sección Clientes y agrega algunos primero.");
        setLoading(false);
        return;
      }

      const hoy = getTodayString();
      const servicios = ['Mantenimiento AC', 'Revisión Eléctrica', 'Instalación Pozo Tierra', 'Diagnóstico de Seguridad', 'Cambio de Repuestos'];
      const tecnicos = ['Juan Pérez', 'Carlos Diaz', 'Roberto Gómez', 'Equipo A'];

      // 2. Generamos 10 visitas usando esos clientes aleatoriamente
      const datos = Array.from({ length: 10 }).map((_, i) => {
        // Elegimos un cliente al azar de la lista real
        const clienteRandom = clientesReales[Math.floor(Math.random() * clientesReales.length)];
        
        return {
          client: clienteRandom.name,          // Nombre real
          address: clienteRandom.location || 'Dirección no registrada', // Dirección real
          phone: clienteRandom.phone || 'Sin teléfono', // Teléfono real
          date: hoy,
          time: `${8 + i}:00`, // 8:00, 9:00, 10:00...
          service: servicios[Math.floor(Math.random() * servicios.length)],
          tech: tecnicos[Math.floor(Math.random() * tecnicos.length)],
          status: 'Programada'
        };
      });

      // 3. Guardamos en Firebase
      for (const v of datos) await addDoc(collection(db, "visitas"), v);
      
      alert(`¡Éxito! Se crearon 10 visitas con tus ${clientesReales.length} clientes.`);
      
    } catch (e) { 
      console.error(e); 
      alert("Error al cargar datos.");
    } finally {
      setLoading(false);
    }
  };
  // ------------------------------------------------

  // 1. LEER DATOS
  useEffect(() => {
    const q = query(collection(db, "visitas"), orderBy("date", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      docs.sort((a, b) => a.time.localeCompare(b.time));
      setVisits(docs);
      setLoading(false);
    }, (error) => {
      console.error("Error:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. GUARDAR
  const handleSave = async (e) => {
    e.preventDefault();
    if(!newVisit.client || !newVisit.date) return alert("Faltan datos");
    try {
      await addDoc(collection(db, "visitas"), newVisit);
      setIsModalOpen(false);
      setNewVisit({ client: '', address: '', phone: '', date: getTodayString(), time: '', service: '', tech: '', status: 'Programada' });
    } catch (e) { console.error(e); }
  };

  // 3. CAMBIAR ESTADO
  const changeStatus = async (id, currentStatus) => {
    const next = currentStatus === 'Programada' ? 'En Curso' : currentStatus === 'En Curso' ? 'Completada' : 'Programada';
    await updateDoc(doc(db, "visitas", id), { status: next });
  };

  // 4. ELIMINAR
  const handleDelete = async (id) => {
    if(window.confirm("¿Borrar visita?")) await deleteDoc(doc(db, "visitas", id));
  };

  const getStatusColor = (s) => {
    switch(s) {
      case 'Programada': return 'border-l-4 border-blue-500 bg-white';
      case 'En Curso': return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'Completada': return 'border-l-4 border-green-500 bg-green-50 opacity-70';
      default: return 'bg-white';
    }
  };

  return (
    <AdminLayout title="Agenda de Visitas Técnicas">
      
      {/* BARRA SUPERIOR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-slate-200">
          <Calendar className="text-slate-500" size={20} />
          <span className="text-sm font-bold text-slate-700">Filtrar Fecha:</span>
          <input 
            type="date" 
            className="outline-none text-slate-600 bg-transparent cursor-pointer"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setCurrentPage(1); 
            }}
          />
        </div>

        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg">
            <Plus size={20} /> Agendar
          </button>
        </div>
      </div>

      {/* LISTA DE VISITAS */}
      <div className="space-y-4 min-h-[400px]">
        {loading ? (
          <div className="text-center p-10 text-slate-400 animate-pulse">Cargando agenda...</div>
        ) : currentVisits.length > 0 ? (
          currentVisits.map((visit) => (
            <div key={visit.id} className={`p-5 rounded-xl shadow-sm border border-slate-100 transition hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${getStatusColor(visit.status)}`}>
              
              <div className="flex items-center gap-4 min-w-[150px]">
                <div className="bg-slate-100 p-3 rounded-lg text-center min-w-[70px]">
                  <p className="text-xl font-bold text-slate-800">{visit.time || '--:--'}</p>
                  <p className="text-xs text-slate-500 uppercase">Hrs</p>
                </div>
                <div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    visit.status === 'Programada' ? 'bg-blue-100 text-blue-700' :
                    visit.status === 'En Curso' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {visit.status}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-lg text-slate-800">{visit.client}</h4>
                <p className="text-slate-600 text-sm flex items-center gap-1 mt-1"><MapPin size={14} className="text-red-500" /> {visit.address}</p>
                <p className="text-slate-500 text-xs flex items-center gap-1 mt-1"><AlertCircle size={14} className="text-blue-500" /> {visit.service}</p>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-200 pt-4 md:pt-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600"><User size={16} /></div>
                  <div className="text-sm"><p className="font-bold text-slate-700">{visit.tech}</p><p className="text-xs text-slate-500">Técnico</p></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => changeStatus(visit.id, visit.status)} className="p-2 bg-slate-100 hover:bg-green-100 text-slate-600 hover:text-green-600 rounded-lg transition"><CheckCircle size={20} /></button>
                  <button onClick={() => handleDelete(visit.id)} className="p-2 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-lg transition"><Trash2 size={20} /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300">
            <Calendar size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No hay visitas para esta fecha.</p>
          </div>
        )}
      </div>

      {/* CONTROLES DE PAGINACIÓN */}
      {!loading && filteredVisits.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <span>Mostrando {currentVisits.length} de {filteredVisits.length} visitas</span>
          <div className="flex gap-2">
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-white bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              Anterior
            </button>
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-white bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Programar Visita</h3><button onClick={() => setIsModalOpen(false)}><X /></button></div>
            <form onSubmit={handleSave} className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Cliente</label><input className="w-full border p-2 rounded" value={newVisit.client} onChange={e => setNewVisit({...newVisit, client: e.target.value})} required /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">Dirección</label><input className="w-full border p-2 rounded" value={newVisit.address} onChange={e => setNewVisit({...newVisit, address: e.target.value})} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase">Fecha</label><input type="date" className="w-full border p-2 rounded" value={newVisit.date} onChange={e => setNewVisit({...newVisit, date: e.target.value})} required /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase">Hora</label><input type="time" className="w-full border p-2 rounded" value={newVisit.time} onChange={e => setNewVisit({...newVisit, time: e.target.value})} required /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase">Servicio</label><input placeholder="Ej: Mantenimiento" className="w-full border p-2 rounded" value={newVisit.service} onChange={e => setNewVisit({...newVisit, service: e.target.value})} /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase">Técnico</label><input placeholder="Nombre" className="w-full border p-2 rounded" value={newVisit.tech} onChange={e => setNewVisit({...newVisit, tech: e.target.value})} required /></div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 mt-2">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}