import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PrecioProducto from '../../components/PrecioProducto';
import ListaProductos from '../../components/ListaProductos';
import Aviso from '../../components/Aviso';
import useAviso from '../../hooks/useAviso';
import { useCarrito } from '../../context/CarritoContext';
import { obtener, productosPorCategoria, PROMO_MINIMO_UNIDADES } from '../../data/db';

// Ficha del producto. El id llega por la URL (/productos/:id),
// reemplazando el ?producto=cemento de la entrega 1.
export default function DetalleProducto() {
  const { id } = useParams();
  const { agregar } = useCarrito();
  const [aviso, mostrarAviso] = useAviso();
  const [cantidad, setCantidad] = useState(1);

  const producto = obtener('productos', id);
  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-white">Producto no encontrado</h1>
        <Link to="/productos" className="btn btn-light mt-3">Volver a productos</Link>
      </div>
    );
  }

  const categoria = obtener('categorias', producto.categoriaId);
  const relacionados = productosPorCategoria(producto.categoriaId).filter((p) => p.id !== producto.id).slice(0, 4);

  const agregarProducto = (p, cant = 1) => {
    agregar(p, cant);
    mostrarAviso(`Se agregaron ${cant} unidad(es) de "${p.nombre}"`);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-warning">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/categorias/${categoria?.id}`} className="text-warning">{categoria?.nombre}</Link></li>
          <li className="breadcrumb-item active text-light" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="card p-4 p-md-5 mb-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-5 text-center">
            <img src={producto.imagen} className="img-fluid rounded shadow-sm" style={{ maxHeight: 350 }} alt={producto.nombre} />
          </div>
          <div className="col-md-7">
            <span className="badge bg-secondary mb-2">{producto.codigo}</span>
            <h1 className="h2 fw-bold">{producto.nombre}</h1>
            <p className="text-muted">{producto.descripcion}</p>
            <div className="mb-3">
              <PrecioProducto precio={producto.precio} precioOferta={producto.precioOferta} grande />
              <span className="text-muted small">c/u (IVA incluido)</span>
            </div>
            <p className="small text-muted">Stock disponible: {producto.stock}</p>
            <div className="alert alert-warning border-0">
              🔥 <strong>Promoción Constructor:</strong> lleva {PROMO_MINIMO_UNIDADES} unidades o más y obtén 15% de descuento.
            </div>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <label htmlFor="cantidad" className="small fw-bold">Cantidad</label>
              <input id="cantidad" type="number" min="1" max={producto.stock} className="form-control" style={{ width: 100 }}
                value={cantidad} onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value, 10) || 1))} />
              <button className="btn btn-dark" disabled={producto.stock <= 0} onClick={() => agregarProducto(producto, cantidad)}>
                <i className="bi bi-cart-plus me-1"></i>Agregar al carrito
              </button>
              <Link to="/productos" className="btn btn-outline-dark">Volver</Link>
            </div>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <>
          <h2 className="h4 text-white mb-3">Productos relacionados</h2>
          <ListaProductos productos={relacionados} onAgregar={(p) => agregarProducto(p)} />
        </>
      )}
      <Aviso texto={aviso} />
    </div>
  );
}
