import React from 'react';
import { 
  Snowflake, 
  Settings, 
  Thermometer, 
  Wind, 
  Package, 
  Truck, 
  UserCheck, 
  Search, 
  CheckCircle,
  Phone,
  MessageCircle,
  PenTool,
  Wrench,
  HelpCircle,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, MapPin, ShoppingCart, ChevronDown, Zap, Mail, LayoutGrid
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';

export default function Repuestos() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Imagen de fondo: Repuestos o Taller */}
            <img 
              src="/img/foto_repuesto.jpg" 
              alt="Repuestos de Refrigeración" 
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
              <div className="text-sm font-bold tracking-widest uppercase text-blue-300 mb-2">Inicio / Servicios / Repuestos</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Repuestos de Refrigeración
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Stock permanente de repuestos originales y universales para sistemas de climatización y frío industrial.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- EXPERTOS EN REPUESTOS --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Calidad y Garantía</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Expertos en Suministros de Refrigeración
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  En ElectriCool Perú, entendemos que cada minuto cuenta cuando un equipo falla. Por eso, mantenemos un inventario robusto de componentes críticos para aire acondicionado y refrigeración.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Trabajamos directamente con fabricantes líderes para asegurar que cada pieza instalada cumpla con los estándares de rendimiento originales.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge icon={<Package size={18} />} text="Stock Permanente" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<Truck size={18} />} text="Envíos a Nivel Nacional" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<CheckCircle size={18} />} text="Garantía de Fábrica" color="text-blue-600" bg="bg-blue-50" />
                </div>
              </div>
              
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
                <img 
                  src="/img/foto_refrigeracion.jpg" 
                  alt="Almacén de Repuestos" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- CATEGORÍAS DE REPUESTOS --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Categorías de Repuestos</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CategoryCard 
                icon={<Settings />}
                image="/img/compresor.jpg"
                title="Compresores"
                items={["Compresores Scroll", "Compresores Herméticos", "Compresores Rotativos", "Aceites y Lubricantes"]}
              />
              <CategoryCard 
                icon={<Zap />}
                image="/img/protector.jpg"
                title="Componentes Eléctricos"
                items={["Contactores y Relés", "Capacitores de arranque", "Protectores térmicos", "Tarjetas electrónicas"]}
              />
              <CategoryCard 
                icon={<Wind />}
                image="/img/gases.jpg"
                title="Gases Refrigerantes"
                items={["R-410A Ecológico", "R-134a Automotriz", "R-22 Industrial", "Gases de limpieza"]}
              />
              <CategoryCard 
                icon={<Thermometer />}
                title="Válvulas y Controles"
                image="/img/valvula.jpg"
                items={["Válvulas de expansión", "Filtros secadores", "Termostatos digitales", "Válvulas solenoides"]}
              />
            </div>
          </div>
        </section>

        {/* --- MARCAS --- */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-10">Marcas Líderes en Refrigeración</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition duration-500">
               {/* Logos simulados con texto estilizado */}
               <span className="text-3xl font-black text-red-600 uppercase italic">DANFOSS</span>
               <span className="text-3xl font-bold text-blue-900">Emerson</span>
               <span className="text-3xl font-bold text-slate-800">COPELAND</span>
               <span className="text-3xl font-extrabold text-blue-600">Carrier</span>
               <span className="text-3xl font-bold text-slate-700 tracking-tighter">Trane</span>
               <span className="text-3xl font-bold text-black italic">LG</span>
            </div>
          </div>
        </section>

        {/* --- POR QUÉ ELEGIRNOS --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">¿Por Qué Elegirnos?</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
               <FeatureCard icon={<LayoutGrid />} title="Amplio Stock" desc="Disponibilidad inmediata en repuestos de alta rotación." />
               <FeatureCard icon={<UserCheck />} title="Asesoría Especializada" desc="Equipo técnico le ayuda a seleccionar el repuesto correcto." />
               <FeatureCard icon={<Truck />} title="Entrega Rápida" desc="Despachos diarios a Lima y provincias." />
               <FeatureCard icon={<CheckCircle />} title="Garantía Total" desc="Productos originales con respaldo de fabricante." />
            </div>
          </div>
        </section>

        {/* --- CÓMO COMPRAR --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">¿Cómo Comprar?</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

              <ProcessStep number="1" title="Identifique su Repuesto" desc="Envíenos foto o modelo de la pieza que necesita." />
              <ProcessStep number="2" title="Cotización Inmediata" desc="Le enviamos precio y disponibilidad en minutos." />
              <ProcessStep number="3" title="Confirmación" desc="Realice el pago de forma segura por transferencia." />
              <ProcessStep number="4" title="Entrega Rápida" desc="Reciba su repuesto en obra o almacén." />
            </div>
          </div>
        </section>

        {/* --- SERVICIOS COMPLEMENTARIOS --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
             <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Servicios Complementarios</h2>
             </div>
             
             <div className="grid md:grid-cols-3 gap-8">
               <ServiceHelpCard 
                 icon={<Wrench />} 
                 title="Instalación de Repuestos" 
                 desc="No solo vendemos la pieza, también podemos instalarla profesionalmente."
               />
               <ServiceHelpCard 
                 icon={<Search />} 
                 title="Diagnóstico Técnico" 
                 desc="Si no está seguro de la falla, realizamos una evaluación técnica."
               />
               <ServiceHelpCard 
                 icon={<Settings />} 
                 title="Mantenimiento Preventivo" 
                 desc="Programas de mantenimiento para extender la vida útil de sus repuestos."
               />
             </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-16 bg-blue-900 text-white border-t border-blue-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita un Repuesto Específico?</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Contáctenos con la foto de su repuesto y le ayudaremos a encontrarlo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2">
                <PenTool size={18} /> Cotizar Pieza
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

function CategoryCard({ icon, image, title, items }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 overflow-hidden group">
      <div className="h-48 overflow-hidden bg-slate-100 relative">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100" />
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md text-blue-600">
           {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 text-center border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-lg transition bg-white group">
      <div className="w-12 h-12 mx-auto bg-slate-50 text-blue-600 rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
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

function ServiceHelpCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-slate-100 flex items-start gap-4 hover:shadow-md transition">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (Mismo menú y footer consistentes) ---
// ==================================================================================
