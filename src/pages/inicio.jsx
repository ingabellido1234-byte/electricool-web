import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Zap, 
  Wind, 
  ShieldCheck, 
  Wrench, 
  Thermometer, 
  Flame, 
  Camera, 
  ArrowRight,
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Menu as MenuIcon, 
  X, 
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- INSTRUCCIONES PARA TU PROYECTO LOCAL ---
// 1. En tu editor de código (VS Code), descomenta las siguientes líneas de importación:
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';
import Carrusel from '../components/Carrusel/Carousel'

// 2. BORRA las funciones 'Menu' y 'Footer' que he puesto al final de este archivo 
//    para que funcione la previsualización aquí.

export default function Inicio() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Componente Menú */}
      <Menu />
      <Carrusel/>

      {/* 2. Contenido de la Página */}
      <main className="flex-grow">
        
        

        {/* --- ABOUT SECTION --- */}
        <section id="nosotros" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-100 rounded-full z-0"></div>
                <img 
                  src="./img/aire.jpg" 
                  alt="Técnico aire acondicionado" 
                  className="relative z-10 rounded-2xl shadow-2xl w-full object-cover h-[400px]"
                />
                <div className="absolute bottom-8 left-8 z-20 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Experiencia</p>
                    <p className="font-bold text-slate-900">+10 Años de Servicio</p>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Sobre Nosotros</span>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Especialistas en Aire Acondicionado y Calefacción
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  En ElectriCool, entendemos que el confort ambiental es crucial para la productividad y el bienestar. Nos dedicamos a la instalación, mantenimiento y reparación de sistemas HVAC tanto para residencias como para grandes industrias.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle size={14} /></span>
                    Garantía de confort y bienestar.
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle size={14} /></span>
                    Mantenimiento preventivo y correctivo.
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle size={14} /></span>
                    Tecnología de última generación.
                  </li>
                </ul>
                <Link 
                  to="/nosotros" 
                  className="mt-8 px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-900 hover:text-white transition inline-block"
                >
                  Conoce más de nosotros
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section id="servicios" className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios</h2>
              <p className="text-slate-600">
                Descubra nuestra amplia gama de servicios especializados. Diseñados para brindar el máximo rendimiento y seguridad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<Wind size={32} />} 
                title="Aire Acondicionado" 
                desc="Instalación y mantenimiento de sistemas HVAC residenciales e industriales."
                image="./img/nosotros.jpg"
                ruta='/servicio/servicio_aire'
              />
              <ServiceCard 
                icon={<Flame size={32} />} 
                title="Sistemas Contra Incendios" 
                desc="Detección temprana y supresión automática para proteger sus activos."
                image="./img/incendio.jpeg"
                ruta='/servicio/incendios'
              />
              <ServiceCard 
                icon={<Zap size={32} />} 
                title="Electricidad Industrial" 
                desc="Montaje de tableros, cableado estructurado y subestaciones eléctricas."
                image="./img/electricidad.jpeg"
                ruta='/servicio/electricidad'
              />
              <ServiceCard 
                icon={<ShieldCheck size={32} />} 
                title="Pozo a Tierra" 
                desc="Instalación y medición de sistemas de puesta a tierra certificados."
                image="./img/pozo_tierra.jpeg"
                ruta='/servicio/pozo-tierra'
              />
              <ServiceCard 
                icon={<Wrench size={32} />} 
                title="Repuestos y Mantenimiento" 
                desc="Venta de insumos originales y servicio técnico especializado."
                image="./img/foto_repuesto.jpg"
                ruta='/servicio/repuestos'
              />
              <ServiceCard 
                icon={<Camera size={32} />} 
                title="Cámaras de Seguridad" 
                desc="Sistemas de videovigilancia CCTV y monitoreo remoto 24/7."
                image="./img/foto_camaras.jpg"
                ruta='/servicio/camaras'
              />
            </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US --- */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-blue-400 font-bold uppercase tracking-wider text-sm">Nuestras Ventajas</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">¿Por qué elegirnos?</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FeatureItem icon={<Zap />} title="Precios Competitivos" desc="Ofrecemos la mejor relación calidad-precio del mercado sin sacrificar excelencia." />
               <FeatureItem icon={<ShieldCheck />} title="Garantía de Calidad" desc="Respaldamos todos nuestros trabajos con garantías extendidas por escrito." />
               <FeatureItem icon={<CheckCircle />} title="Experiencia Profesional" desc="Técnicos certificados con años de trayectoria en el sector industrial." />
               <FeatureItem icon={<Wrench />} title="Personal Calificado" desc="Capacitación constante en las últimas normativas y tecnologías." />
               <FeatureItem icon={<Thermometer />} title="Servicio Garantizado" desc="Compromiso total con la satisfacción del cliente en cada proyecto." />
               <FeatureItem icon={<Camera />} title="Tecnología Avanzada" desc="Utilizamos herramientas y equipos de última generación." />
            </div>
          </div>
        </section>
      </main>

      {/* 3. Componente Footer */}
      <Footer />
    </div>
  );
}

// -----------------------------------------------------------
// SUB-COMPONENTES UI
// -----------------------------------------------------------

function ServiceCard({ icon, title, desc, image, ruta }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition z-10"></div>
        <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md z-20 text-blue-600">
          {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">{desc}</p>
        <Link 
          to={ruta} 
          className="inline-flex items-center text-blue-600 font-bold text-sm hover:gap-2 transition-all">
            Leer más <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition duration-300 hover:bg-slate-800">
      <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center mb-4">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// -----------------------------------------------------------------------
// DEFINICIONES LOCALES PARA QUE FUNCIONE EL PREVIEW
// En tu proyecto local, BORRA TODO LO DE ABAJO y usa los imports
// -----------------------------------------------------------------------

