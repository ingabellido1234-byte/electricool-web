import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ isOpen, handleLogout }) {
  const location = useLocation();

  // Función para saber si el link está activo
  const isActive = (path) => location.pathname === path;

  // Clases base para los links
  const baseClass = "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition duration-200";
  const activeClass = "bg-blue-600 text-white shadow-lg shadow-blue-900/50";
  const inactiveClass = "text-slate-400 hover:text-white hover:bg-slate-800";

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static flex flex-col`}>
      
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight">
          ELECTRA<span className="text-blue-500">ADMIN</span>
        </h1>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link to="/inicio_Sesion/dashboard" className={`${baseClass} ${isActive('/inicio_Sesion/dashboard') ? activeClass : inactiveClass}`}>
          <LayoutDashboard size={20} /> Panel Principal
        </Link>
        
        <Link to="/dashboard/cotizacion" className={`${baseClass} ${isActive('/dashboard/cotizacion') ? activeClass : inactiveClass}`}>
          <FileText size={20} /> Cotizaciones
        </Link>
        
        <Link to="/dashboard/clientes" className={`${baseClass} ${isActive('/dashboard/clientes') ? activeClass : inactiveClass}`}>
          <Users size={20} /> Clientes
        </Link>
        
        <div className={`${baseClass} ${inactiveClass} cursor-not-allowed opacity-50`}>
          <Settings size={20} /> Configuración
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
        >
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}