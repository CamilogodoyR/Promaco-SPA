import ProductoCard from './ProductoCard';

// Grilla responsiva de productos: 1 columna en celular, 2 en
// tablet y 4 en escritorio (clases row-cols de Bootstrap).
export default function ListaProductos({ productos, onAgregar, mensajeVacio = 'No se encontraron productos.' }) {
  if (productos.length === 0) {
    return (
      <div className="alert alert-secondary text-center" data-testid="lista-vacia">
        {mensajeVacio}
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      {productos.map((producto) => (
        <div className="col" key={producto.id}>
          <ProductoCard producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}
