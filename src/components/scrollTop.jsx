import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando cambia la ruta (pathname), sube el scroll a (0,0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Este componente no renderiza nada visualmente
}