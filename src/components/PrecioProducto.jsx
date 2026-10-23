import { formatearPrecio } from '../utils/formato';

// Muestra el precio normal, o el precio de oferta + el precio
// anterior tachado cuando el producto está en oferta.
export default function PrecioProducto({ precio, precioOferta = null, grande = false }) {
  const tamano = grande ? 'fs-3' : 'fs-5';
  if (precioOferta) {
    return (
      <div>
        <span className="precio-antiguo me-2" data-testid="precio-anterior">{formatearPrecio(precio)}</span>
        <span className={`${tamano} fw-bold text-danger`}>{formatearPrecio(precioOferta)}</span>
      </div>
    );
  }
  return <span className={`${tamano} fw-bold text-primary`}>{formatearPrecio(precio)}</span>;
}
