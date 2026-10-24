import { Link } from 'react-router-dom';
import { listar, productosCriticos, resumenVentas } from '../../data/db';
import { formatearPrecio } from '../../utils/formato';

const MODULOS = [
  { ruta: '/admin/ordenes', titulo: 'Órdenes', texto: 'Seguimiento de las compras realizadas.', icono: 'bi-receipt' },
  { ruta: '/admin/productos', titulo: 'Productos', texto: 'Administrar inventario y detalles.', icono: 'bi-box-seam' },
  { ruta: '/admin/categorias', titulo: 'Categorías', texto: 'Organizar los productos.', icono: 'bi-tags' },
  { ruta: '/admin/usuarios', titulo: 'Usuarios', texto: 'Cuentas y roles del sistema.', icono: 'bi-people' },
  { ruta: '/admin/reportes', titulo: 'Reportes', texto: 'Ventas y productos más vendidos.', icono: 'bi-bar-chart' },
  { ruta: '/admin/perfil', titulo: 'Perfil', texto: 'Tus datos de administrador.', icono: 'bi-person-circle' },
  { ruta: '/', titulo: 'Tienda', texto: 'Ver la tienda como cliente.', icono: 'bi-shop' },
];

export default function Dashboard() {
  const productos = listar('productos');
  const usuarios = listar('usuarios');
  const ventas = resumenVentas();
  const criticos = productosCriticos();
  const inventario = productos.reduce((suma, p) => suma + p.stock, 0);

  return (
    <>
      <h1 className="h3 fw-bold">Dashboard</h1>
      <p className="text-muted">Resumen de las actividades de la tienda</p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card stat-card bg-primary p-3">
            <p className="mb-1"><i className="bi bi-cart3 me-2"></i>Compras</p>
            <p className="fs-2 fw-bold mb-0">{ventas.cantidadOrdenes}</p>
            <small>Total vendido: {formatearPrecio(ventas.totalVendido)}</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card bg-success p-3">
            <p className="mb-1"><i className="bi bi-box-seam me-2"></i>Productos</p>
            <p className="fs-2 fw-bold mb-0">{productos.length}</p>
            <small>Inventario actual: {inventario} unidades</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card bg-warning text-dark p-3">
            <p className="mb-1"><i className="bi bi-people me-2"></i>Usuarios</p>
            <p className="fs-2 fw-bold mb-0">{usuarios.length}</p>
            <small>Clientes: {usuarios.filter((u) => u.rol === 'cliente').length}</small>
          </div>
        </div>
      </div>

      {criticos.length > 0 && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span><i className="bi bi-exclamation-triangle me-2"></i>Hay {criticos.length} producto(s) con stock crítico.</span>
          <Link to="/admin/productos/criticos" className="btn btn-sm btn-danger">Ver listado</Link>
        </div>
      )}

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-3">
        {MODULOS.map((modulo) => (
          <div className="col" key={modulo.titulo}>
            <Link to={modulo.ruta} className="card h-100 p-3 text-center text-decoration-none">
              <i className={`bi ${modulo.icono} fs-2 text-primary`}></i>
              <span className="fw-bold text-dark">{modulo.titulo}</span>
              <small className="text-muted">{modulo.texto}</small>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
