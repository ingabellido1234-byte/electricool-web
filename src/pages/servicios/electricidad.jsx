import React from 'react';
import { 
  Zap, 
  Settings, 
  Activity, 
  ShieldCheck, 
  CheckCircle, 
  BarChart, 
  Cpu,
  HardHat,
  Phone,
  MessageCircle,
  FileText,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, MapPin, Search, ShoppingCart, ChevronDown, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';

export default function Electricidad() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu 
      />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Imagen de fondo: Tablero eléctrico industrial */}
            <img 
              src="/img/fondo_electricidad.jpg" 
              alt="Electricidad Industrial" 
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
              <div className="text-sm font-bold tracking-widest uppercase text-yellow-400 mb-2">Inicio / Servicios / Electricidad Industrial</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Electricidad Industrial
              </h1>
              <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
                Soluciones de energía, automatización y mantenimiento para la industria moderna. Seguridad y eficiencia garantizada.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- EXPERTOS EN ELECTRICIDAD --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Alta Tensión y Control</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                  Expertos en Electricidad Industrial
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  En ElectriCool Perú, contamos con un equipo de ingenieros y técnicos especializados en el diseño, montaje y mantenimiento de infraestructuras eléctricas de media y baja tensión.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Nuestra prioridad es garantizar la continuidad operativa de su planta, cumpliendo rigurosamente con el Código Nacional de Electricidad y las normas internacionales IEC/NEC.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Badge icon={<ShieldCheck size={18} />} text="Normativa NEC/IEC" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<Activity size={18} />} text="Soporte 24/7" color="text-blue-600" bg="bg-blue-50" />
                  <Badge icon={<HardHat size={18} />} text="Seguridad Industrial" color="text-blue-600" bg="bg-blue-50" />
                </div>
              </div>
              
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group border-4 border-slate-100">
                <img 
                  src="/img/foto_electricidad.jpeg" 
                  alt="Ingeniero Eléctrico" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SERVICIOS ELÉCTRICOS (Grid) --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios Eléctricos</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SubServiceCard 
                icon={<Zap />}
                title="Instalaciones Eléctricas"
                items={["Tableros de distribución", "Transformadores de potencia", "Sistemas de iluminación LED", "Cableado estructurado"]}
              />
              <SubServiceCard 
                icon={<Settings />}
                title="Mantenimiento"
                items={["Mantenimiento de subestaciones", "Análisis de aceite dieléctrico", "Limpieza de tableros", "Termografía infrarroja"]}
              />
              <SubServiceCard 
                icon={<Cpu />}
                title="Proyectos Especiales"
                items={["Automatización industrial", "Sistemas de respaldo (UPS)", "Variadores de velocidad", "Sistemas SCADA básicos"]}
              />
              <SubServiceCard 
                icon={<BarChart />}
                title="Auditorías Eléctricas"
                items={["Calidad de energía", "Eficiencia energética", "Estudios de carga", "Corrección de factor de potencia"]}
              />
            </div>
          </div>
        </section>

        {/* --- POR QUÉ ELEGIRNOS --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">¿Por Qué Elegirnos?</h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <ReasonCard icon={<HardHat />} title="Personal Calificado" desc="Ingenieros colegiados y técnicos con amplia experiencia en el sector." />
              <ReasonCard icon={<Activity />} title="Respuesta Inmediata" desc="Atención rápida ante fallas críticas para minimizar tiempos muertos." />
              <ReasonCard icon={<ShieldCheck />} title="Garantía de Calidad" desc="Protocolos de prueba rigurosos antes de cada entrega." />
              <ReasonCard icon={<Cpu />} title="Tecnología Avanzada" desc="Equipos de medición de última generación calibrados." />
            </div>
          </div>
        </section>

        {/* --- PROCESO DE TRABAJO --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Nuestro Proceso de Trabajo</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 z-0"></div>

              <ProcessStep number="1" title="Diagnóstico" desc="Levantamiento de información y análisis del estado actual." />
              <ProcessStep number="2" title="Planificación" desc="Diseño de ingeniería y cronograma de ejecución." />
              <ProcessStep number="3" title="Ejecución" desc="Implementación bajo estrictas normas de seguridad." />
              <ProcessStep number="4" title="Control de Calidad" desc="Pruebas finales y entrega de dossier técnico." />
            </div>
          </div>
        </section>

        {/* --- EQUIPOS Y HERRAMIENTAS (Sección Nueva de la imagen) --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Equipos y Herramientas Especializadas</h2>
              <p className="text-slate-500 mt-2">Utilizamos tecnología de punta para diagnósticos precisos</p>
            </div>

            <div className="grid md:grid-cols-4 gap-7">
              <ToolCard 
                image="/img/multimetro.png" 
                title="Multímetros Digitales" 
                desc="Medición precisa de variables eléctricas." 
              />
              <ToolCard 
                image="/img/camara_termo.png" 
                title="Cámaras Termográficas" 
                desc="Detección de puntos calientes en tableros." 
              />
              <ToolCard 
                image="/img/analizador.jpg" 
                title="Analizadores de Redes" 
                desc="Estudio de calidad de energía y armónicos." 
              />
              <ToolCard 
                image="/img/megometro.png" 
                title="Megómetros" 
                desc="Pruebas de aislamiento en cables y motores." 
              />
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Necesita un Servicio Eléctrico Industrial?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Evite paradas imprevistas. Agende una visita técnica hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition flex items-center justify-center gap-2">
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

function ReasonCard({ icon, title, desc }) {
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

function ToolCard({ image, title, desc }) {
  return (
    <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition group">
      <div className="h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
      </div>
      <div className="p-6 text-center">
        <h4 className="font-bold text-blue-900 mb-1">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (Mismo menú y footer consistentes) ---
// ==================================================================================
