import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Ruler, 
  FileText, 
  CheckCircle, 
  Activity, 
  Hammer,
  Search,
  BookOpen,
  Umbrella,
  HardHat,
  Server,
  Phone,
  MessageCircle,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, MapPin, ShoppingCart, ChevronDown, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';

export default function PozoTierra() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Imagen de fondo: Trabajo en pozo a tierra */}
            <img 
              src="/img/fondo_pozo.jpg" 
              alt="Sistema de Pozo a Tierra" 
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
              <div className="text-sm font-bold tracking-widest uppercase text-yellow-400 mb-2">Inicio / Servicios / Pozo a Tierra</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Sistema de Pozo a Tierra
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Seguridad eléctrica garantizada. Instalación, mantenimiento y certificación de sistemas de puesta a tierra.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- EXPERTOS EN PUESTA A TIERRA --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Protección Eléctrica</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Expertos en Sistemas de Puesta a Tierra
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  En ElectriCool Perú, nos especializamos en el diseño y construcción de sistemas de puesta a tierra, garantizando la protección de personas y equipos contra descargas eléctricas.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Nuestras soluciones cumplen con el Código Nacional de Electricidad y garantizan valores de resistencia ohmica ideales para la operatividad segura de su empresa.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge icon={<FileText size={18} />} text="Certificación CNE" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<HardHat size={18} />} text="Personal Calificado" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<ShieldCheck size={18} />} text="Garantía de Servicio" color="text-blue-600" bg="bg-blue-50" />
                </div>
              </div>
              
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 group">
                <img 
                  src="/img/pozo_tierra.jpeg" 
                  alt="Mantenimiento Pozo a Tierra" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICIOS DE POZO A TIERRA --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios de Pozo a Tierra</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SubServiceCard 
                icon={<Hammer />}
                title="Instalación"
                items={["Pozos verticales", "Pozos horizontales", "Mallas a tierra", "Dosis química Thor-Gel"]}
              />
              <SubServiceCard 
                icon={<Search />}
                title="Medición y Certificación"
                items={["Telurometría digital", "Protocolos de pruebas", "Certificados para INDECI", "Informes técnicos"]}
              />
              <SubServiceCard 
                icon={<Wrench />}
                title="Mantenimiento"
                items={["Mantenimiento preventivo", "Tratamiento de tierra", "Mejora de resistividad", "Cambio de conectores"]}
              />
              <SubServiceCard 
                icon={<BookOpen />}
                title="Consultoría"
                items={["Diseño de sistemas", "Cálculos de resistividad", "Asesoría normativa", "Levantamiento de observaciones"]}
              />
            </div>
          </div>
        </section>

        {/* --- CARACTERÍSTICAS TÉCNICAS --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Características Técnicas</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FeatureCard 
                 icon={<Zap size={32} />}
                 title="Resistencia Óptima"
                 desc="Aseguramos valores de resistencia bajos (< 5 Ohms para cómputo, < 25 Ohms general)."
               />
               <FeatureCard 
                 icon={<ShieldCheck size={32} />}
                 title="Materiales Premium"
                 desc="Varillas de cobre puro, conectores de bronce y tratamiento químico de alta calidad."
               />
               <FeatureCard 
                 icon={<Ruler size={32} />}
                 title="Profundidad Adecuada"
                 desc="Excavación según estudio de suelos para garantizar contacto con tierra húmeda."
               />
            </div>
          </div>
        </section>

        {/* --- PROCESO DE INSTALACIÓN --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Proceso de Instalación</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 z-0"></div>

              <ProcessStep number="1" title="Evaluación" desc="Medición de resistividad del terreno y diseño del sistema." />
              <ProcessStep number="2" title="Excavación" desc="Apertura del pozo e instalación del electrodo de cobre." />
              <ProcessStep number="3" title="Instalación" desc="Aplicación de dosis química y relleno con tierra tratada." />
              <ProcessStep number="4" title="Certificación" desc="Medición final con telurometro y emisión de certificado." />
            </div>
          </div>
        </section>

        {/* --- CUMPLIMIENTO NORMATIVO --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">Cumplimiento Normativo</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <NormCard icon={<BookOpen size={32}/>} code="CNE" title="Código Nacional de Electricidad" />
              <NormCard icon={<FileText size={32}/>} code="NTP" title="Normas Técnicas Peruanas" />
              <NormCard icon={<Activity size={32}/>} code="IEEE" title="Estándares Internacionales" />
              <NormCard icon={<ShieldCheck size={32}/>} code="NFPA" title="Normativa Contra Incendios" />
            </div>
          </div>
        </section>

        {/* --- BENEFICIOS --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Beneficios del Sistema de Pozo a Tierra</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <BenefitCard icon={<HardHat />} title="Seguridad Personal" desc="Protección contra descargas eléctricas directas." />
              <BenefitCard icon={<Server />} title="Protección de Equipos" desc="Evita daños en equipos sensibles y servidores." />
              <BenefitCard icon={<CheckCircle />} title="Cumplimiento Legal" desc="Conformidad con normativas municipales e INDECI." />
              <BenefitCard icon={<Umbrella />} title="Descargas Atmosféricas" desc="Disipación segura de rayos y sobretensiones." />
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-16 bg-blue-900 text-white border-t border-blue-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita un Sistema de Pozo a Tierra?</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Evite multas y proteja su inversión. Solicite una visita técnica hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2">
                <FileText size={18} /> Solicitar Visita Técnica
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

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition bg-white group text-left">
      <div className="text-blue-600 mb-4 group-hover:scale-110 transition duration-300">{icon}</div>
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function ProcessStep({ number, title, desc }) {
  return (
    <div className="relative z-10 bg-white p-6 rounded-xl border border-slate-100 text-center hover:border-blue-200 hover:shadow-lg transition duration-300 group">
      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 ring-4 ring-white shadow-lg group-hover:bg-yellow-500 transition">
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
      <div className="text-slate-400 mb-4 flex justify-center group-hover:text-blue-600 transition">{icon}</div>
      <h4 className="text-xl font-bold text-slate-900 mb-1">{code}</h4>
      <p className="text-xs text-slate-500 uppercase font-semibold">{title}</p>
    </div>
  );
}

function BenefitCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 text-center rounded-lg shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 mx-auto bg-slate-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}

// --- ICONO WRENCH (Requerido para sub-servicios) ---
function Wrench(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (Mismo menú y footer consistentes) ---
// ==================================================================================
