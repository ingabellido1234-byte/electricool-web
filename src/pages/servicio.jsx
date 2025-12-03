import React from 'react';
import { 
  Wind, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Wrench, 
  Camera, 
  Check, 
  ArrowRight,
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  Award,
  Users,
  // Iconos para los mocks (borrar en tu local)
  Facebook, Instagram, Linkedin, Menu as MenuIcon, X, MapPin, Search, ShoppingCart, ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- IMPORTACIONES PARA TU PROYECTO LOCAL ---
// Descomenta estas líneas y borra los componentes "MOCK" del final
import Menu from '../components/Menu/Menu';
import Footer from '../components/Footer/Footer';

export default function Servicios() {
  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col">
      
      {/* 1. Menú (Simulado) */}
      <Menu />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/img/fondo_servicio.jpg" 
              alt="Servicios Industriales" 
              className="w-full h-full object-cover"
            />
            {/* Overlay gradiente oscuro */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-400 text-blue-300 text-sm font-semibold mb-4 backdrop-blur-sm">
                Nuestros Servicios
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Soluciones Profesionales para <br/> su Hogar y Empresa
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Expertos en climatización, seguridad y electricidad industrial con los más altos estándares de calidad.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- GRID DE SERVICIOS (Diseño de Tarjetas Específico) --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Servicios Especializados</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Descubra nuestra amplia gama de servicios profesionales diseñados para satisfacer sus necesidades específicas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <ServiceCardDetailed 
                icon={<Wind size={28} />}
                title="Aire Acondicionado"
                features={[
                  "Instalación de sistemas Split y multi-split",
                  "Mantenimiento preventivo y correctivo",
                  "Reparación de equipos industriales",
                  "Asesoría técnica especializada"
                ]}
              />

              <ServiceCardDetailed 
                icon={<Flame size={28} />}
                title="Servicio contra Incendios"
                features={[
                  "Instalación de sistemas de detección",
                  "Mantenimiento de extintores",
                  "Sistemas de rociadores automáticos",
                  "Certificación de sistemas INDECI"
                ]}
              />

              <ServiceCardDetailed 
                icon={<Zap size={28} />}
                title="Electricidad Industrial"
                features={[
                  "Instalación de tableros eléctricos",
                  "Mantenimiento de transformadores",
                  "Sistemas de distribución de energía",
                  "Auditorías eléctricas y certificación"
                ]}
              />

              <ServiceCardDetailed 
                icon={<ShieldCheck size={28} />}
                title="Pozo a Tierra"
                features={[
                  "Instalación de sistemas de puesta a tierra",
                  "Medición de resistencia (Telurometría)",
                  "Mantenimiento con dosis química",
                  "Certificación y protocolo de pruebas"
                ]}
              />

              <ServiceCardDetailed 
                icon={<Wrench size={28} />}
                title="Repuestos"
                features={[
                  "Venta de repuestos originales",
                  "Asesoría técnica en compatibilidad",
                  "Garantía de productos directa",
                  "Instalación profesional incluida"
                ]}
              />

              <ServiceCardDetailed 
                icon={<Camera size={28} />}
                title="Cámaras de Seguridad"
                features={[
                  "Instalación de circuitos CCTV",
                  "Sistemas de monitoreo remoto 24/7",
                  "Mantenimiento de equipos DVR/NVR",
                  "Configuración de alertas móviles"
                ]}
              />

            </div>
          </div>
        </section>

        {/* --- BANNER CTA (Llamada a la acción azul) --- */}
        <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
          {/* Elementos de fondo decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h2 className="text-3xl font-bold mb-2">¿Necesita Nuestros Servicios?</h2>
                <p className="text-blue-200 text-lg mb-6">Contáctenos ahora y reciba una cotización personalizada para su proyecto.</p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 uppercase font-bold">Atención Inmediata</p>
                      <p className="font-bold">+51 987 654 321</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 uppercase font-bold">Correo Electrónico</p>
                      <p className="font-bold">ventas@electracool.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition shadow-lg shadow-black/20 flex items-center gap-2 mx-auto">
                  Solicitar Cotización <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- POR QUÉ ELEGIRNOS (Versión Compacta) --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">¿Por Qué Elegirnos?</h2>
              <p className="text-slate-500 mt-2">Descubra las razones por las que somos la mejor opción.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <ReasonCard icon={<Award />} title="Experiencia Comprobada" desc="Más de 15 años brindando servicios de calidad." />
              <ReasonCard icon={<Users />} title="Técnicos Certificados" desc="Personal altamente capacitado y en constante actualización." />
              <ReasonCard icon={<Clock />} title="Atención Permanente" desc="Servicio de emergencia disponible todos los días." />
              <ReasonCard icon={<ShieldCheck />} title="Garantía de Servicio" desc="Respaldamos la calidad de nuestro trabajo." />
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

// Tarjeta de Servicio detallada (Estilo de la imagen que enviaste)
function ServiceCardDetailed({ icon, title, features }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group flex flex-col h-full">
      {/* Header Azul */}
      <div className="bg-slate-800 p-6 flex items-center gap-4 group-hover:bg-blue-600 transition duration-300">
        <div className="text-white p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      {/* Cuerpo con lista */}
      <div className="p-6 flex-grow">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-600 text-sm">
              <Check size={16} className="text-blue-500 mt-1 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer de la tarjeta con Botón */}
      <div className="p-6 pt-0 mt-auto">
        <button className="w-full py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/30 text-sm">
          Más Información <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ReasonCard({ icon, title, desc }) {
  return (
    <div className="p-6 text-center border border-slate-100 rounded-lg hover:border-blue-200 hover:shadow-lg transition bg-slate-50">
      <div className="w-12 h-12 mx-auto bg-white text-blue-600 rounded-full flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

// ==================================================================================
// --- MOCKS PARA PREVISUALIZACIÓN (BORRAR ESTA PARTE EN TU PROYECTO LOCAL) ---
// ==================================================================================

