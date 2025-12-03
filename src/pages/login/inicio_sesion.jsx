import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft } from 'lucide-react'; // Asegúrate de instalar lucide-react: npm i lucide-react

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de conexión con el backend (ej. Firebase, API)
    console.log('Datos de login:', formData);
    // Simulación de éxito
    navigate('/dashboard'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">¡Bienvenido de nuevo!</h1>
          <p className="text-slate-500 mt-2">Ingresa tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="ejemplo@correo.com"
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-slate-700">Contraseña</label>
              <a href="#" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
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
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 transform hover:scale-[1.02]"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center text-sm text-slate-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/login/inicio_sesion/registro" className="font-bold text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </div>
        <div className="text-center text-sm text-slate-600">
        <Link 
            to="/" 
            className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all duration-300"
            >
            <ArrowLeft 
                size={18} 
                className="transform group-hover:-translate-x-1 transition-transform duration-300" 
            />
            <span className="hover:underline">Volver al Inicio</span>
        </Link>
        </div>
      </div>
    </div>
  );
}