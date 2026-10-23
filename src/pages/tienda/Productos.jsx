import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListaProductos from '../../components/ListaProductos';
import Aviso from '../../components/Aviso';
import useAviso from '../../hooks/useAviso';
import { useCarrito } from '../../context/CarritoContext';
import { listar, filtrarProductos } from '../../data/db';

// Catálogo con filtros: búsqueda por texto, categoría y orden.
// Cada filtro vive en el ESTADO del componente; al cambiar,
// React vuelve a calcular la lista y la vuelve a dibujar.
export default function Productos() {
  const [params] = useSearchParams();
  const { agregar } = useCarrito();
  const [aviso, mostrarAviso] = useAviso();

  const [texto, setTexto] = useState(params.get('q') || '');
  const [categoriaId, setCategoriaId] = useState('');
  const [orden, setOrden] = useState('');

  // Si se busca desde la barra de navegación, se actualiza el filtro
  useEffect(() => {
    setTexto(params.get('q') || '');
  }, [params]);

  const categorias = listar('categorias');
  const productos = filtrarProductos(listar('productos'), { texto, categoriaId, orden });

  const agregarProducto = (producto) => {
    agregar(producto);
    mostrarAviso(`"${producto.nombre}" se agregó al carrito`);
  };

  const limpiar = () => {
    setTexto('');
    setCategoriaId('');
    setOrden('');
  };

  return (
    <div className="container py-4">
      <h1 className="fw-bold text-white mb-4">Productos</h1>

      <div className="card p-3 mb-4">
        <div className="row g-2 align-items-end">
          <div className="col-md-5">
            <label htmlFor="filtro-texto" className="form-label small fw-bold">Buscar</label>
            <input id="filtro-texto" className="form-control" placeholder="Ej: cemento, taladro..." value={texto} onChange={(e) => setTexto(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label htmlFor="filtro-categoria" className="form-label small fw-bold">Categoría</label>
            <select id="filtro-categoria" className="form-select" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
              <option value="">Todas</option>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="filtro-orden" className="form-label small fw-bold">Ordenar por</label>
            <select id="filtro-orden" className="form-select" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="">Relevancia</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>
          <div className="col-md-2 d-grid">
            <button className="btn btn-outline-secondary" onClick={limpiar}>Limpiar</button>
          </div>
        </div>
      </div>

      <p className="text-light small">{productos.length} producto(s) encontrado(s)</p>
      <ListaProductos productos={productos} onAgregar={agregarProducto} mensajeVacio="No hay productos que coincidan con tu búsqueda." />
      <Aviso texto={aviso} />
    </div>
  );
}
