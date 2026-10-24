import { Link } from 'react-router-dom';
import { listar } from '../../data/db';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

export default function Ordenes() {
  const ordenes = [...listar('ordenes')].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <>
      <h1 className="h3 fw-bold mb-3">Órdenes / Boletas</h1>
      <div className="card p-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr><th>N° orden</th><th>Fecha</th><th>Cliente</th><th>Comuna</th><th>Total</th><th>Estado</th><th></th></tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>#{orden.numero}</td>
                  <td>{formatearFecha(orden.fecha)}</td>
                  <td>{orden.cliente.nombre} {orden.cliente.apellidos}</td>
                  <td>{orden.direccion.comuna}</td>
                  <td>{formatearPrecio(orden.total)}</td>
                  <td><span className="badge bg-success">{orden.estado}</span></td>
                  <td><Link to={`/admin/ordenes/${orden.id}`} className="btn btn-sm btn-outline-primary">Ver boleta</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
