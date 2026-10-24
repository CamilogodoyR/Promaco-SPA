import { useState } from 'react';
import { Link } from 'react-router-dom';
import { eliminar, listar, productosPorCategoria } from '../../data/db';

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState(() => listar('categorias'));
  const [error, setError] = useState('');

  const borrar = (categoria) => {
    // No se puede borrar una categoría que todavía tiene productos
    if (productosPorCategoria(categoria.id).length > 0) {
      setError(`"${categoria.nombre}" tiene productos asociados. Muévelos antes de eliminarla.`);
      return;
    }
    if (window.confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)) {
      eliminar('categorias', categoria.id);
      setCategorias(listar('categorias'));
      setError('');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 fw-bold mb-0">Categorías</h1>
        <Link to="/admin/categorias/nueva" className="btn btn-primary btn-sm"><i className="bi bi-plus-lg me-1"></i>Nueva categoría</Link>
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="card p-3">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-dark"><tr><th>Nombre</th><th>Descripción</th><th>Productos</th><th>Acciones</th></tr></thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td><i className={`bi ${c.icono} me-2`}></i>{c.nombre}</td>
                  <td>{c.descripcion}</td>
                  <td>{productosPorCategoria(c.id).length}</td>
                  <td className="text-nowrap">
                    <Link to={`/admin/categorias/${c.id}/editar`} className="btn btn-sm btn-outline-primary me-1">Editar</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(c)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
