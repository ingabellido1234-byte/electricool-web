import React from 'react';
import { 
  Wind, 
  Wrench, 
  Settings, 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Phone, 
  MessageCircle,
  Award,
  PenTool,
  Thermometer,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, MapPin, Search, ShoppingCart, ChevronDown, Zap, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';

export default function AireAcondicionado() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Imagen de fondo de técnico trabajando en AC */}
            <img 
              src="/img/servicio_aire.jpg" 
              alt="Técnico Aire Acondicionado" 
              className="w-full h-full object-cover"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center text-white mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-sm font-bold tracking-widest uppercase text-blue-400 mb-2">Inicio / Servicios / Aire Acondicionado</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                Servicio de Aire Acondicionado
              </h1>
              <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Soluciones profesionales de climatización para su hogar y empresa. Instalación, mantenimiento y reparación garantizada.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- EXPERTOS EN CLIMATIZACIÓN --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">¿Por qué nosotros?</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Expertos en Climatización
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  En ElectriCool Perú, nos especializamos en brindar soluciones integrales de aire acondicionado, garantizando el máximo confort y eficiencia energética para nuestros clientes.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Con años de experiencia en el sector, nuestro equipo de técnicos certificados está preparado para atender cualquier necesidad de climatización, desde residencias hasta grandes plantas industriales.
                </p>

                <div className="flex flex-wrap gap-6">
                  <Badge icon={<Award size={18} />} text="Técnicos Certificados" />
                  <Badge icon={<ShieldCheck size={18} />} text="Garantía de Servicio" />
                  <Badge icon={<CheckCircle size={18} />} text="Calidad Premium" />
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="/img/aire.jpg" 
                  alt="Instalación AC" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SUB-SERVICIOS (Grid de 4) --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios de Aire Acondicionado</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SubServiceCard 
                icon={<Wrench />}
                title="Instalación"
                items={["Sistemas Split y Multi-split", "Aire acondicionado central", "Sistemas VRF/VRV", "Ductos y ventilación"]}
              />
              <SubServiceCard 
                icon={<Settings />}
                title="Mantenimiento"
                items={["Mantenimiento preventivo", "Limpieza de filtros", "Recarga de gas refrigerante", "Inspección de componentes"]}
              />
              <SubServiceCard 
                icon={<Thermometer />}
                title="Reparación"
                items={["Diagnóstico de fallas", "Reparación de compresores", "Cambio de repuestos", "Solución de fugas"]}
              />
              <SubServiceCard 
                icon={<ClipboardList />}
                title="Asesoría"
                items={["Consultoría técnica", "Dimensionamiento de equipos", "Eficiencia energética", "Recomendaciones de uso"]}
              />
            </div>
          </div>
        </section>

        {/* --- PROCESO DE TRABAJO --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nuestro Proceso de Trabajo</h2>
              <p className="text-slate-500 mt-2">Pasos simples para un resultado profesional</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Línea conectora (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

              <ProcessStep 
                number="1" 
                title="Evaluación Inicial" 
                desc="Realizamos un diagnóstico completo de sus necesidades y el espacio a climatizar." 
              />
              <ProcessStep 
                number="2" 
                title="Propuesta Técnica" 
                desc="Presentamos la mejor solución técnica y económica adaptada a sus requerimientos." 
              />
              <ProcessStep 
                number="3" 
                title="Instalación" 
                desc="Ejecutamos el trabajo con los más altos estándares de calidad y seguridad." 
              />
              <ProcessStep 
                number="4" 
                title="Pruebas y Entrega" 
                desc="Verificamos el correcto funcionamiento y brindamos capacitación de uso." 
              />
            </div>
          </div>
        </section>

        {/* --- MARCAS (Logos simulados con texto estilizado) --- */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-10">Trabajamos con las Mejores Marcas</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition duration-500">
              {/* Simulamos logos con texto tipográfico para el ejemplo */}
              <span className="text-3xl font-black text-slate-800 italic">LG</span>
              <span className="text-3xl font-bold text-blue-900">SAMSUNG</span>
              <span className="text-3xl font-bold text-slate-700 font-serif">YORK</span>
              <span className="text-3xl font-extrabold text-blue-600">Carrier</span>
              <span className="text-3xl font-bold text-slate-800 tracking-tighter">DAIKIN</span>
            </div>
          </div>
        </section>

        {/* --- CTA FINAL (Azul) --- */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita un Servicio de Aire Acondicionado?</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Contáctenos para una evaluación gratuita y personalizada. Nuestro equipo está listo para ayudarle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2">
                <PenTool size={18} /> Agendar Visita
              </button>
              <button className="bg-green-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-lg shadow-green-900/20">
                <MessageCircle size={18} /> WhatsApp
              </button>
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

function Badge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-slate-700 bg-slate-100 px-4 py-2 rounded-full text-sm font-medium">
      <span className="text-blue-600">{icon}</span>
      {text}
    </div>
  );
}

function SubServiceCard({ icon, title, items }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 group">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle size={14} className="text-blue-500 mt-1 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessStep({ number, title, desc }) {
  return (
    <div className="relative z-10 bg-white p-6 rounded-xl border border-slate-100 text-center hover:border-blue-200 hover:shadow-lg transition duration-300 group">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:scale-110 transition">
        {number}
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (Mismo menú y footer consistentes) ---
// ==================================================================================

