import { Link } from 'react-router-dom';
import PrecioProducto from './PrecioProducto';
import BotonAccion from './BotonAccion';

// Tarjeta de un producto. Recibe por props el producto a mostrar
// y la función onAgregar, que decide el componente padre.
export default function ProductoCard({ producto, onAgregar }) {
  const sinStock = producto.stock <= 0;

  return (
    <div className="card h-100 p-3 producto-card" data-testid="producto-card">
      <div className="position-relative">
        <img src={producto.imagen} className="card-img-top rounded" alt={producto.nombre} />
        {producto.precioOferta && <span className="badge bg-danger position-absolute top-0 start-0 m-2">OFERTA</span>}
      </div>
      <div className="card-body d-flex flex-column px-0 pb-0">
        <h3 className="h6 fw-bold text-dark">{producto.nombre}</h3>
        <div className="mb-2">
          <PrecioProducto precio={producto.precio} precioOferta={producto.precioOferta} />
        </div>
        <small className={sinStock ? 'text-danger' : 'text-muted'}>
          {sinStock ? 'Sin stock' : `Stock disponible: ${producto.stock}`}
        </small>
        <div className="mt-auto pt-3 d-grid gap-2">
          <Link to={`/productos/${producto.id}`} className="btn btn-outline-dark btn-sm">
            Ver detalle
          </Link>
          <BotonAccion
            etiqueta="Agregar al carrito"
            icono="bi-cart-plus"
            className="btn-sm"
            deshabilitado={sinStock}
            onClick={() => onAgregar(producto)}
          />
        </div>
      </div>
    </div>
  );
}
