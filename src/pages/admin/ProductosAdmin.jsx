import { useState } from 'react';
import { Link } from 'react-router-dom';
import { eliminar, filtrarProductos, listar, obtener } from '../../data/db';
import { formatearPrecio } from '../../utils/formato';

// Listado de productos con búsqueda y acciones de CRUD.
export default function ProductosAdmin() {
  // La lista se guarda en el estado para que se refresque al eliminar
  const [productos, setProductos] = useState(() => listar('productos'));
  const [texto, setTexto] = useState('');

  const borrar = (producto) => {
    if (window.confirm(`¿Eliminar "${producto.nombre}"?`)) {
      eliminar('productos', producto.id);
      setProductos(listar('productos'));
    }
  };

  const visibles = filtrarProductos(productos, { texto });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h1 className="h3 fw-bold mb-0">Productos</h1>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/admin/productos/criticos" className="btn btn-outline-danger btn-sm">Productos críticos</Link>
          <Link to="/admin/reportes" className="btn btn-outline-secondary btn-sm">Reportes</Link>
          <Link to="/admin/productos/nuevo" className="btn btn-primary btn-sm"><i className="bi bi-plus-lg me-1"></i>Nuevo producto</Link>
        </div>
      </div>
      <div className="card p-3">
        <input className="form-control mb-3" placeholder="Buscar por nombre..." value={texto} onChange={(e) => setTexto(e.target.value)} aria-label="Buscar producto" />
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Oferta</th><th>Stock</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {visibles.map((p) => (
                <tr key={p.id} className={p.stock <= p.stockCritico ? 'table-danger' : ''}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{obtener('categorias', p.categoriaId)?.nombre || '—'}</td>
                  <td>{formatearPrecio(p.precio)}</td>
                  <td>{p.precioOferta ? formatearPrecio(p.precioOferta) : '—'}</td>
                  <td>{p.stock}</td>
                  <td className="text-nowrap">
                    <Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-outline-primary me-1">Editar</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <small className="text-muted">Las filas en rojo tienen stock igual o menor a su stock crítico.</small>
      </div>
    </>
  );
}
