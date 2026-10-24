import { Routes, Route } from 'react-router-dom';
import LayoutTienda from './components/layout/LayoutTienda';
import LayoutAdmin from './components/layout/LayoutAdmin';
import RutaAdmin from './components/layout/RutaAdmin';

// Vistas de la tienda
import Home from './pages/tienda/Home';
import Productos from './pages/tienda/Productos';
import DetalleProducto from './pages/tienda/DetalleProducto';
import Categorias from './pages/tienda/Categorias';
import Ofertas from './pages/tienda/Ofertas';
import Carrito from './pages/tienda/Carrito';
import Checkout from './pages/tienda/Checkout';
import ResultadoCompra from './pages/tienda/ResultadoCompra';
import Blogs from './pages/tienda/Blogs';
import DetalleBlog from './pages/tienda/DetalleBlog';
import Nosotros from './pages/tienda/Nosotros';
import Contacto from './pages/tienda/Contacto';
import Login from './pages/tienda/Login';
import Registro from './pages/tienda/Registro';
import NoEncontrado from './pages/tienda/NoEncontrado';

// Vistas del administrador
import Dashboard from './pages/admin/Dashboard';
import Ordenes from './pages/admin/Ordenes';
import Boleta from './pages/admin/Boleta';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import ProductoForm from './pages/admin/ProductoForm';
import ProductosCriticos from './pages/admin/ProductosCriticos';
import CategoriasAdmin from './pages/admin/CategoriasAdmin';
import CategoriaForm from './pages/admin/CategoriaForm';
import UsuariosAdmin from './pages/admin/UsuariosAdmin';
import UsuarioForm from './pages/admin/UsuarioForm';
import HistorialCompras from './pages/admin/HistorialCompras';
import Reportes from './pages/admin/Reportes';
import Perfil from './pages/admin/Perfil';

// Mapa de rutas: reemplaza los múltiples archivos .html de la entrega 1.
// React Router cambia de vista sin recargar la página (SPA).
export default function App() {
  return (
    <Routes>
      <Route element={<LayoutTienda />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:id" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<ResultadoCompra exito />} />
        <Route path="/compra-error" element={<ResultadoCompra exito={false} />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<DetalleBlog />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>

      <Route path="/admin" element={<RutaAdmin><LayoutAdmin /></RutaAdmin>}>
        <Route index element={<Dashboard />} />
        <Route path="ordenes" element={<Ordenes />} />
        <Route path="ordenes/:id" element={<Boleta />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="productos/nuevo" element={<ProductoForm />} />
        <Route path="productos/criticos" element={<ProductosCriticos />} />
        <Route path="productos/:id/editar" element={<ProductoForm />} />
        <Route path="categorias" element={<CategoriasAdmin />} />
        <Route path="categorias/nueva" element={<CategoriaForm />} />
        <Route path="categorias/:id/editar" element={<CategoriaForm />} />
        <Route path="usuarios" element={<UsuariosAdmin />} />
        <Route path="usuarios/nuevo" element={<UsuarioForm />} />
        <Route path="usuarios/:id/editar" element={<UsuarioForm />} />
        <Route path="usuarios/:id/historial" element={<HistorialCompras />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="perfil" element={<Perfil />} />
      </Route>
    </Routes>
  );
}
