import { Link, useNavigate } from 'react-router-dom';
import TablaCarrito from '../../components/TablaCarrito';
import ResumenTotales from '../../components/ResumenTotales';
import BotonAccion from '../../components/BotonAccion';
import ListaProductos from '../../components/ListaProductos';
import { useCarrito } from '../../context/CarritoContext';
import { listar } from '../../data/db';

// Carrito: lista de productos para seguir agregando + tabla del carrito.
export default function Carrito() {
  const { items, totales, agregar, cambiarCantidad, quitar, vaciar } = useCarrito();
  const navigate = useNavigate();
  const sugeridos = listar('productos').slice(0, 4);

  return (
    <div className="container py-4">
      <h1 className="fw-bold text-white mb-4">Carrito de compras</h1>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card p-3">
            {items.length === 0 ? (
              <div className="text-center text-muted py-4">
                Tu carrito está vacío. <Link to="/productos">¡Agrega productos desde el catálogo!</Link>
              </div>
            ) : (
              <TablaCarrito items={items} editable onCambiarCantidad={cambiarCantidad} onQuitar={quitar} />
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card p-3">
            <h2 className="h5 fw-bold">Resumen</h2>
            <ResumenTotales subtotal={totales.subtotal} descuento={totales.descuento} total={totales.total} />
            <p className="small text-muted">El 15% se aplica automáticamente a los productos con 50 unidades o más.</p>
            <div className="d-grid gap-2">
              <BotonAccion etiqueta="Comprar ahora" variante="success" icono="bi-credit-card" deshabilitado={items.length === 0} onClick={() => navigate('/checkout')} />
              <BotonAccion etiqueta="Vaciar carrito" variante="outline-secondary" deshabilitado={items.length === 0} onClick={vaciar} />
            </div>
          </div>
        </div>
      </div>

      <h2 className="h4 text-white mt-5 mb-3">Sigue comprando</h2>
      <ListaProductos productos={sugeridos} onAgregar={(p) => agregar(p)} />
    </div>
  );
}
