import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

export default function Header({ toggleSidebar, title }) {
  return (
    <header className="bg-white shadow-sm h-20 flex items-center justify-between px-6 z-10 sticky top-0">
      
      <div className="flex items-center gap-4">
        {/* Botón Hamburguesa (Solo móvil) */}
        <button onClick={toggleSidebar} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
          <Menu size={24} />
        </button>
        {/* Título Dinámico */}
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Buscador Global (Oculto en móvil pequeño) */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition" 
          />
        </div>
        
        {/* Notificaciones */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Perfil Admin */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm">
            AD
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-bold text-slate-700 leading-none">Administrador</p>
            <p className="text-slate-500 text-xs mt-1">admin@electracool.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}