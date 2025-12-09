import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { 
  Search, Plus, Filter, MoreVertical, Phone, Mail, 
  Building, MapPin, UserCheck, UserX, Trash2, X, Database, MessageCircle, FileText 
} from 'lucide-react';

export default function Clientes() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ESTADO DEL BUSCADOR
  const [searchTerm, setSearchTerm] = useState("");

  // LÓGICA DE FILTRADO
  const filteredClients = clients.filter(client => {
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.company.toLowerCase().includes(term) ||
      (client.ruc && client.ruc.includes(term))
    );
  });

  // PAGINACIÓN (Basada en filteredClients)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Usamos la lista FILTRADA para mostrar los resultados
  const currentClients = filteredClients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // ESTADO FORMULARIO
  const [newClient, setNewClient] = useState({
    name: '', company: '', ruc: '', email: '', phone: '', location: '', status: 'Activo'
  });

  // FUNCIÓN WHATSAPP
  const openWhatsApp = (phone, name) => {
    const cleanNumber = phone.replace(/\D/g, ''); 
    const finalNumber = cleanNumber.startsWith('51') ? cleanNumber : `51${cleanNumber}`;
    const text = `Hola ${name}, le saludamos de ElectraCool.`;
    window.open(`https://wa.me/${finalNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    const q = query(collection(db, "clientes"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const arr = [];
      snap.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));
      setClients(arr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSaveClient = async (e) => {
    e.preventDefault();
    if(!newClient.name || !newClient.company) return alert("Faltan datos");
    try {
      await addDoc(collection(db, "clientes"), { ...newClient, projects: 0, createdAt: new Date() });
      setIsModalOpen(false);
      setNewClient({ name: '', company: '', ruc: '', email: '', phone: '', location: '', status: 'Activo' }); 
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("¿Eliminar cliente?")) await deleteDoc(doc(db, "clientes", id));
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Activo': return 'bg-green-100 text-green-700 border-green-200';
      case 'Potencial': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Inactivo': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <AdminLayout title="Directorio de Clientes">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          {/* INPUT CONECTADO AL BUSCADOR */}
          <input 
            type="text" 
            placeholder="Buscar por nombre, empresa o RUC..." 
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Regresar a página 1 al buscar
            }}
          />
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
          <Plus size={20} /> Nuevo Cliente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Cargando...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Cliente / RUC</th>
                  <th className="px-6 py-4">Contacto Directo</th>
                  <th className="px-6 py-4">Ubicación</th>
                  <th className="px-6 py-4 text-center">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentClients.length > 0 ? (
                  currentClients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">{client.name?.charAt(0)}</div>
                          <div>
                            <div className="font-bold text-slate-900">{client.name}</div>
                            <div className="flex items-center gap-1 text-xs text-blue-600 font-medium"><Building size={12} /> {client.company}</div>
                            {client.ruc && <div className="text-[10px] text-slate-400 font-mono mt-0.5">RUC: {client.ruc}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <button 
                            onClick={() => openWhatsApp(client.phone, client.name)}
                            className="flex items-center gap-2 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-2 py-1 rounded-md transition text-xs font-bold border border-green-200"
                          >
                            <MessageCircle size={14} /> {client.phone || "Sin núm"}
                          </button>
                          <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <Mail size={14} /> {client.email || "-"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600"><div className="flex gap-1"><MapPin size={14} className="text-slate-400" />{client.location}</div></td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(client.status)}`}>
                          {client.status === 'Activo' ? <UserCheck size={12} /> : <UserX size={12} />}{client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(client.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                      No se encontraron resultados para "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Paginación */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-between text-sm text-slate-500">
              <span>{filteredClients.length} resultados encontrados</span>
              <div className="flex gap-2">
                <button onClick={prevPage} disabled={currentPage===1} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Anterior</button>
                <button onClick={nextPage} disabled={currentPage===totalPages || totalPages === 0} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Siguiente</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Nuevo Cliente</h3><button onClick={() => setIsModalOpen(false)}><X className="text-slate-400" /></button></div>
            <form onSubmit={handleSaveClient} className="space-y-4">
              <input type="text" placeholder="Nombre Contacto" className="w-full border p-2.5 rounded-lg" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} required />
              <input type="text" placeholder="Empresa / Razón Social" className="w-full border p-2.5 rounded-lg" value={newClient.company} onChange={e => setNewClient({...newClient, company: e.target.value})} required />
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="RUC (11 dígitos)" maxLength={11} className="w-full border p-2.5 pl-10 rounded-lg" value={newClient.ruc} onChange={e => setNewClient({...newClient, ruc: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="email" placeholder="Email" className="w-full border p-2.5 rounded-lg" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} />
                <input type="text" placeholder="Teléfono" className="w-full border p-2.5 rounded-lg" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} />
              </div>
              <input type="text" placeholder="Ubicación" className="w-full border p-2.5 rounded-lg" value={newClient.location} onChange={e => setNewClient({...newClient, location: e.target.value})} />
              <select className="w-full border p-2.5 rounded-lg bg-white" value={newClient.status} onChange={e => setNewClient({...newClient, status: e.target.value})}><option value="Activo">Activo</option><option value="Potencial">Potencial</option><option value="Inactivo">Inactivo</option></select>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-2">Guardar Cliente</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}