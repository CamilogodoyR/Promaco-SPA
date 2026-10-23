import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useSesion } from '../../context/SesionContext';
import { listar } from '../../data/db';
import { formatearPrecio } from '../../utils/formato';

// Barra de navegación de la tienda. Se colapsa en celulares
// gracias a las clases navbar-expand-lg de Bootstrap.
export default function NavbarTienda() {
  const { totales } = useCarrito();
  const { usuario, esAdmin, cerrarSesion } = useSesion();
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const categorias = listar('categorias');

  const buscar = (e) => {
    e.preventDefault();
    navigate(`/productos?q=${encodeURIComponent(busqueda.trim())}`);
  };

  const salir = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-ladrillos py-2">
        <div className="container-fluid px-4">
          <Link className="navbar-brand navbar-brand-logo d-flex align-items-center gap-2 me-lg-4" to="/">
            <img src="/img/promaco_logo_fondo_blanco.png" alt="Logo Promaco SpA" />
            <span className="fw-bold">Promaco SpA</span>
          </Link>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#menuTienda" aria-label="Abrir menú">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuTienda">
            <div className="w-100">
              {/* Fila 1: buscador, carrito y sesión */}
              <div className="d-lg-flex align-items-center gap-3 py-2">
                <form className="d-flex flex-grow-1 mb-2 mb-lg-0" role="search" onSubmit={buscar} style={{ maxWidth: 480 }}>
                  <input
                    className="form-control form-control-sm me-2"
                    type="search"
                    placeholder="Buscar productos"
                    aria-label="Buscar productos"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <button className="btn btn-outline-light btn-sm" type="submit">Buscar</button>
                </form>
                <div className="d-flex flex-wrap align-items-center gap-2 ms-lg-auto">
                  <Link to="/carrito" className="btn btn-success btn-sm">
                    <i className="bi bi-cart3 me-1"></i>
                    Carrito {formatearPrecio(totales.total)}
                    {totales.unidades > 0 && <span className="badge bg-light text-dark ms-2">{totales.unidades}</span>}
                  </Link>
                  {usuario ? (
                    <>
                      {esAdmin && <Link to="/admin" className="btn btn-warning btn-sm">Panel admin</Link>}
                      <span className="text-light small">Hola, {usuario.nombre}</span>
                      <button className="btn btn-outline-danger btn-sm" onClick={salir}>Cerrar sesión</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-outline-light btn-sm">Iniciar sesión</Link>
                      <Link to="/registro" className="btn btn-promaco btn-sm">Crear cuenta</Link>
                    </>
                  )}
                </div>
              </div>

              {/* Fila 2: menú de navegación */}
              <ul className="navbar-nav justify-content-lg-center border-top border-secondary pt-1">
                <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categorías
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/categorias">Todas las categorías</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    {categorias.map((c) => (
                      <li key={c.id}><Link className="dropdown-item" to={`/categorias/${c.id}`}>{c.nombre}</Link></li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blog</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
