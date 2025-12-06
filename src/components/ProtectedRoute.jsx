import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../pages/firebase'; // Asegúrate de que la ruta a tu firebase.js sea correcta

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escucha el estado de la autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Ya terminamos de verificar
    });

    return () => unsubscribe(); // Limpieza del listener
  }, []);

  // 1. Mientras Firebase verifica, mostramos un "Cargando..."
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="text-blue-600 font-bold text-xl animate-pulse">Cargando sistema...</div>
      </div>
    );
  }

  // 2. Si NO hay usuario, redirigir al Login
  if (!user) {
    return <Navigate to="/login/inicio_sesion" replace />;
  }

  // 3. Si hay usuario, mostrar la página protegida (el hijo)
  return children;
}