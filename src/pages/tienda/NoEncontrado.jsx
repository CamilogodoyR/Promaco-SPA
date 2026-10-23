import { Link } from 'react-router-dom';

export default function NoEncontrado() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 fw-bold text-white">404</h1>
      <p className="text-light">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-promaco">Volver al inicio</Link>
    </div>
  );
}
