import { Link } from 'react-router-dom';
import ListaProductos from '../../components/ListaProductos';
import Aviso from '../../components/Aviso';
import useAviso from '../../hooks/useAviso';
import { useCarrito } from '../../context/CarritoContext';
import { listar, productosEnOferta } from '../../data/db';

export default function Home() {
  const { agregar } = useCarrito();
  const [aviso, mostrarAviso] = useAviso();
  const categorias = listar('categorias');
  const destacados = productosEnOferta().slice(0, 4);

  const agregarProducto = (producto) => {
    agregar(producto);
    mostrarAviso(`"${producto.nombre}" se agregó al carrito`);
  };

  return (
    <div className="container py-4">
      {/* Banner principal */}
      <section className="hero-promaco rounded-4 p-4 p-md-5 mb-5 text-center text-md-start">
        <div className="row align-items-center g-4">
          <div className="col-md-7">
            <h1 className="display-5 fw-bold text-white">Todo para tu obra, en un solo lugar</h1>
            <p className="lead text-light">Cemento, herramientas, pinturas y ferretería con despacho a todo Chile.</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
              <Link to="/productos" className="btn btn-promaco btn-lg">Ver productos</Link>
              <Link to="/ofertas" className="btn btn-outline-light btn-lg">Ofertas</Link>
            </div>
          </div>
          <div className="col-md-5">
            <div className="bg-dark bg-opacity-50 rounded-3 p-3 text-light">
              <p className="fw-bold mb-1">🔥 Promoción Constructor</p>
              <p className="small mb-0">Lleva 50 unidades o más de un producto y obtén 15% de descuento automático en tu carrito.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mb-5">
        <h2 className="h3 text-white mb-3">Categorías</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
          {categorias.map((categoria) => (
            <div className="col" key={categoria.id}>
              <Link to={`/categorias/${categoria.id}`} className="card h-100 text-center p-3 text-decoration-none categoria-tile">
                <i className={`bi ${categoria.icono} fs-1 text-warning`}></i>
                <span className="fw-semibold text-dark small mt-2">{categoria.nombre}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Ofertas destacadas */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 text-white mb-0">Ofertas destacadas</h2>
          <Link to="/ofertas" className="btn btn-outline-light btn-sm">Ver todas</Link>
        </div>
        <ListaProductos productos={destacados} onAgregar={agregarProducto} />
      </section>

      {/* Video institucional (heredado de la entrega 1) */}
      <section className="text-center mb-4">
        <h2 className="h4 text-white mb-3">Conoce Promaco SpA</h2>
        <video className="rounded shadow-lg w-100" style={{ maxWidth: 720 }} controls>
          <source src="/video/video_muestra.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </section>

      <Aviso texto={aviso} />
    </div>
  );
}
