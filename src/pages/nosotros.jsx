import React from 'react';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  CheckCircle,
  Users,
  Award,
  // Iconos necesarios para el Footer/Menu simulados (Bórralos en tu local si ya importas los componentes)
  Phone, Mail, Clock, Facebook, Instagram, Linkedin, Menu as MenuIcon, X, MapPin, Zap as ZapIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "Simulados" del final
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';

export default function Nosotros() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado aquí, en tu local será el componente importado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        {/* Usamos el mismo estilo del Home pero más compacto para páginas internas */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="./img/foto_aire.jpg" 
              alt="Equipo de trabajo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/80"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Sobre Nosotros
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
            >
              Especialistas en climatización, energía y seguridad industrial con más de 10 años de trayectoria.
            </motion.p>
          </div>
        </section>

        {/* --- NUESTRA HISTORIA --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              {/* Texto Historia */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mb-4">
                  Nuestra Trayectoria
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Historia de la Empresa
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  Con más de 15 años de experiencia, somos líderes en soluciones de climatización. Nuestro compromiso con la excelencia y la satisfacción del cliente nos ha convertido en referentes del sector.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Comenzamos como un pequeño equipo de técnicos apasionados y hoy somos una empresa integral que brinda servicios especializados a grandes industrias y residencias en todo el país.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle size={20} />
                    </div>
                    <span className="font-semibold text-slate-800">Técnicos Certificados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="font-semibold text-slate-800">Garantía Asegurada</span>
                  </div>
                </div>
              </motion.div>

              {/* Grid de Imágenes (Collage Moderno) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[500px]"
              >
                {/* Imagen Principal */}
                <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
                  <img 
                    src="./img/nosotros.jpg" 
                    alt="Técnico trabajando" 
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
                {/* Imagen Secundaria 1 */}
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-white">
                  <img 
                    src="./img/foto_electricidad.jpeg" 
                    alt="Detalle técnico" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Elemento Decorativo */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-dots-pattern opacity-20"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- MISIÓN Y VISIÓN --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Tarjeta Misión */}
              <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                  <Target size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Misión</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ser un proveedor enfocado en el área de servicios de construcción, supervisión y gerencia de proyectos que equilibre los requerimientos de calidad, alcance de tiempo y costos.
                </p>
              </div>

              {/* Tarjeta Visión */}
              <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-slate-100 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                  <Eye size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Visión</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ser una empresa dedicada al servicio al cliente, con la eficiencia de sobrepasar las expectativas del usuario; generando buenas utilidades y brindando a nuestros empleados una mejor calidad de vida.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* --- VALORES / POR QUÉ CONFIAR --- */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Fondo decorativo sutil */}
          <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50 -skew-y-3 z-0 transform origin-top-left scale-110"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                ¿Por Qué Confiar en Nosotros?
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ValueCard 
                icon={<Users size={32} />}
                title="Confianza y Cercanía"
                desc="Confianza y tranquilidad ya que el servicio será prestado cumpliendo a cabalidad lo acordado. Entendimiento de las necesidades específicas del cliente."
              />
              <ValueCard 
                icon={<Zap size={32} />}
                title="Respuesta Rápida"
                desc="Respuesta rápida y específica a las necesidades del cliente. Seguridad que tenemos la competencia, el conocimiento y la habilidad requeridos."
              />
              <ValueCard 
                icon={<MessageSquare size={32} />}
                title="Comunicación Constante"
                desc="Involucramiento y comunicación constante sobre los datos y hechos relevantes del proceso. Seguridad y garantía sobre la integridad del servicio."
              />
            </div>
          </div>
        </section>

      </main>

      {/* 3. Footer (Simulado aquí, en tu local será el componente importado) */}
      <Footer />
    </div>
  );
}

// --- COMPONENTE AUXILIAR PARA TARJETAS DE VALORES ---
function ValueCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition duration-300">
      <div className="w-14 h-14 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-slate-900/20">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (BORRAR ESTA PARTE EN TU PROYECTO LOCAL) ---
// ==================================================================================

// Copia exacta del Menu de tu Home para mantener consistencia visual aquí