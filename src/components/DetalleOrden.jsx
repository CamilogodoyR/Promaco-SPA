import TablaCarrito from './TablaCarrito';
import ResumenTotales from './ResumenTotales';
import { formatearFecha } from '../utils/formato';

// Datos de cliente, dirección y productos de una orden.
// Se reutiliza en "compra exitosa", "pago con error" y en la boleta del admin.
export default function DetalleOrden({ orden, etiquetaTotal = 'Total pagado' }) {
  const { cliente, direccion } = orden;
  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <h3 className="h6 fw-bold">Cliente</h3>
          <p className="mb-0">{cliente.nombre} {cliente.apellidos}</p>
          <p className="mb-0 text-muted small">{cliente.correo}</p>
          {orden.fecha && <p className="mb-0 text-muted small">Fecha: {formatearFecha(orden.fecha)}</p>}
        </div>
        <div className="col-md-6">
          <h3 className="h6 fw-bold">Dirección de entrega</h3>
          <p className="mb-0">{direccion.calle}{direccion.departamento ? `, ${direccion.departamento}` : ''}</p>
          <p className="mb-0 text-muted small">{direccion.comuna}, {direccion.region}</p>
          {direccion.indicaciones && <p className="mb-0 text-muted small">Indicaciones: {direccion.indicaciones}</p>}
        </div>
      </div>
      <TablaCarrito items={orden.items} />
      <div className="mt-3">
        <ResumenTotales subtotal={orden.subtotal} descuento={orden.descuento} total={orden.total} etiquetaTotal={etiquetaTotal} />
      </div>
    </>
  );
}
