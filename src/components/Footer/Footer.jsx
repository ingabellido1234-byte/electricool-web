import React from 'react';
import { 
  Zap, 
  Facebook, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Columna 1: Marca e Información */}
        <div>
          <div className="mb-6"> {/* Agregué margen inferior para separarlo del texto */}
            <img 
              src="/img/electricool.png" 
              alt="Logo de ElectraCool" 
              className="h-17 w-auto" /* h-16 define la altura, w-auto mantiene la proporción */
            />
          </div>
          <p className="mb-6 leading-relaxed">
            Somos especialistas en soluciones integrales de seguridad, electricidad industrial y climatización para tu hogar o empresa.
          </p>
          <div className="flex space-x-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Enlaces Rápidos</h3>
          <ul className="space-y-3">
            <li><Link to='/' className="hover:text-blue-500 transition">Inicio</Link></li>
            <li><Link to='/nosotros' className="hover:text-blue-500 transition">Nosotros</Link></li>
            <li><Link to='/servicio' className="hover:text-blue-500 transition">Servicios</Link></li>
            <li><Link to='/proyecto' className="hover:text-blue-500 transition">Proyectos</Link></li>
            <li><Link to='/contacto' className="hover:text-blue-500 transition">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Servicios */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Servicios</h3>
          <ul className="space-y-3">
            <li><Link to='/servicio/servicio_aire' className="hover:text-blue-500 transition">Aire Acondicionado</Link></li>
            <li><Link to='/servicio/incendios' className="hover:text-blue-500 transition">Alarma contra Incendios</Link></li>
            <li><Link to='/servicio/electricidad' className="hover:text-blue-500 transition">Electricidad Industrial</Link></li>
            <li><Link to='/servicio/pozo-tierra' className="hover:text-blue-500 transition">Pozos a Tierra</Link></li>
            <li><Link to='/servicio/repuestos' className="hover:text-blue-500 transition">Repuestos</Link></li>
            <li><Link to='/servicio/camaras' className="hover:text-blue-500 transition">Cámaras de Seguridad</Link></li>
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div>
          <h3 className="text-white font-bold mb-6 text-lg">Contáctanos</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Phone className="text-blue-600 shrink-0" size={18} />
              <span>+51 987 654 321</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-600 shrink-0" size={18} />
              <span>electricoolperu@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-blue-600 shrink-0" size={18} />
              <span>Lun - Vie: 9:00 - 18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-8 border-t border-slate-900 text-center text-sm">
        <p>&copy; 2025 ElectraCool S.A.C. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

// Sub-componente interno para los iconos sociales
function SocialIcon({ icon }) {
  return (
    <a 
      href="https://www.facebook.com/ElectricoolPeruSAC?locale=es_LA" 
      className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300 border border-slate-800"
    >
      {icon}
    </a>
  );
}