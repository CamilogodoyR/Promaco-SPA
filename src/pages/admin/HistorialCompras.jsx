import { Link, useParams } from 'react-router-dom';
import { obtener, ordenesDeUsuario } from '../../data/db';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

export default function HistorialCompras() {
  const { id } = useParams();
  const usuario = obtener('usuarios', id);
  if (!usuario) return <div className="alert alert-warning">Usuario no encontrado.</div>;
  const ordenes = ordenesDeUsuario(usuario.id);
  const total = ordenes.reduce((suma, o) => suma + o.total, 0);

  return (
    <>
      <h1 className="h3 fw-bold">Historial de compras</h1>
      <p className="text-muted">{usuario.nombre} {usuario.apellidos} · {usuario.correo}</p>
      <div className="card p-3">
        {ordenes.length === 0 ? (
          <p className="mb-0">Este usuario aún no tiene compras.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark"><tr><th>N° orden</th><th>Fecha</th><th>Productos</th><th>Total</th><th></th></tr></thead>
              <tbody>
                {ordenes.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.numero}</td>
                    <td>{formatearFecha(o.fecha)}</td>
                    <td>{o.items.reduce((s, i) => s + i.cantidad, 0)} unidades</td>
                    <td>{formatearPrecio(o.total)}</td>
                    <td><Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-primary">Ver boleta</Link></td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr><th colSpan="3">Total comprado</th><th>{formatearPrecio(total)}</th><th></th></tr></tfoot>
            </table>
          </div>
        )}
      </div>
      <Link to="/admin/usuarios" className="btn btn-dark mt-3">Volver a usuarios</Link>
    </>
  );
}
