import { Link, useParams } from 'react-router-dom';
import ListaProductos from '../../components/ListaProductos';
import Aviso from '../../components/Aviso';
import useAviso from '../../hooks/useAviso';
import { useCarrito } from '../../context/CarritoContext';
import { listar, obtener, productosPorCategoria } from '../../data/db';

// Vista de categorías: arriba las tarjetas de cada categoría y
// abajo los productos de la categoría seleccionada (/categorias/:id).
export default function Categorias() {
  const { id } = useParams();
  const { agregar } = useCarrito();
  const [aviso, mostrarAviso] = useAviso();

  const categorias = listar('categorias');
  const seleccionada = id ? obtener('categorias', id) : null;
  const productos = seleccionada ? productosPorCategoria(seleccionada.id) : [];

  const agregarProducto = (producto) => {
    agregar(producto);
    mostrarAviso(`"${producto.nombre}" se agregó al carrito`);
  };

  return (
    <div className="container py-4">
      <h1 className="fw-bold text-white mb-4">Categorías</h1>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3 mb-5">
        {categorias.map((categoria) => (
          <div className="col" key={categoria.id}>
            <Link
              to={`/categorias/${categoria.id}`}
              className={`card h-100 text-center p-3 text-decoration-none categoria-tile ${seleccionada?.id === categoria.id ? 'activa border-3' : ''}`}
            >
              <i className={`bi ${categoria.icono} fs-1 text-warning`}></i>
              <span className="fw-semibold text-dark small mt-2">{categoria.nombre}</span>
            </Link>
          </div>
        ))}
      </div>

      {seleccionada ? (
        <>
          <h2 className="h3 text-white">{seleccionada.nombre}</h2>
          <p className="text-light">{seleccionada.descripcion}</p>
          <ListaProductos productos={productos} onAgregar={agregarProducto} mensajeVacio="Esta categoría aún no tiene productos." />
        </>
      ) : (
        <div className="alert alert-secondary">Selecciona una categoría para ver sus productos.</div>
      )}
      <Aviso texto={aviso} />
    </div>
  );
}
