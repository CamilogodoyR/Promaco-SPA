import { formatearPrecio } from '../utils/formato';

// Muestra subtotal, descuento (solo si hay) y total.
export default function ResumenTotales({ subtotal, descuento, total, etiquetaTotal = 'Total a pagar' }) {
  return (
    <ul className="list-group mb-3">
      <li className="list-group-item d-flex justify-content-between">
        <span>Subtotal</span>
        <span>{formatearPrecio(subtotal)}</span>
      </li>
      {descuento > 0 && (
        <li className="list-group-item d-flex justify-content-between text-success" data-testid="fila-descuento">
          <span>Promoción Constructor (-15%)</span>
          <span>-{formatearPrecio(descuento)}</span>
        </li>
      )}
      <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
        <span>{etiquetaTotal}</span>
        <span>{formatearPrecio(total)}</span>
      </li>
    </ul>
  );
}
