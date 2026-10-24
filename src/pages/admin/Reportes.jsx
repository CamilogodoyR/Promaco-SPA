import { resumenVentas, productosCriticos } from '../../data/db';
import { formatearPrecio } from '../../utils/formato';

export default function Reportes() {
  const { totalVendido, cantidadOrdenes, masVendidos, porCategoria } = resumenVentas();
  const maximo = Math.max(...porCategoria.map((c) => c.monto), 1);
  const ticketPromedio = cantidadOrdenes ? totalVendido / cantidadOrdenes : 0;

  return (
    <>
      <h1 className="h3 fw-bold mb-3">Reportes</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="card p-3"><small className="text-muted">Total vendido</small><p className="fs-4 fw-bold mb-0">{formatearPrecio(totalVendido)}</p></div></div>
        <div className="col-md-4"><div className="card p-3"><small className="text-muted">Órdenes pagadas</small><p className="fs-4 fw-bold mb-0">{cantidadOrdenes}</p></div></div>
        <div className="col-md-4"><div className="card p-3"><small className="text-muted">Ticket promedio</small><p className="fs-4 fw-bold mb-0">{formatearPrecio(ticketPromedio)}</p></div></div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card p-3 h-100">
            <h2 className="h5 fw-bold">Ventas por categoría</h2>
            {porCategoria.map((c) => (
              <div key={c.categoria} className="mb-2">
                <div className="d-flex justify-content-between small"><span>{c.categoria}</span><span>{formatearPrecio(c.monto)}</span></div>
                <div className="progress" role="progressbar" aria-label={c.categoria} aria-valuenow={c.monto} aria-valuemin="0" aria-valuemax={maximo}>
                  <div className="progress-bar bg-warning" style={{ width: `${(c.monto / maximo) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card p-3 h-100">
            <h2 className="h5 fw-bold">Productos más vendidos</h2>
            <table className="table table-sm">
              <thead><tr><th>Producto</th><th>Unidades</th><th>Monto</th></tr></thead>
              <tbody>
                {masVendidos.map((p) => <tr key={p.nombre}><td>{p.nombre}</td><td>{p.unidades}</td><td>{formatearPrecio(p.monto)}</td></tr>)}
              </tbody>
            </table>
            <p className="small text-muted mb-0">Productos con stock crítico: {productosCriticos().length}</p>
          </div>
        </div>
      </div>
    </>
  );
}
