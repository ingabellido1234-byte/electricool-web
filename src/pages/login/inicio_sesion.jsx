import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importar función
import { auth } from '../../firebase'; // Importar tu configuración
import { Lock, Mail } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Estado para errores
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Hacemos la función asíncrona
    e.preventDefault();
    setError('');

    try {
      // Intentamos iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Si funciona, redirigir al panel
      navigate('/dashboard'); 
    } catch (error) {
      // Si falla (contraseña mal, usuario no existe), mostramos error
      console.error(error);
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Administración</h1>
          <p className="text-slate-500 mt-2">Solo personal autorizado</p>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ... (El resto de tus inputs de Email y Password siguen igual) ... */}
           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="admin@electracool.com"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-slate-700">Contraseña</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg shadow-md transition duration-300 transform hover:scale-[1.02]"
          >
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
}