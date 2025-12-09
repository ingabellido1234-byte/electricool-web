import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  Search, Plus, User, Trash2, X, Database, 
  Phone, Mail, Briefcase, Zap, Thermometer, Shield, PenTool
} from 'lucide-react';

export default function Tecnicos() {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // LÓGICA DE FILTRADO
  const filteredTechs = techs.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CÁLCULO DE PAGINACIÓN
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTechs = filteredTechs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTechs.length / itemsPerPage);

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // ESTADO FORMULARIO
  const [newTech, setNewTech] = useState({
    name: '', specialty: 'Aire Acondicionado', phone: '', email: '', status: 'Disponible'
  });

  // --- DATOS DE PRUEBA ---
  const cargarDemo = async () => {
    if(!window.confirm("¿Cargar equipo técnico de prueba?")) return;
    
    const datos = [
      { name: 'Juan Pérez', specialty: 'Aire Acondicionado', phone: '999111222', email: 'juan@electracool.pe', status: 'Disponible' },
      { name: 'Roberto Gómez', specialty: 'Electricidad Industrial', phone: '988222333', email: 'roberto@electracool.pe', status: 'En Servicio' },
      { name: 'Carlos Díaz', specialty: 'Seguridad Electrónica', phone: '977333444', email: 'carlos@electracool.pe', status: 'Disponible' },
      { name: 'Miguel Torres', specialty: 'Pozo a Tierra', phone: '966444555', email: 'miguel@electracool.pe', status: 'Disponible' },
      { name: 'Ana Ruiz', specialty: 'Aire Acondicionado', phone: '955555666', email: 'ana@electracool.pe', status: 'En Servicio' },
      { name: 'Luis Alva', specialty: 'Electricidad Industrial', phone: '944666777', email: 'luis@electracool.pe', status: 'Disponible' },
      { name: 'Jorge Soto', specialty: 'Todista / General', phone: '933777888', email: 'jorge@electracool.pe', status: 'Vacaciones' },
      { name: 'Pedro Castillo', specialty: 'Seguridad Electrónica', phone: '922888999', email: 'pedro@electracool.pe', status: 'Disponible' }
    ];

    try {
      for (const t of datos) await addDoc(collection(db, "tecnicos"), { ...t, createdAt: new Date() });
      alert("¡Técnicos cargados!");
    } catch (e) { console.error(e); }
  };

  // 1. LEER DATOS
  useEffect(() => {
    const q = query(collection(db, "tecnicos"), orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTechs(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. GUARDAR TÉCNICO
  const handleSave = async (e) => {
    e.preventDefault();
    if(!newTech.name || !newTech.phone) return alert("Nombre y Teléfono requeridos");
    try {
      await addDoc(collection(db, "tecnicos"), { ...newTech, createdAt: new Date() });
      setIsModalOpen(false);
      setNewTech({ name: '', specialty: 'Aire Acondicionado', phone: '', email: '', status: 'Disponible' });
    } catch (e) { console.error(e); }
  };

  // 3. CAMBIAR ESTADO (Disponible <-> En Servicio)
  const toggleStatus = async (id, currentStatus) => {
    const next = currentStatus === 'Disponible' ? 'En Servicio' : 'Disponible';
    await updateDoc(doc(db, "tecnicos", id), { status: next });
  };

  // 4. ELIMINAR
  const handleDelete = async (id) => {
    if(window.confirm("¿Eliminar técnico del sistema?")) await deleteDoc(doc(db, "tecnicos", id));
  };

  // ICONO SEGÚN ESPECIALIDAD
  const getIcon = (spec) => {
    if(spec.includes('Aire')) return <Thermometer size={16} />;
    if(spec.includes('Electricidad')) return <Zap size={16} />;
    if(spec.includes('Seguridad')) return <Shield size={16} />;
    return <PenTool size={16} />;
  };

  return (
    <AdminLayout title="Equipo Técnico">
      
      {/* BARRA SUPERIOR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o especialidad..." 
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg">
            <Plus size={20} /> Nuevo Técnico
          </button>
        </div>
      </div>

      {/* TABLA DE TÉCNICOS */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500 animate-pulse">Cargando equipo...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="px-6 py-4">Técnico</th>
                  <th className="px-6 py-4">Especialidad</th>
                  <th className="px-6 py-4">Contacto</th>
                  <th className="px-6 py-4 text-center">Disponibilidad</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {currentTechs.length > 0 ? (
                  currentTechs.map((tech) => (
                    <tr key={tech.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                            <User size={20} />
                          </div>
                          <div className="font-bold text-slate-900">{tech.name}</div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                          {getIcon(tech.specialty)} {tech.specialty}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-slate-600 flex flex-col gap-1">
                          <span className="flex items-center gap-2 text-xs"><Phone size={12}/> {tech.phone}</span>
                          <span className="flex items-center gap-2 text-xs"><Mail size={12}/> {tech.email || '--'}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => toggleStatus(tech.id, tech.status)}
                          className={`px-3 py-1 rounded-full text-xs font-bold border transition ${
                            tech.status === 'Disponible' ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 
                            tech.status === 'En Servicio' ? 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200' :
                            'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tech.status}
                        </button>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(tech.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="p-8 text-center text-slate-400">No se encontraron técnicos.</td></tr>
                )}
              </tbody>
            </table>

            {/* Paginación */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>Mostrando {currentTechs.length} de {filteredTechs.length} técnicos</span>
              <div className="flex gap-2">
                <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Anterior</button>
                <button onClick={nextPage} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Siguiente</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL NUEVO TÉCNICO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Registrar Técnico</h3><button onClick={() => setIsModalOpen(false)}><X /></button></div>
            <form onSubmit={handleSave} className="space-y-4">
              <div><label className="text-xs font-bold text-slate-500 uppercase">Nombre Completo</label><input className="w-full border p-2 rounded" value={newTech.name} onChange={e => setNewTech({...newTech, name: e.target.value})} required /></div>
              
              <div><label className="text-xs font-bold text-slate-500 uppercase">Especialidad</label>
                <select className="w-full border p-2 rounded bg-white" value={newTech.specialty} onChange={e => setNewTech({...newTech, specialty: e.target.value})}>
                  <option>Aire Acondicionado</option>
                  <option>Electricidad Industrial</option>
                  <option>Seguridad Electrónica</option>
                  <option>Pozo a Tierra</option>
                  <option>Todista / General</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-slate-500 uppercase">Teléfono</label><input className="w-full border p-2 rounded" value={newTech.phone} onChange={e => setNewTech({...newTech, phone: e.target.value})} required /></div>
                <div><label className="text-xs font-bold text-slate-500 uppercase">Email</label><input type="email" className="w-full border p-2 rounded" value={newTech.email} onChange={e => setNewTech({...newTech, email: e.target.value})} /></div>
              </div>

              <div><label className="text-xs font-bold text-slate-500 uppercase">Estado Inicial</label>
                <select className="w-full border p-2 rounded bg-white" value={newTech.status} onChange={e => setNewTech({...newTech, status: e.target.value})}>
                  <option>Disponible</option>
                  <option>En Servicio</option>
                  <option>Vacaciones</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 mt-2">Guardar Personal</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}