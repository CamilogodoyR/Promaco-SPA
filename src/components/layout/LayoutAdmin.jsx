import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSesion } from '../../context/SesionContext';

const MENU = [
  { ruta: '/admin', texto: 'Dashboard', icono: 'bi-speedometer2', exacto: true },
  { ruta: '/admin/ordenes', texto: 'Órdenes', icono: 'bi-receipt' },
  { ruta: '/admin/productos', texto: 'Productos', icono: 'bi-box-seam' },
  { ruta: '/admin/categorias', texto: 'Categorías', icono: 'bi-tags' },
  { ruta: '/admin/usuarios', texto: 'Usuarios', icono: 'bi-people' },
  { ruta: '/admin/reportes', texto: 'Reportes', icono: 'bi-bar-chart' },
  { ruta: '/admin/perfil', texto: 'Perfil', icono: 'bi-person-circle' },
];

// Estructura del panel de administración: barra lateral con el
// menú (arriba en celulares) y el contenido de la ruta al lado.
export default function LayoutAdmin() {
  const { usuario, cerrarSesion } = useSesion();
  const navigate = useNavigate();

  const salir = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link className="navbar-brand navbar-brand-logo d-flex align-items-center gap-2" to="/admin">
          <img src="/img/promaco_logo_fondo_blanco.png" alt="Logo Promaco SpA" />
          <span className="fw-bold">Promaco Admin</span>
        </Link>
        <span className="text-light small">{usuario?.nombre} {usuario?.apellidos}</span>
      </nav>
      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          <aside className="col-md-3 col-lg-2 admin-sidebar p-3">
            <ul className="nav nav-pills flex-md-column gap-1">
              {MENU.map((item) => (
                <li className="nav-item" key={item.ruta}>
                  <NavLink to={item.ruta} end={item.exacto} className="nav-link">
                    <i className={`bi ${item.icono} me-2`}></i>
                    {item.texto}
                  </NavLink>
                </li>
              ))}
            </ul>
            <hr className="text-secondary" />
            <div className="d-grid gap-2">
              <Link to="/" className="btn btn-outline-light btn-sm"><i className="bi bi-shop me-1"></i>Ir a la tienda</Link>
              <button className="btn btn-danger btn-sm" onClick={salir}><i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión</button>
            </div>
          </aside>
          <section className="col-md-9 col-lg-10 admin-contenido p-3 p-md-4">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
}
