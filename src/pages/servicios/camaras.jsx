import React from 'react';
import { 
  Camera, 
  Eye, 
  Smartphone, 
  HardDrive, 
  Shield, 
  Video, 
  Wifi, 
  Moon, 
  CheckCircle,
  Server,
  Building,
  Home,
  Briefcase,
  Factory,
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

export default function Camaras() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Imagen de fondo: Sala de monitoreo o cámara CCTV */}
            <img 
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
              alt="Sistemas de Videovigilancia" 
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
              <div className="text-sm font-bold tracking-widest uppercase text-blue-400 mb-2">Inicio / Servicios / Videovigilancia</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Sistemas de Videovigilancia
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Protección inteligente para su hogar y negocio. Monitoreo remoto en tiempo real, grabación en alta definición y tecnología IP.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- EXPERTOS EN SEGURIDAD --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Tecnología de Punta</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Expertos en Seguridad Electrónica
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  En ElectriCool Perú, diseñamos e implementamos soluciones de videovigilancia a medida. Desde sistemas básicos para el hogar hasta complejos circuitos cerrados (CCTV) para industrias.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Trabajamos con las mejores marcas del mercado (Hikvision, Dahua) para garantizar imágenes nítidas, acceso remoto estable y almacenamiento seguro.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge icon={<Eye size={18} />} text="Monitoreo 24/7" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<Smartphone size={18} />} text="Acceso Móvil" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<Video size={18} />} text="Calidad 4K/HD" color="text-blue-600" bg="bg-blue-50" />
                </div>
              </div>
              
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
                <img 
                  src="/img/seguridad.jpg" 
                  alt="Instalación Cámara de Seguridad" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- TIPOS DE CÁMARAS --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Tipos de Cámaras</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <CameraTypeCard 
                image="/img/ip.png"
                title="Cámaras IP / Bullet"
                desc="Ideales para exteriores. Alta resistencia al clima (IP67), visión nocturna de largo alcance y disuasión visual."
              />
              <CameraTypeCard 
                image="/img/ptz.jpg"
                title="Cámaras PTZ"
                desc="Movimiento 360°, zoom óptico potente y seguimiento automático. Perfectas para grandes áreas y perímetros."
              />
              <CameraTypeCard 
                image="/img/domo.png"
                title="Cámaras Domo"
                desc="Diseño discreto y antivandálico. Ideales para interiores, oficinas y comercios donde la estética es importante."
              />
            </div>
          </div>
        </section>

        {/* --- CARACTERÍSTICAS AVANZADAS --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Características Avanzadas</h2>
              <p className="text-slate-500 mt-2">Tecnología de última generación para su seguridad</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               <FeatureCard icon={<ScanFace />} title="Inteligencia Artificial" desc="Detección de rostros, cruce de línea y reconocimiento de matrículas." />
               <FeatureCard icon={<Smartphone />} title="Control Móvil" desc="Visualice sus cámaras desde cualquier lugar con nuestra App dedicada." />
               <FeatureCard icon={<Moon />} title="Visión Nocturna" desc="Tecnología ColorVu e infrarroja para imágenes claras en total oscuridad." />
               <FeatureCard icon={<HardDrive />} title="Almacenamiento" desc="Grabación continua en disco duro local y respaldo opcional en la nube." />
            </div>
          </div>
        </section>

        {/* --- SOLUCIONES POR SECTOR --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Soluciones por Sector</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <SectorCard icon={<Home size={40}/>} title="Residencial" desc="Protección perimetral y monitoreo de hogar." />
              <SectorCard icon={<Briefcase size={40}/>} title="Comercial" desc="Control de caja y seguridad para tiendas." />
              <SectorCard icon={<Factory size={40}/>} title="Industrial" desc="Vigilancia de procesos y áreas críticas." />
              <SectorCard icon={<Building size={40}/>} title="Corporativo" desc="Control de accesos y seguridad en oficinas." />
            </div>
          </div>
        </section>

        {/* --- PROCESO DE INSTALACIÓN --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Proceso de Instalación</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

              <ProcessStep number="1" title="Evaluación" desc="Visita técnica para identificar puntos ciegos y vulnerables." />
              <ProcessStep number="2" title="Diseño" desc="Propuesta de ubicación estratégica de cámaras y cableado." />
              <ProcessStep number="3" title="Instalación" desc="Montaje de equipos, tuberías y configuración de red." />
              <ProcessStep number="4" title="Capacitación" desc="Entrenamiento en el uso del sistema y configuración móvil." />
            </div>
          </div>
        </section>

        {/* --- MANTENIMIENTO --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Servicios de Mantenimiento</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <MaintenanceCard 
                icon={<Wifi />} 
                title="Mantenimiento Preventivo" 
                desc="Limpieza de lentes, ajuste de enfoque y verificación de conexiones." 
              />
              <MaintenanceCard 
                icon={<Server />} 
                title="Soporte Técnico" 
                desc="Solución de fallas en grabadores (DVR/NVR) y discos duros." 
              />
              <MaintenanceCard 
                icon={<Video />} 
                title="Actualización" 
                desc="Migración de sistemas análogos antiguos a tecnología IP digital." 
              />
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-16 bg-blue-900 text-white border-t border-blue-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita un Sistema de Videovigilancia?</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Proteja lo que más importa. Solicite una cotización gratuita hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2">
                <Camera size={18} /> Solicitar Cotización
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

function CameraTypeCard({ image, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 group text-center">
      <div className="h-48 overflow-hidden rounded-lg mb-6 relative">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition"></div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 text-center border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-lg transition bg-slate-50 group">
      <div className="w-12 h-12 mx-auto bg-white text-blue-600 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function SectorCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-md transition text-center group">
      <div className="text-slate-400 mb-4 flex justify-center group-hover:text-blue-600 transition group-hover:scale-110 duration-300">{icon}</div>
      <h4 className="text-xl font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}

function ProcessStep({ number, title, desc }) {
  return (
    <div className="relative z-10 bg-white p-6 rounded-xl border border-slate-100 text-center hover:border-blue-200 hover:shadow-lg transition duration-300 group">
      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-lg group-hover:scale-110 transition">
        {number}
      </div>
      <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function MaintenanceCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition group">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// Icono personalizado para "Scan Face / IA"
function ScanFace(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
    </svg>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (Mismo menú y footer consistentes) ---
// ==================================================================================
