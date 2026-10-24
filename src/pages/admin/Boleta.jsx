import { Link, useParams } from 'react-router-dom';
import DetalleOrden from '../../components/DetalleOrden';
import { obtener } from '../../data/db';

export default function Boleta() {
  const { id } = useParams();
  const orden = obtener('ordenes', id);
  if (!orden) return <div className="alert alert-warning">Orden no encontrada.</div>;

  return (
    <div className="card p-4" style={{ maxWidth: 960 }}>
      <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
        <h1 className="h4 fw-bold mb-0">Boleta N° {orden.numero}</h1>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-dark" onClick={() => window.print()}><i className="bi bi-printer me-1"></i>Imprimir</button>
          <Link to="/admin/ordenes" className="btn btn-sm btn-dark">Volver</Link>
        </div>
      </div>
      <DetalleOrden orden={orden} />
    </div>
  );
}
