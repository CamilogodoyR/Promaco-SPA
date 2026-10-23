import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-promaco py-4">
      <div className="container">
        <div className="row g-3 small">
          <div className="col-md-4">
            <p className="fw-bold text-light mb-1">🏗️ Promaco SpA</p>
            <p className="mb-0">Materiales y herramientas para la construcción.</p>
          </div>
          <div className="col-md-4">
            <p className="fw-bold text-light mb-1">Tienda</p>
            <Link to="/productos" className="d-block text-reset">Productos</Link>
            <Link to="/ofertas" className="d-block text-reset">Ofertas</Link>
            <Link to="/contacto" className="d-block text-reset">Contacto</Link>
          </div>
          <div className="col-md-4">
            <p className="fw-bold text-light mb-1">Contacto</p>
            <p className="mb-0">ventas@promaco.cl</p>
            <p className="mb-0">+56 2 2345 6789</p>
          </div>
        </div>
        <p className="text-center mb-0 mt-3 small">Constructora Promaco SpA - Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
