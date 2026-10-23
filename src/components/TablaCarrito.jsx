import { formatearPrecio } from '../utils/formato';
import { PROMO_MINIMO_UNIDADES } from '../data/db';

// Tabla con los productos del carrito. Si "editable" es true,
// permite cambiar cantidades y eliminar productos; si es false,
// se usa como resumen (checkout, boleta).
export default function TablaCarrito({ items, editable = false, onCambiarCantidad, onQuitar }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th style={{ width: 120 }}>Cantidad</th>
            <th>Subtotal</th>
            {editable && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.productoId} data-testid="fila-carrito">
              <td>
                {item.imagen && <img src={item.imagen} alt="" width="48" height="48" className="rounded object-fit-cover" />}
              </td>
              <td className="fw-semibold">
                {item.nombre}
                {item.cantidad >= PROMO_MINIMO_UNIDADES && <span className="badge bg-warning text-dark ms-2">-15%</span>}
              </td>
              <td>{formatearPrecio(item.precio)}</td>
              <td>
                {editable ? (
                  <input
                    type="number"
                    min="1"
                    className="form-control form-control-sm"
                    aria-label={`Cantidad de ${item.nombre}`}
                    value={item.cantidad}
                    onChange={(e) => {
                      const cantidad = parseInt(e.target.value, 10);
                      if (cantidad > 0) onCambiarCantidad(item.productoId, cantidad);
                    }}
                  />
                ) : (
                  item.cantidad
                )}
              </td>
              <td className="fw-bold">{formatearPrecio(item.precio * item.cantidad)}</td>
              {editable && (
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    aria-label={`Eliminar ${item.nombre}`}
                    onClick={() => onQuitar(item.productoId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
