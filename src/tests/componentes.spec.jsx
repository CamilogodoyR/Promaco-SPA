// =========================================================
// PRUEBAS DE COMPONENTES: renderizado, props y eventos
// =========================================================
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';
import ListaProductos from '../components/ListaProductos';
import CampoTexto from '../components/CampoTexto';
import BotonAccion from '../components/BotonAccion';
import TablaCarrito from '../components/TablaCarrito';
import ResumenTotales from '../components/ResumenTotales';
import { productoDePrueba } from './ayudantes';

// ProductoCard usa <Link>, por eso se envuelve en un router de memoria
const FUTURO = { v7_startTransition: true, v7_relativeSplatPath: true };
const conRouter = (ui) => render(<MemoryRouter future={FUTURO}>{ui}</MemoryRouter>);

describe('Pruebas de renderizado', () => {
  it('ProductoCard muestra el nombre, el precio y el stock del producto recibido', () => {
    conRouter(<ProductoCard producto={productoDePrueba} onAgregar={() => {}} />);

    expect(screen.getByText('Martillo de prueba')).toBeTruthy();
    expect(screen.getByText('$10.000')).toBeTruthy();
    expect(screen.getByText('Stock disponible: 10')).toBeTruthy();
  });

  it('ListaProductos renderiza una tarjeta por cada producto de la lista', () => {
    const productos = [1, 2, 3].map((id) => ({ ...productoDePrueba, id, nombre: `Producto ${id}` }));
    conRouter(<ListaProductos productos={productos} onAgregar={() => {}} />);

    expect(screen.getAllByTestId('producto-card').length).toBe(3);
    expect(screen.getByText('Producto 3')).toBeTruthy();
  });

  it('ListaProductos muestra un mensaje cuando la lista está vacía', () => {
    conRouter(<ListaProductos productos={[]} onAgregar={() => {}} mensajeVacio="Nada por aquí" />);

    expect(screen.getByTestId('lista-vacia').textContent).toBe('Nada por aquí');
    expect(screen.queryAllByTestId('producto-card').length).toBe(0);
  });
});

describe('Pruebas de renderizado condicional', () => {
  it('CampoTexto muestra el mensaje de error SOLO cuando recibe un error', () => {
    const { rerender } = render(<CampoTexto id="correo" etiqueta="Correo" valor="" onChange={() => {}} />);
    expect(screen.queryByTestId('error-correo')).toBeNull();

    rerender(<CampoTexto id="correo" etiqueta="Correo" valor="" onChange={() => {}} error="Correo inválido" />);
    expect(screen.getByTestId('error-correo').textContent).toBe('Correo inválido');
    expect(screen.getByLabelText(/Correo/).classList.contains('is-invalid')).toBe(true);
  });

  it('ProductoCard muestra la insignia OFERTA y el precio anterior solo si hay oferta', () => {
    const { rerender } = conRouter(<ProductoCard producto={productoDePrueba} onAgregar={() => {}} />);
    expect(screen.queryByText('OFERTA')).toBeNull();

    rerender(
      <MemoryRouter future={FUTURO}>
        <ProductoCard producto={{ ...productoDePrueba, precioOferta: 8000 }} onAgregar={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByText('OFERTA')).toBeTruthy();
    expect(screen.getByTestId('precio-anterior').textContent).toBe('$10.000');
    expect(screen.getByText('$8.000')).toBeTruthy();
  });

  it('ResumenTotales solo muestra la fila de descuento cuando el descuento es mayor a 0', () => {
    const { rerender } = render(<ResumenTotales subtotal={1000} descuento={0} total={1000} />);
    expect(screen.queryByTestId('fila-descuento')).toBeNull();

    rerender(<ResumenTotales subtotal={1000} descuento={150} total={850} />);
    expect(screen.getByTestId('fila-descuento')).toBeTruthy();
  });

  it('ProductoCard deshabilita el botón de compra cuando no hay stock', () => {
    conRouter(<ProductoCard producto={{ ...productoDePrueba, stock: 0 }} onAgregar={() => {}} />);

    expect(screen.getByText('Sin stock')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Agregar al carrito/ }).disabled).toBe(true);
  });
});

describe('Pruebas de propiedades (props)', () => {
  it('BotonAccion recibe correctamente la etiqueta y la función onClick', () => {
    const alHacerClick = vi.fn(); // función simulada (mock)
    render(<BotonAccion etiqueta="Guardar cambios" onClick={alHacerClick} variante="primary" />);

    const boton = screen.getByRole('button', { name: 'Guardar cambios' });
    expect(boton.classList.contains('btn-primary')).toBe(true);

    fireEvent.click(boton);
    expect(alHacerClick).toHaveBeenCalledTimes(1);
  });

  it('BotonAccion deshabilitado no ejecuta la función onClick', () => {
    const alHacerClick = vi.fn();
    render(<BotonAccion etiqueta="Pagar" onClick={alHacerClick} deshabilitado />);

    fireEvent.click(screen.getByRole('button', { name: 'Pagar' }));
    expect(alHacerClick).not.toHaveBeenCalled();
  });

  it('TablaCarrito oculta la columna de acciones cuando editable es false', () => {
    const items = [{ productoId: 1, nombre: 'Cemento', precio: 5990, cantidad: 2 }];
    render(<TablaCarrito items={items} />);

    expect(screen.queryByText('Acciones')).toBeNull();
    expect(screen.getByText('$11.980')).toBeTruthy(); // subtotal = 5990 x 2
  });
});

describe('Pruebas de eventos', () => {
  it('al hacer click en "Agregar al carrito" se llama a onAgregar con el producto', () => {
    const onAgregar = vi.fn();
    conRouter(<ProductoCard producto={productoDePrueba} onAgregar={onAgregar} />);

    fireEvent.click(screen.getByRole('button', { name: /Agregar al carrito/ }));
    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith(productoDePrueba);
  });

  it('CampoTexto ejecuta onChange cuando el usuario escribe', () => {
    const onChange = vi.fn();
    render(<CampoTexto id="nombre" etiqueta="Nombre" valor="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText(/Nombre/), { target: { value: 'Mathias' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('TablaCarrito avisa al padre cuando se cambia una cantidad o se elimina un producto', () => {
    const onCambiarCantidad = vi.fn();
    const onQuitar = vi.fn();
    const items = [{ productoId: 7, nombre: 'Pintura', precio: 1000, cantidad: 1 }];
    render(<TablaCarrito items={items} editable onCambiarCantidad={onCambiarCantidad} onQuitar={onQuitar} />);

    fireEvent.change(screen.getByLabelText('Cantidad de Pintura'), { target: { value: '3' } });
    expect(onCambiarCantidad).toHaveBeenCalledWith(7, 3);

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Pintura' }));
    expect(onQuitar).toHaveBeenCalledWith(7);
  });

  it('TablaCarrito ignora cantidades inválidas (0 o negativas)', () => {
    const onCambiarCantidad = vi.fn();
    const items = [{ productoId: 7, nombre: 'Pintura', precio: 1000, cantidad: 1 }];
    render(<TablaCarrito items={items} editable onCambiarCantidad={onCambiarCantidad} onQuitar={() => {}} />);

    fireEvent.change(screen.getByLabelText('Cantidad de Pintura'), { target: { value: '0' } });
    expect(onCambiarCantidad).not.toHaveBeenCalled();
  });
});
