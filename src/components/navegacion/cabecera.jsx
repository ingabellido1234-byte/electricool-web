import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Para redirigir al inventario
import { Menu, Search, Bell, AlertTriangle, X } from 'lucide-react';
import { db } from '../../pages/firebase'; // Asegúrate de que la ruta sea correcta
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function Header({ toggleSidebar, title }) {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // --- ESCUCHAR STOCK BAJO EN TIEMPO REAL ---
  useEffect(() => {
    // Consulta: Dame todos los productos donde el stock sea menor o igual a 5
    const q = query(collection(db, "productos"), where("stock", "<=", 5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLowStockItems(items);
    });

    return () => unsubscribe();
  }, []);

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
        {/* Buscador Global */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition" 
          />
        </div>
        
        {/* --- CAMPANA DE NOTIFICACIONES --- */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-full transition ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell size={24} />
            
            {/* Contador Rojo (Solo si hay stock bajo) */}
            {lowStockItems.length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {lowStockItems.length}
              </span>
            )}
          </button>

          {/* --- DROPDOWN DESPLEGABLE --- */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
              
              <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-700 text-sm">Notificaciones</h3>
                <button onClick={() => setShowNotifications(false)}><X size={16} className="text-slate-400 hover:text-slate-600" /></button>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {lowStockItems.length > 0 ? (
                  lowStockItems.map((item) => (
                    <div key={item.id} className="px-4 py-3 border-b border-slate-50 hover:bg-red-50 transition flex items-start gap-3">
                      <div className="mt-1 text-red-500">
                        <AlertTriangle size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{item.name}</p>
                        <p className="text-xs text-slate-500">
                          Quedan solo <span className="font-bold text-red-600">{item.stock} unidades</span>.
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-slate-400 text-sm">
                    <p>Todo está en orden.</p>
                    <p className="text-xs mt-1">No hay alertas de stock.</p>
                  </div>
                )}
              </div>

              {lowStockItems.length > 0 && (
                <div className="p-2 bg-slate-50">
                  <Link 
                    to="/dashboard/inventario" 
                    onClick={() => setShowNotifications(false)}
                    className="block text-center text-xs font-bold text-blue-600 hover:text-blue-700 py-2 hover:bg-blue-50 rounded-lg transition"
                  >
                    Ir al Inventario para reponer
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        
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