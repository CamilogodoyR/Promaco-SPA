import { Link } from 'react-router-dom';
import { productosCriticos } from '../../data/db';

export default function ProductosCriticos() {
  const criticos = productosCriticos();
  return (
    <>
      <h1 className="h3 fw-bold">Listado de productos críticos</h1>
      <p className="text-muted">Productos con stock igual o menor a su stock crítico. Hay que reponerlos.</p>
      <div className="card p-3">
        {criticos.length === 0 ? (
          <p className="mb-0 text-success">No hay productos en estado crítico.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-danger"><tr><th>Código</th><th>Producto</th><th>Stock</th><th>Stock crítico</th><th></th></tr></thead>
              <tbody>
                {criticos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td className="fw-bold text-danger">{p.stock}</td>
                    <td>{p.stockCritico}</td>
                    <td><Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-outline-primary">Reponer stock</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
