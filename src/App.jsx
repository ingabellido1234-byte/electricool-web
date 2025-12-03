import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Importamos tu página desde la carpeta correcta
// NOTA: Asegúrate de que el nombre del archivo coincida (inicio o Inicio)
import Inicio from './pages/inicio';
import Nosotros from './pages/nosotros';
import Servicios from './pages/servicio';
import Proyectos from './pages/proyecto';
import Contacto from './pages/contacto';
import AireAcondicionado from './pages/servicios/servicio_aire';
import Incendios from './pages/servicios/incendios';
import Electricidad from './pages/servicios/electricidad';
import PozoTierra from './pages/servicios/pozo-tierra';
import Repuestos from './pages/servicios/repuestos';
import Camaras from './pages/servicios/camaras';
import ScrollTop from './components/scrollTop'


function App() {
  return (
    <BrowserRouter>
    <ScrollTop/>
      <Routes>
        {/* path="/" significa la página principal */}
        <Route path="/" element={<Inicio />} />
        
        {/* Aquí podrás agregar más páginas en el futuro, por ejemplo:
        <Route path="/nosotros" element={<Nosotros />} /> 
        */
        <Route path="/nosotros" element={<Nosotros />} />
        }
        
        <Route path="/servicio" element={<Servicios />} />
        
        <Route path="/servicio/servicio_aire" element={<AireAcondicionado />} />
        <Route path="/servicio/incendios" element={<Incendios />} />
        <Route path="/servicio/electricidad" element={<Electricidad />} />
        <Route path="/servicio/pozo-tierra" element={<PozoTierra />} />
        <Route path="/servicio/repuestos" element={<Repuestos />} />
        <Route path="/servicio/camaras" element={<Camaras />} />

        <Route path="/proyecto" element={<Proyectos />} />
        <Route path="/contacto" element={<Contacto />} />





        
      </Routes>
    </BrowserRouter>
  );
}

export default App;