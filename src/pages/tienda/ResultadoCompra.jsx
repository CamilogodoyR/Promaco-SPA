import { Link } from 'react-router-dom';
import DetalleOrden from '../../components/DetalleOrden';
import { ultimaOrden } from '../../data/db';

// Una sola vista para los dos resultados del pago.
// La prop "exito" decide qué mensaje, color y botones mostrar.
export default function ResultadoCompra({ exito }) {
  const orden = ultimaOrden();

  if (!orden) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-white h3">No hay una compra reciente</h1>
        <Link to="/productos" className="btn btn-light mt-3">Ir a productos</Link>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 960 }}>
      <div className="card p-4">
        {exito ? (
          <>
            <div className="d-flex justify-content-between flex-wrap">
              <h1 className="h3 fw-bold text-success"><i className="bi bi-check-circle me-2"></i>Se ha realizado la compra. Nro #{orden.numero}</h1>
              <span className="small text-muted">Código orden: ORDER{orden.id}</span>
            </div>
            <p className="text-muted">Gracias por comprar en Promaco SpA. Este es el detalle de tu pedido.</p>
          </>
        ) : (
          <>
            <h1 className="h3 fw-bold text-danger"><i className="bi bi-x-circle me-2"></i>No se pudo realizar el pago. Nro #{orden.numero}</h1>
            <div className="alert alert-danger">{orden.motivo || 'El pago fue rechazado.'}</div>
            <div className="text-center mb-3">
              <Link to="/carrito" className="btn btn-success">VOLVER A REALIZAR EL PAGO</Link>
            </div>
          </>
        )}

        <DetalleOrden orden={orden} etiquetaTotal={exito ? 'Total pagado' : 'Total a pagar'} />

        {exito && (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <button className="btn btn-danger" onClick={() => window.print()}><i className="bi bi-printer me-1"></i>Imprimir boleta</button>
            <Link to="/productos" className="btn btn-dark">Seguir comprando</Link>
          </div>
        )}
      </div>
    </div>
  );
}
