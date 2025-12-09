import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Search, Plus, Filter, Eye, Trash2, X, 
  CheckCircle, Clock, XCircle, FileText, Printer, ArrowRight 
} from 'lucide-react';

export default function Cotizaciones() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ESTADO DEL BUSCADOR
  const [searchTerm, setSearchTerm] = useState("");

  // MODALES
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  // --- LÓGICA DE FILTRADO (El Corazón del Buscador) ---
  const filteredQuotes = quotes.filter(quote => 
    quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (quote.status && quote.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- PAGINACIÓN (Basada en los resultados FILTRADOS) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // FORMULARIO
  const [newQuote, setNewQuote] = useState({
    client: '', service: '', amount: '', status: 'Pendiente', description: ''
  });

  // 1. LEER DATOS
  useEffect(() => {
    const q = query(collection(db, "cotizaciones"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setQuotes(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. GUARDAR
  const handleSaveQuote = async (e) => {
    e.preventDefault();
    if(!newQuote.client || !newQuote.amount) return alert("Completa los campos obligatorios");
    try {
      await addDoc(collection(db, "cotizaciones"), {
        ...newQuote,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date()
      });
      setIsCreateModalOpen(false);
      setNewQuote({ client: '', service: '', amount: '', status: 'Pendiente', description: '' });
    } catch (error) { console.error(error); }
  };

  // 3. ACTUALIZAR ESTADO
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const quoteRef = doc(db, "cotizaciones", id);
      await updateDoc(quoteRef, { status: newStatus });
      if (selectedQuote) setSelectedQuote({ ...selectedQuote, status: newStatus });
    } catch (error) { console.error(error); }
  };

  // 4. ELIMINAR
  const handleDelete = async (id) => {
    if(window.confirm("¿Eliminar esta cotización permanentemente?")) {
      await deleteDoc(doc(db, "cotizaciones", id));
      if(selectedQuote?.id === id) setSelectedQuote(null);
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Aprobado': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rechazado': return 'bg-red-100 text-red-700 border-red-200';
      case 'Enviado': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Facturado': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <AdminLayout title="Gestión de Cotizaciones">
      
      {/* BARRA DE ACCIONES */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            
            {/* INPUT DEL BUSCADOR CONECTADO */}
            <input 
              type="text" 
              placeholder="Buscar por cliente, servicio o estado..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-sm" 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Regresar a la página 1 cuando busques
              }}
            />
          </div>
        </div>
        <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
          <Plus size={20} /> Nueva Cotización
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500 animate-pulse">Cargando cotizaciones...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Servicio</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4 text-center">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentQuotes.length > 0 ? (
                  currentQuotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-blue-50/30 transition duration-150">
                      <td className="px-6 py-4 font-medium text-slate-900">{quote.client}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {quote.service}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{quote.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-700">S/ {quote.amount}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(quote.status)}`}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setSelectedQuote(quote)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Ver Detalle">
                            <Eye size={18} />
                          </button>
                          <button onClick={() => handleDelete(quote.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                      No se encontraron resultados para "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Paginación */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>Mostrando {currentQuotes.length} de {filteredQuotes.length} registros</span>
              <div className="flex gap-2">
                <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Anterior</button>
                <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Siguiente</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. MODAL VER DETALLE */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FileText size={24} /></div>
                <div><h3 className="text-lg font-bold text-slate-800">Detalle de Cotización</h3><p className="text-xs text-slate-500 font-mono">ID: {selectedQuote.id}</p></div>
              </div>
              <button onClick={() => setSelectedQuote(null)} className="p-2 hover:bg-slate-200 rounded-full transition"><X size={20} className="text-slate-500" /></button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-400 uppercase">Cliente</label><p className="text-lg font-bold text-slate-800">{selectedQuote.client}</p></div>
                <div><label className="text-xs font-bold text-slate-400 uppercase">Servicio</label><p className="text-slate-700">{selectedQuote.service}</p></div>
                
                {/* Selector Rápido de Estado */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Gestionar Estado</label>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleUpdateStatus(selectedQuote.id, 'Aprobado')} className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded hover:bg-green-200 transition">Aprobar</button>
                    <button onClick={() => handleUpdateStatus(selectedQuote.id, 'Rechazado')} className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded hover:bg-red-200 transition">Rechazar</button>
                    <button onClick={() => handleUpdateStatus(selectedQuote.id, 'Facturado')} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded hover:bg-purple-200 transition">Facturar</button>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">Estado actual: <span className="font-bold">{selectedQuote.status}</span></div>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2"><span className="text-sm text-slate-500">Fecha</span><span className="font-medium text-slate-700">{selectedQuote.date}</span></div>
                <div className="flex justify-between items-center pt-2"><span className="text-sm text-slate-500 font-bold">Total</span><span className="text-2xl font-bold text-blue-600">S/ {selectedQuote.amount}</span></div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Descripción</label>
                <div className="mt-2 p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-600 text-sm leading-relaxed">{selectedQuote.description || "Sin descripción."}</div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-white transition" onClick={() => window.print()}><Printer size={18} /> Imprimir</button>
              <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition" onClick={() => setSelectedQuote(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL CREAR NUEVA */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Nueva Cotización</h3><button onClick={() => setIsCreateModalOpen(false)}><X className="text-slate-400" /></button></div>
            <form onSubmit={handleSaveQuote} className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Cliente</label><input className="w-full border p-2.5 rounded-lg" value={newQuote.client} onChange={e => setNewQuote({...newQuote, client: e.target.value})} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Servicio</label><select className="w-full border p-2.5 rounded-lg bg-white" value={newQuote.service} onChange={e => setNewQuote({...newQuote, service: e.target.value})}><option value="">Seleccionar...</option><option value="Aire Acondicionado">Aire Acondicionado</option><option value="Electricidad">Electricidad</option><option value="Pozo Tierra">Pozo a Tierra</option><option value="Repuestos">Repuestos</option></select></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Estado</label><select className="w-full border p-2.5 rounded-lg bg-white" value={newQuote.status} onChange={e => setNewQuote({...newQuote, status: e.target.value})}><option value="Pendiente">Pendiente</option><option value="Enviado">Enviado</option><option value="Aprobado">Aprobado</option></select></div>
              </div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Monto (S/)</label><input type="number" className="w-full border p-2.5 rounded-lg font-bold" value={newQuote.amount} onChange={e => setNewQuote({...newQuote, amount: e.target.value})} required /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Descripción</label><textarea rows="3" className="w-full border p-2.5 rounded-lg resize-none" value={newQuote.description} onChange={e => setNewQuote({...newQuote, description: e.target.value})} /></div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-2">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}