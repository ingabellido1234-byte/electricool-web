import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  Thermometer, 
  Wind, 
  Activity,
  Flame,
  Settings,
  Camera,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- DATOS DE TODOS LOS SERVICIOS ---
const slides = [
  {
    id: 1,
    badge: "Líderes en Climatización",
    title: "Ingeniería y Confort",
    highlight: "Para Tu Empresa",
    desc: "Instalación, mantenimiento y reparación de sistemas de aire acondicionado con los más altos estándares de eficiencia y confort.",
    image: "./img/aire_acondicionado.jpg", // Asegúrate de que esta ruta exista o usa una URL externa
    link: "/servicio/servicio_aire",
    color: "from-blue-600",
    cards: [
      { icon: <CheckCircle size={24} />, title: "Profesionales Certificados", desc: "Personal técnico altamente cualificado." },
      { icon: <Zap size={24} />, title: "Eficiencia Energética", desc: "Ahorra costos optimizando tu consumo." }
    ]
  },
  {
    id: 2,
    badge: "Seguridad Industrial",
    title: "Sistemas Contra",
    highlight: "Incendios",
    desc: "Protección integral con detección temprana y extinción automática. Cumplimos normativas NFPA e INDECI para proteger vidas y activos.",
    image: "/img/incendio.jpeg",
    link: "/servicio/incendios",
    color: "from-red-600",
    cards: [
      { icon: <ShieldCheck size={24} />, title: "Normativa NFPA", desc: "Cumplimiento de estándares internacionales." },
      { icon: <Flame size={24} />, title: "Detección Inteligente", desc: "Respuesta inmediata ante emergencias." }
    ]
  },
  {
    id: 3,
    badge: "Potencia y Control",
    title: "Electricidad",
    highlight: "Industrial",
    desc: "Montaje de tableros, subestaciones y cableado estructurado. Soluciones de energía confiable para mantener su industria en movimiento.",
    image: "/img/electricidad.jpeg",
    link: "/servicio/electricidad",
    color: "from-yellow-500",
    cards: [
      { icon: <Zap size={24} />, title: "Alta Tensión", desc: "Especialistas en media y baja tensión." },
      { icon: <Activity size={24} />, title: "Continuidad", desc: "Mantenimiento preventivo para cero paradas." }
    ]
  },
  {
    id: 4,
    badge: "Protección Eléctrica",
    title: "Sistemas de",
    highlight: "Pozo a Tierra",
    desc: "Diseño, construcción y certificación de sistemas de puesta a tierra. Garantizamos la seguridad de sus equipos y personal.",
    image: "/img/pozo_tierra.jpeg",
    link: "/servicio/pozo-tierra",
    color: "from-green-600",
    cards: [
      { icon: <ShieldCheck size={24} />, title: "Certificación", desc: "Protocolos válidos para INDECI." },
      { icon: <Zap size={24} />, title: "Baja Resistencia", desc: "Protección efectiva contra descargas." }
    ]
  },
  {
    id: 5,
    badge: "Suministros Garantizados",
    title: "Venta de",
    highlight: "Repuestos",
    desc: "Amplio stock de repuestos originales y universales para sistemas de refrigeración y aire acondicionado. Envíos a todo el país.",
    image: "/img/foto_repuesto.jpg",
    link: "/servicio/repuestos",
    color: "from-indigo-600",
    cards: [
      { icon: <Package size={24} />, title: "Stock Real", desc: "Disponibilidad inmediata de piezas clave." },
      { icon: <Settings size={24} />, title: "Garantía", desc: "Repuestos originales de las mejores marcas." }
    ]
  },
  {
    id: 6,
    badge: "Vigilancia 24/7",
    title: "Cámaras de",
    highlight: "Seguridad",
    desc: "Sistemas de videovigilancia CCTV e IP de última generación. Monitoree su empresa o residencia desde cualquier lugar.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    link: "/servicio/camaras",
    color: "from-purple-600",
    cards: [
      { icon: <Camera size={24} />, title: "Alta Definición", desc: "Imágenes nítidas de día y noche." },
      { icon: <ShieldCheck size={24} />, title: "Acceso Remoto", desc: "Control total desde su celular." }
    ]
  }
];

export default function ServicesHeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Cambia cada 6 segundos
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction < 0 ? 100 : -100,
      transition: { duration: 0.6, ease: "easeIn" }
    })
  };

  return (
    <section className="relative w-full h-[650px] md:h-[750px] flex items-center overflow-hidden bg-slate-900">
      
      {/* FONDO ANIMADO */}
      <AnimatePresence initial={false} custom={direction} mode='wait'>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Imagen Full Width */}
          <motion.img 
            src={slides[current].image} 
            alt={slides[current].title} 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7 }}
          />
          
          {/* Degradado (Gradient) para legibilidad */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].color}/90 via-slate-900/80 to-transparent mix-blend-multiply`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
        </motion.div>
      </AnimatePresence>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">
        
        {/* TEXTO IZQUIERDA */}
        <AnimatePresence custom={direction} mode='wait'>
          <motion.div 
            key={current}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-white space-y-6"
          >
            {/* Badge */}
            <div className="inline-block px-4 py-1 bg-white/20 border border-white/30 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-2 shadow-lg">
              {slides[current].badge}
            </div>
            
            {/* Título Principal */}
            <h2 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-xl">
              {slides[current].title} <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[current].color.replace('from-', 'from-white to-')}-200`}>
                {slides[current].highlight}
              </span>
            </h2>
            
            {/* Descripción */}
            <p className="text-slate-200 text-lg md:text-xl max-w-lg leading-relaxed font-light drop-shadow-md">
              {slides[current].desc}
            </p>
            
            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to={slides[current].link}
                className={`px-8 py-4 bg-gradient-to-r ${slides[current].color} to-slate-700 hover:to-slate-600 text-white rounded-lg font-bold transition shadow-lg shadow-black/30 flex items-center justify-center gap-2 group`}
              >
                Ver Servicio <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/proyectos" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-lg font-bold transition shadow-lg flex items-center justify-center"
              >
                Ver Proyectos
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* TARJETAS FLOTANTES DERECHA (Desktop) */}
        <div className="hidden md:flex flex-col gap-6 justify-center h-full pl-10">
          <AnimatePresence custom={direction} mode='wait'>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5 } }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
              className="space-y-6"
            >
              {slides[current].cards.map((card, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/20 transition cursor-pointer transform hover:scale-105 duration-300 shadow-2xl">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${slides[current].color} to-slate-800 text-white flex items-center justify-center shadow-lg`}>
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl">{card.title}</h4>
                    <p className="text-slate-300 text-sm leading-snug">{card.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* CONTROLES DEL CARRUSEL (Bottom) */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center items-center gap-8 z-20 text-white">
        <button 
          onClick={prevSlide} 
          className="p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition border border-white/10 hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === current ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide} 
          className="p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition border border-white/10 hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>

    </section>
  );
}