import React from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Send,
  Building,
  User,
  MessageSquare,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, Search, ShoppingCart, ChevronDown, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';

export default function Contacto() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION (Azul Sólido) --- */}
        <section className="bg-blue-600 py-24 text-center text-white relative overflow-hidden">
          {/* Fondo decorativo sutil */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide">
                Contáctenos
              </h1>
              <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Estamos aquí para ayudarle. Contáctenos y un especialista le atenderá a la brevedad.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- CONTENIDO PRINCIPAL (Tarjetas Flotantes) --- */}
        <section className="relative -mt-16 pb-20 px-4 md:px-0">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-12 gap-8">
              
              {/* COLUMNA IZQUIERDA: INFORMACIÓN (4 columnas) */}
              <div className="md:col-span-4">
                <div className="bg-white rounded-xl shadow-xl p-8 h-full border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
                    Información de Contacto
                  </h3>
                  
                  <div className="space-y-8">
                    <ContactInfoItem 
                      icon={<Phone size={20} />} 
                      title="Teléfonos"
                      content={
                        <>
                          <p>+51 956 257 666</p>
                          <p>+51 934 633 113</p>
                        </>
                      } 
                    />
                    
                    <ContactInfoItem 
                      icon={<Mail size={20} />} 
                      title="Email"
                      content={<p>electricoolperu@gmail.com</p>} 
                    />
                    
                    <ContactInfoItem 
                      icon={<Clock size={20} />} 
                      title="Horario de Atención"
                      content={
                        <>
                          <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
                          <p>Sábados: 9:00 AM - 1:00 PM</p>
                        </>
                      } 
                    />

                     {/* Redes Sociales */}
                     <div>
                       <h4 className="font-bold text-blue-600 mb-4 text-sm uppercase tracking-wider">Síguenos en Redes Sociales</h4>
                       <div className="flex gap-4">
                         <SocialButton icon={<Facebook size={18} />} />
                         <SocialButton icon={<Instagram size={18} />} />
                         <SocialButton icon={<Linkedin size={18} />} />
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: FORMULARIO (8 columnas) */}
              <div className="md:col-span-8">
                <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 border border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
                    Envíenos un Mensaje
                  </h3>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput label="Nombre" placeholder="Su nombre completo" icon={<User size={16}/>} />
                      <FormInput label="Empresa" placeholder="Nombre de su empresa" icon={<Building size={16}/>} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormInput label="Email" type="email" placeholder="correo@ejemplo.com" icon={<Mail size={16}/>} />
                      <FormInput label="Teléfono" type="tel" placeholder="+51 999 999 999" icon={<Phone size={16}/>} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormSelect label="Servicio de Interés">
                        <option>Seleccione un servicio</option>
                        <option>Aire Acondicionado</option>
                        <option>Electricidad Industrial</option>
                        <option>Pozo a Tierra</option>
                        <option>Seguridad Electrónica</option>
                      </FormSelect>
                      <FormSelect label="Tipo de Solicitud">
                        <option>Seleccione el tipo</option>
                        <option>Cotización</option>
                        <option>Soporte Técnico</option>
                        <option>Consulta General</option>
                      </FormSelect>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Mensaje</label>
                      <textarea 
                        rows="4" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none"
                        placeholder="Describa su requerimiento aquí..."
                      ></textarea>
                    </div>

                    <button className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-900/20 transition duration-300 flex items-center justify-center gap-2">
                      <Send size={20} /> Enviar Mensaje
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 2. Footer (Simulado) */}
      <Footer />
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---

function ContactInfoItem({ icon, title, content }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
        <div className="text-sm text-slate-600 space-y-1">
          {content}
        </div>
      </div>
    </div>
  );
}

function SocialButton({ icon }) {
  return (
    <button className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300">
      {icon}
    </button>
  );
}

function FormInput({ label, type = "text", placeholder, icon }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-slate-400">
          {icon}
        </div>
        <input 
          type={type} 
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-slate-400"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function FormSelect({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
      <div className="relative">
        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition text-slate-600 appearance-none cursor-pointer">
          {children}
        </select>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400 pointer-events-none">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN ---
// ==================================================================================
