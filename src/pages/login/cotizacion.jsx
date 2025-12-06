import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/navegacion/AdminLayout';
import { 
  LayoutDashboard, Users, FileText, Settings, LogOut, Menu, 
  Search, Bell, Plus, Filter, MoreVertical, Eye, Download, Send, 
  CheckCircle, XCircle, Clock
} from 'lucide-react';

export default function Cotizaciones() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Datos simulados de cotizaciones
  const quotes = [
    { id: 'COT-001', client: 'Hospital Rebagliati', contact: 'Dr. Juan Perez', service: 'Aire Acondicionado', date: '06 Dic 2025', amount: 'S/ 4,500', status: 'Aprobado' },
    { id: 'COT-002', client: 'Textil San Cristobal', contact: 'Ing. Maria Diaz', service: 'Electricidad Ind.', date: '05 Dic 2025', amount: 'S/ 12,200', status: 'Pendiente' },
    { id: 'COT-003', client: 'Condominio Los Pinos', contact: 'Admin. Pedro Ruiz', service: 'Pozo a Tierra', date: '03 Dic 2025', amount: 'S/ 850', status: 'Rechazado' },
    { id: 'COT-004', client: 'Cineplanet Norte', contact: 'Logística', service: 'Sist. Contra Incendios', date: '01 Dic 2025', amount: 'S/ 3,400', status: 'Enviado' },
    { id: 'COT-005', client: 'Restaurante Central', contact: 'Chef Virgilio', service: 'Repuestos', date: '28 Nov 2025', amount: 'S/ 320', status: 'Aprobado' },
  ];

  // Función para asignar color según el estado
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Aprobado': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rechazado': return 'bg-red-100 text-red-700 border-red-200';
      case 'Enviado': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <AdminLayout title="Panel Principal">

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}

        {/* ÁREA DE TRABAJO */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          
          {/* BARRA DE ACCIONES */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            
            {/* Buscador y Filtros */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar por cliente o ID..." 
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 shadow-sm" 
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition shadow-sm">
                <Filter size={18} /> <span className="text-sm font-medium">Filtrar</span>
              </button>
            </div>

            {/* Botón Nueva Cotización */}
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              <Plus size={20} /> Nueva Cotización
            </button>
          </div>

          {/* TABLA DE COTIZACIONES */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                    <th className="px-6 py-4">ID Cotización</th>
                    <th className="px-6 py-4">Cliente / Contacto</th>
                    <th className="px-6 py-4">Servicio</th>
                    <th className="px-6 py-4">Fecha</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4 text-center">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-blue-50/30 transition duration-150">
                      
                      {/* ID */}
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {quote.id}
                      </td>
                      
                      {/* Cliente */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{quote.client}</div>
                        <div className="text-xs text-slate-500">{quote.contact}</div>
                      </td>
                      
                      {/* Servicio */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {quote.service}
                        </span>
                      </td>
                      
                      {/* Fecha */}
                      <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                        {quote.date}
                      </td>
                      
                      {/* Monto */}
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {quote.amount}
                      </td>
                      
                      {/* Estado */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(quote.status)}`}>
                          {quote.status === 'Aprobado' && <CheckCircle size={12} />}
                          {quote.status === 'Pendiente' && <Clock size={12} />}
                          {quote.status === 'Rechazado' && <XCircle size={12} />}
                          {quote.status === 'Enviado' && <Send size={12} />}
                          {quote.status}
                        </span>
                      </td>
                      
                      {/* Acciones */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button title="Ver PDF" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                            <Eye size={18} />
                          </button>
                          <button title="Descargar" className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                            <Download size={18} />
                          </button>
                          <button title="Opciones" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Paginación simple */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span>Mostrando 5 de 42 resultados</span>
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