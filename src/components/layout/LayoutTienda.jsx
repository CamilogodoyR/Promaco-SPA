import { Outlet } from 'react-router-dom';
import NavbarTienda from './NavbarTienda';
import Footer from './Footer';

// Estructura común de todas las páginas de la tienda:
// navbar arriba, contenido de la ruta (Outlet) y footer abajo.
export default function LayoutTienda() {
  return (
    <>
      <NavbarTienda />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
