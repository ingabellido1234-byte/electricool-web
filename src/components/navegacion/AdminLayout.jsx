import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../pages/firebase'; // Ajusta la ruta a tu firebase.js
import { signOut } from 'firebase/auth';
import Sidebar from './navegacion_dashboard';
import Header from './cabecera';

export default function AdminLayout({ children, title }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login/inicio_sesion'); // Te devuelve al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* 1. Sidebar (Se controla desde aquí) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        handleLogout={handleLogout} 
      />

      {/* 2. Contenedor Derecho */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <Header 
          title={title} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />

        {/* 3. AQUÍ SE RENDERIZA EL CONTENIDO DE LA PÁGINA (Dashboard, Cotizaciones, etc) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>

      </div>
    </div>
  );
}