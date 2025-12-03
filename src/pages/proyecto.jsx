import React, { useState } from 'react';
import { 
  Building, 
  Flame, 
  Zap, 
  Wind, 
  ChevronLeft, 
  ChevronRight, 
  MapPin,
  Calendar,
  ArrowRight,
  Phone,
  MessageCircle,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, Search, ShoppingCart, ChevronDown, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';

export default function Proyectos() {
  const [activeCategory, setActiveCategory] = useState('Hospitales');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Datos simulados de proyectos
  const projectsData = {
    'Hospitales': [
      {
        id: 1,
        title: "Construcción Hospital Regional",
        location: "Cajamarca, Chota",
        date: "2022",
        image: "img/proyectos/1.jpeg",
        desc: "Implementación integral de sistema eléctrico y climatización para nueva ala de hospital."
      },
      {
        id: 2,
        title: "",
        location: "Cajamarca, Chota",
        date: "2022",
        image: "img/proyectos/2.jpeg",
        desc: ""
      },
      {
        id: 3,
        title: "",
        location: "Cajamarca, Chota",
        date: "2022",
        image: "img/proyectos/3.jpeg",
        desc: ""
      },
      {
        id: 4,
        title: "",
        location: "Cajamarca, Chota",
        date: "2022",
        image: "img/proyectos/5.jpeg",
        desc: ""
      },
      {
        id: 5,
        title: "",
        location: "Cajamarca, Chota",
        date: "2022",
        image: "img/proyectos/8.jpeg",
        desc: ""
      },
      {
        id: 6,
        title: "",
        location: "Cajamarca, Chota",
        date: "2022",
        image: "img/proyectos/10.jpeg",
        desc: ""
      }
    ],
    'Incendios': [
      {
        id: 1,
        title: "Instalación de un Sistema contra Incendios",
        location: "Lurín, Lima",
        date: "2023",
        image: "/img/incendio/1.jpeg",
        desc: "Instalación de red de rociadores y cuarto de bombas según norma NFPA."
      },
      {
        id: 2,
        title: "",
        location: "Lurín, Lima",
        date: "2023",
        image: "/img/incendio/2.jpeg",
        desc: ""
      }
      ,
      {
        id: 3,
        title: "",
        location: "Lurín, Lima",
        date: "2023",
        image: "/img/incendio/3.jpeg",
        desc: ""
      },
      {
        id: 4,
        title: "",
        location: "Lurín, Lima",
        date: "2023",
        image: "/img/incendio/4.jpeg",
        desc: ""
      },
      {
        id: 5,
        title: "",
        location: "Lurín, Lima",
        date: "2023",
        image: "/img/incendio/5.jpeg",
        desc: ""
      }
    ],
  };

  const activeProjects = projectsData[activeCategory] || [];
  const currentProject = activeProjects[currentImageIndex % activeProjects.length];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activeProjects.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + activeProjects.length) % activeProjects.length);
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION (Azul Sólido como en la imagen) --- */}
        <section className="bg-blue-600 py-20 text-center text-white relative overflow-hidden">
          {/* Patrón de fondo sutil */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide">
                Nuestros Proyectos
              </h1>
              <div className="w-24 h-1 bg-white/50 mx-auto rounded-full mb-6"></div>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Descubre nuestros trabajos más destacados. Cada proyecto refleja nuestro compromiso con la excelencia, la seguridad y la innovación tecnológica.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- GALERÍA PRINCIPAL (Carrusel Filtrable) --- */}
        <section className="py-16 bg-white relative -mt-10 rounded-t-3xl shadow-xl z-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6">
            
            {/* Filtros / Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <TabButton 
                active={activeCategory === 'Hospitales'} 
                onClick={() => { setActiveCategory('Hospitales'); setCurrentImageIndex(0); }}
                icon={<Building size={18} />}
                text="CONSTRUCCIÓN HOSPITAL"
              />
              <TabButton 
                active={activeCategory === 'Incendios'} 
                onClick={() => { setActiveCategory('Incendios'); setCurrentImageIndex(0); }}
                icon={<Flame size={18} />}
                text="SISTEMA CONTRA INCENDIOS"
              />
          
            </div>

            {/* Visor de Proyecto (Carrusel) */}
            <div className="max-w-5xl mx-auto">
              {currentProject ? (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 group h-[500px]">
                  
                  {/* Imagen de Fondo */}
                  <AnimatePresence mode='wait'>
                    <motion.img 
                      key={currentProject.image}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={currentProject.image} 
                      alt={currentProject.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition duration-500"
                    />
                  </AnimatePresence>

                  {/* Flechas de Navegación */}
                  {activeProjects.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition border border-white/20 z-20">
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-sm transition border border-white/20 z-20">
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Información del Proyecto (Overlay) */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-8 md:p-12 text-white">
                    <motion.div
                      key={currentProject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-4 text-sm font-bold text-blue-400 mb-2 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {currentProject.location}</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {currentProject.date}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-3">{currentProject.title}</h2>
                      <p className="text-slate-300 max-w-2xl text-lg font-light leading-relaxed">
                        {currentProject.desc}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Paginación (Puntos) */}
                  <div className="absolute bottom-6 right-8 flex gap-2">
                    {activeProjects.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-blue-500 w-6' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>

                </div>
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-slate-100 rounded-2xl text-slate-400">
                  No hay proyectos en esta categoría aún.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* --- ESTADÍSTICAS RÁPIDAS --- */}
        <section className="py-16 bg-slate-900 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
              <StatItem number="+100" label="Proyectos Ejecutados" />
              <StatItem number="+10" label="Años de Experiencia" />
              <StatItem number="+50" label="Clientes Corporativos" />
              <StatItem number="100%" label="Cumplimiento de Plazos" />
            </div>
          </div>
        </section>

        

        {/* --- CTA --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
             <h2 className="text-3xl font-bold text-slate-900 mb-6">¿Tiene un proyecto en mente?</h2>
             <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg">
               Nuestro equipo de ingenieros está listo para asesorarlo en la planificación y ejecución de su obra.
             </p>
             <div className="flex justify-center gap-4">
               <Link to='/contacto'className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center gap-2">
                 <Phone size={20} /> Contactar Ingeniería
               </Link>
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

function TabButton({ active, onClick, text, icon }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 border
        ${active 
          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105' 
          : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-500'}
      `}
    >
      {icon}
      {text}
    </button>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="p-4">
      <div className="text-4xl font-bold text-blue-400 mb-1">{number}</div>
      <div className="text-sm text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

