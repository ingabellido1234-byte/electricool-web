import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin,
  Facebook, 
  Instagram, 
  Linkedin, 
  Zap, 
  Menu as MenuIcon, 
  X,
  Search,
  ShoppingCart,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Lista de servicios del dropdown
  const servicesList = [
    { name: "Aire Acondicionado", link: "/servicio/servicio_aire" },
    { name: "Servicios de Alarma Contra Incendios", link: "/servicio/incendios" },
    { name: "Electricidad Industrial", link: "/servicio/electricidad" },
    { name: "Pozo a Tierra", link: "/servicio/pozo-tierra" },
    { name: "Repuestos", link: "/servicio/repuestos" },
    { name: "Cámaras de Seguridad", link: "/servicio/camaras" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  // --- DEFINICIÓN DE COLORES ---
  // Color extraído de tu logo: #E6E6E6 (Gris Claro)
  // Texto: Slate-900 (Oscuro) para contraste
  const bgColor = "bg-[#E6E6E6]"; 
  const textColor = "text-slate-800";
  const hoverColor = "hover:text-blue-600";
  const borderColor = "border-slate-300"; // Borde sutil para separar

  return (
    <>
      {/* --- TOP BAR (Gris Claro como el Logo) --- */}
      <div className={`${bgColor} border-b ${borderColor} text-slate-600 py-2 text-xs md:text-sm hidden lg:block`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex space-x-8">
            <span className={`flex items-center gap-2 ${hoverColor} transition cursor-pointer`}>
              <Mail size={14} className="text-blue-600" /> electricoolperu@gmail.com
            </span>
            <span className={`flex items-center gap-2 ${hoverColor} transition cursor-pointer`}>
              <Phone size={14} className="text-blue-600" /> +51 987 654 321
            </span>
            <span className={`flex items-center gap-2 ${hoverColor} transition cursor-pointer`}>
              <MapPin size={14} className="text-blue-600" /> Lima, Perú
            </span>
          </div>
          {/* Redes sociales */}
          <div className="flex space-x-4 items-center">
            <span className="opacity-70 mr-2 font-medium">Síguenos:</span>
            <a href="https://www.facebook.com/ElectricoolPeruSAC?locale=es_LA" target="_blank" rel="noreferrer" className={`${hoverColor} transition`}><Facebook size={16} /></a>
            <a href="https://www.instagram.com/electricool_peru/" target="_blank" rel="noreferrer" className={`${hoverColor} transition`}><Instagram size={16} /></a>
          </div>
        </div>
      </div>

      {/* --- NAVBAR PRINCIPAL --- */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${borderColor} ${isScrolled ? `${bgColor} shadow-md py-2` : `${bgColor}/95 backdrop-blur-md py-4`}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="block">
               {/* Como el fondo es del mismo color, el logo se verá transparente/integrado */}
               <img 
                src="/img/logo.png" 
                alt="Logo de ElectraCool" 
                className="h-14 w-auto mix-blend-multiply" // mix-blend ayuda a integrar bordes si no es PNG transparente
              />
            </div>
          </Link>

          {/* Menú de Escritorio (Texto Oscuro) */}
          <div className={`hidden lg:flex items-center space-x-8 font-bold text-sm ${textColor} uppercase tracking-wider`}>
            <Link to="/" className={`${hoverColor} transition`}>Inicio</Link>
            <Link to="/nosotros" className={`${hoverColor} transition`}>Nosotros</Link>
            
            {/* Dropdown Servicios */}
            <div className="relative group h-full flex items-center">
              <Link 
                to="/servicio" 
                className={`flex items-center gap-1 ${hoverColor} transition py-4 focus:outline-none`}
              >
                Servicios <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              
              <div className="absolute top-full left-0 w-72 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-blue-600">
                  {servicesList.map((service, index) => (
                    <Link 
                      key={index}
                      to={service.link}
                      className="block px-6 py-4 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition border-b border-slate-100 last:border-0 text-sm font-bold capitalize"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link to="/proyecto" className={`${hoverColor} transition`}>Proyectos</Link>
            <Link to="/contacto" className={`${hoverColor} transition`}>Contacto</Link>
          </div>

          {/* Iconos y Botón (Escritorio) - Iconos oscuros */}
          <div className="hidden lg:flex items-center space-x-6">
          <Link 
            to="/login/inicio_sesion" 
            className="inline-flex items-center gap-2 bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
          >
            {/* Ícono de usuario SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>Iniciar Sesión</span>
          </Link>
            {/* Botón Cotizar */}
            <Link 
              to="/contacto" 
              className="bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 uppercase tracking-wider"
            >
              Cotizar Ahora
            </Link>
          </div>

          {/* Botón Hamburguesa Móvil (Icono Oscuro) */}
          <button onClick={toggleMenu} className={`lg:hidden ${textColor} ${hoverColor} transition p-2 z-50`}>
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Menú Desplegable Móvil (Fondo Gris Claro) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden ${bgColor} border-t ${borderColor} overflow-hidden shadow-xl`}
            >
              <div className={`flex flex-col p-6 font-bold ${textColor} uppercase tracking-wider text-sm`}>
                <Link to="/" onClick={toggleMenu} className={`py-3 border-b ${borderColor} hover:text-blue-600`}>Inicio</Link>
                <Link to="/nosotros" onClick={toggleMenu} className={`py-3 border-b ${borderColor} hover:text-blue-600`}>Nosotros</Link>
                
                {/* Dropdown Móvil */}
                <div className={`border-b ${borderColor}`}>
                  <button 
                    onClick={toggleServices}
                    className="w-full flex justify-between items-center py-3 hover:text-blue-600 focus:outline-none"
                  >
                    Servicios <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-slate-200 rounded-lg mb-2" // Fondo un poco más oscuro para diferenciar
                      >
                        {servicesList.map((service, index) => (
                          <Link 
                            key={index}
                            to={service.link}
                            onClick={toggleMenu}
                            className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-300 text-xs normal-case border-l-4 border-transparent hover:border-blue-600 transition font-semibold"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/proyectos" onClick={toggleMenu} className={`py-3 border-b ${borderColor} hover:text-blue-600`}>Proyectos</Link>
                <Link to="/contacto" onClick={toggleMenu} className="py-3 text-blue-600 font-bold">Contacto</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}