import React from 'react';
import { 
  Flame, 
  Bell, 
  Droplets, 
  Wrench, 
  FileText, 
  ShieldCheck, 
  CheckCircle, 
  AlertTriangle,
  Building,
  FileCheck,
  Phone,
  MessageCircle,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, MapPin, Search, ShoppingCart, ChevronDown, Zap, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';

export default function Incendios() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Imagen de fondo tuberías rojas / sistema incendios */}
            <img 
              src="/img/servicio_incendio.jpg" 
              alt="Sistemas Contra Incendios" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/80"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center text-white mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-sm font-bold tracking-widest uppercase text-red-400 mb-2">Inicio / Servicios / Contra Incendios</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Sistemas Contra Incendios
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Protección integral de vidas y activos. Diseño, instalación y mantenimiento bajo normativas NFPA.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- EXPERTOS EN SEGURIDAD --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-red-600 font-bold uppercase tracking-wider text-sm">Seguridad Garantizada</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Expertos en Seguridad Contra Incendios
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  En ElectriCool Perú, nos comprometemos con su seguridad. Implementamos sistemas de detección y extinción de última generación, asegurando una respuesta rápida ante cualquier emergencia.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Nuestras soluciones cumplen estrictamente con las normas NFPA y los reglamentos nacionales de seguridad (INDECI), protegiendo su inversión y a su personal.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge icon={<ShieldCheck size={18} />} text="Normativa NFPA" color="text-red-600" bg="bg-red-50" />
                  <Badge icon={<CheckCircle size={18} />} text="Garantía de Calidad" color="text-red-600" bg="bg-red-50" />
                  <Badge icon={<AlertTriangle size={18} />} text="Atención 24/7" color="text-red-600" bg="bg-red-50" />
                </div>
              </div>
              
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
                <img 
                  src="/img/foto_incendio.jpeg" 
                  alt="Instalación Tuberías Rojas" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICIOS ESPECÍFICOS --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios de Protección</h2>
              <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SubServiceCard 
                icon={<Bell />}
                title="Detección de Incendios"
                items={["Detectores de humo", "Sensores de temperatura", "Paneles de control", "Estaciones manuales"]}
              />
              <SubServiceCard 
                icon={<Droplets />}
                title="Sistemas de Extinción"
                items={["Gabinetes contra incendio", "Sistemas de rociadores", "Extintores portátiles", "Bombas contra incendio"]}
              />
              <SubServiceCard 
                icon={<Wrench />}
                title="Mantenimiento"
                items={["Inspección periódica", "Pruebas de funcionamiento", "Recarga de extintores", "Certificación operativa"]}
              />
              <SubServiceCard 
                icon={<FileText />}
                title="Consultoría"
                items={["Auditoría de riesgos", "Diseño de ingeniería", "Planos de evacuación", "Capacitación de personal"]}
              />
            </div>
          </div>
        </section>

        {/* --- PROCESO DE IMPLEMENTACIÓN --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nuestro Proceso de Implementación</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Línea conectora (Desktop) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

              <ProcessStep number="1" title="Evaluación de Riesgos" desc="Analizamos su espacio y determinamos los requerimientos de seguridad." />
              <ProcessStep number="2" title="Diseño del Sistema" desc="Desarrollamos un plan integral de acuerdo a las normas vigentes." />
              <ProcessStep number="3" title="Instalación" desc="Implementamos el sistema utilizando materiales certificados." />
              <ProcessStep number="4" title="Certificación" desc="Realizamos pruebas y entregamos el dossier de calidad final." />
            </div>
          </div>
        </section>

        {/* --- CUMPLIMIENTO NORMATIVO --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Cumplimiento Normativo</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <NormCard icon={<AlertTriangle size={32}/>} code="NFPA 72" title="Código Nacional de Alarmas" />
              <NormCard icon={<Building size={32}/>} code="NFPA 13" title="Instalación de Rociadores" />
              <NormCard icon={<FileCheck size={32}/>} code="NFPA 25" title="Inspección y Mantenimiento" />
              <NormCard icon={<ShieldCheck size={32}/>} code="INDECI" title="Normativa Nacional Peruana" />
            </div>
          </div>
        </section>

        {/* --- MARCAS --- */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-10">Trabajamos con las Mejores Marcas</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition duration-500">
               {/* Logos simulados con texto estilizado */}
               <span className="text-3xl font-black text-slate-900 uppercase">NOTIFIER</span>
               <span className="text-3xl font-bold text-red-600">Honeywell</span>
               <span className="text-3xl font-bold text-slate-700">Kidde</span>
               <span className="text-3xl font-extrabold text-blue-900">Johnson Controls</span>
               <span className="text-3xl font-bold text-slate-800 tracking-tighter">BOSCH</span>
            </div>
          </div>
        </section>

        {/* --- CTA FINAL (Azul Oscuro) --- */}
        <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita Protección Contra Incendios?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Solicite una evaluación gratuita. Garantice la seguridad de su empresa hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition flex items-center justify-center gap-2">
                <FileText size={18} /> Pedir Presupuesto
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

function Badge({ icon, text, color, bg }) {
  return (
    <div className={`flex items-center gap-2 text-slate-700 ${bg} px-4 py-2 rounded-full text-sm font-medium`}>
      <span className={color}>{icon}</span>
      {text}
    </div>
  );
}

function SubServiceCard({ icon, title, items }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 group">
      <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition duration-300">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
            <CheckCircle size={14} className="text-red-500 mt-1 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessStep({ number, title, desc }) {
  return (
    <div className="relative z-10 bg-white p-6 rounded-xl border border-slate-100 text-center hover:border-red-200 hover:shadow-lg transition duration-300 group">
      <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:bg-red-600 transition">
        {number}
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function NormCard({ icon, code, title }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-md transition text-center group">
      <div className="text-slate-400 mb-4 flex justify-center group-hover:text-red-600 transition">{icon}</div>
      <h4 className="text-xl font-bold text-slate-900 mb-1">{code}</h4>
      <p className="text-xs text-slate-500 uppercase font-semibold">{title}</p>
    </div>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (Mismo menú y footer consistentes) ---
// ==================================================================================

