import ListaProductos from '../../components/ListaProductos';
import Aviso from '../../components/Aviso';
import useAviso from '../../hooks/useAviso';
import { useCarrito } from '../../context/CarritoContext';
import { productosEnOferta } from '../../data/db';

export default function Ofertas() {
  const { agregar } = useCarrito();
  const [aviso, mostrarAviso] = useAviso();
  const ofertas = productosEnOferta();

  const agregarProducto = (producto) => {
    agregar(producto);
    mostrarAviso(`"${producto.nombre}" se agregó al carrito`);
  };

  return (
    <div className="container py-4">
      <h1 className="fw-bold text-white">Ofertas</h1>
      <p className="text-light mb-4">Productos con precio rebajado por tiempo limitado.</p>
      <ListaProductos productos={ofertas} onAgregar={agregarProducto} mensajeVacio="Por ahora no hay productos en oferta." />
      <Aviso texto={aviso} />
    </div>
  );
}
