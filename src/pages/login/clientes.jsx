import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, Menu, 
  Search, Plus, Filter, MoreVertical, Phone, Mail, 
  Building, MapPin, UserCheck, UserX
} from 'lucide-react';

export default function Clientes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Datos simulados de clientes
  const clients = [
    { 
      id: 1, 
      name: 'Carlos Mendoza', 
      company: 'Hospital Rebagliati', 
      email: 'c.mendoza@hospital.pe', 
      phone: '+51 987 654 321', 
      location: 'Jesús María, Lima',
      status: 'Activo',
      projects: 3
    },
    { 
      id: 2, 
      name: 'Ana Lucía Torres', 
      company: 'Textil San Cristobal', 
      email: 'ana.torres@textilsc.com', 
      phone: '+51 999 888 777', 
      location: 'Ate, Lima',
      status: 'Activo',
      projects: 5
    },
    { 
      id: 3, 
      name: 'Pedro Ruiz', 
      company: 'Condominio Los Pinos', 
      email: 'admin@lospinos.com', 
      phone: '+51 955 444 333', 
      location: 'San Borja, Lima',
      status: 'Potencial',
      projects: 0
    },
    { 
      id: 4, 
      name: 'Jorge Alva', 
      company: 'Cineplanet', 
      email: 'j.alva@cineplanet.com', 
      phone: '+51 922 333 444', 
      location: 'Independencia, Lima',
      status: 'Inactivo',
      projects: 12
    },
    { 
      id: 5, 
      name: 'Virgilio Martinez', 
      company: 'Restaurante Central', 
      email: 'contacto@central.pe', 
      phone: '+51 911 222 333', 
      location: 'Barranco, Lima',
      status: 'Activo',
      projects: 2
    },
  ];

  // Estilos para los estados
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Activo': return 'bg-green-100 text-green-700 border-green-200';
      case 'Potencial': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Inactivo': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <AdminLayout title="Panel Principal">
      {/* --- SIDEBAR --- */}


      {/* --- CONTENIDO --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        

        {/* ÁREA DE TRABAJO */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          
          {/* BARRA DE ACCIONES */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar cliente, RUC o empresa..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72 shadow-sm" 
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition shadow-sm">
                <Filter size={18} /> <span className="text-sm font-medium">Filtrar</span>
              </button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              <Plus size={20} /> Nuevo Cliente
            </button>
          </div>

          {/* TABLA DE CLIENTES */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                    <th className="px-6 py-4">Cliente / Empresa</th>
                    <th className="px-6 py-4">Contacto</th>
                    <th className="px-6 py-4">Ubicación</th>
                    <th className="px-6 py-4 text-center">Proyectos</th>
                    <th className="px-6 py-4 text-center">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {clients.map((client) => (
                    <tr key={client.id} className="hover:bg-slate-50/80 transition duration-150">
                      
                      {/* Nombre y Empresa */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{client.name}</div>
                            <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                              <Building size={12} /> {client.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Datos de Contacto */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail size={14} className="text-slate-400" /> {client.email}
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone size={14} className="text-slate-400" /> {client.phone}
                          </div>
                        </div>
                      </td>
                      
                      {/* Ubicación */}
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-slate-400" />
                          {client.location}
                        </div>
                      </td>

                      {/* Proyectos */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded-md border border-slate-200">
                          {client.projects}
                        </span>
                      </td>
                      
                      {/* Estado */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(client.status)}`}>
                          {client.status === 'Activo' ? <UserCheck size={12} /> : <UserX size={12} />}
                          {client.status}
                        </span>
                      </td>
                      
                      {/* Acciones */}
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                          <MoreVertical size={18} />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Paginación */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>Total: 5 clientes</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Anterior</button>
                <button className="px-3 py-1 border rounded hover:bg-slate-50">Siguiente</button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </AdminLayout>
  );
}