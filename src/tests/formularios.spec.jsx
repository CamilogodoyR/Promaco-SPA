// =========================================================
// PRUEBAS DE ESTADO (state) Y EVENTOS EN PÁGINAS CON FORMULARIOS
// =========================================================
import { screen, fireEvent } from '@testing-library/react';
import Login from '../pages/tienda/Login';
import Contacto from '../pages/tienda/Contacto';
import Productos from '../pages/tienda/Productos';
import Checkout from '../pages/tienda/Checkout';
import ProductosAdmin from '../pages/admin/ProductosAdmin';
import { renderConApp } from './ayudantes';
import { agregarAlCarrito, listar, obtener } from '../data/db';

// Antes de cada prueba se parte con localStorage limpio (datos iniciales)
beforeEach(() => localStorage.clear());

describe('Pruebas de estado: Login', () => {
  it('el estado del formulario cambia cuando el usuario escribe', () => {
    renderConApp(<Login />);
    const correo = screen.getByLabelText(/Correo electrónico/);

    fireEvent.change(correo, { target: { value: 'mathias@duoc.cl' } });
    expect(correo.value).toBe('mathias@duoc.cl');
  });

  it('valida en tiempo real y muestra el error mientras se escribe un dominio no permitido', () => {
    renderConApp(<Login />);
    fireEvent.change(screen.getByLabelText(/Correo electrónico/), { target: { value: 'juan@hotmail.com' } });

    expect(screen.getByTestId('error-correo').textContent).toContain('Solo se aceptan correos');
  });

  it('al enviar vacío muestra los errores de correo y contraseña', () => {
    renderConApp(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(screen.getByTestId('error-correo').textContent).toBe('El correo es obligatorio.');
    expect(screen.getByTestId('error-clave').textContent).toBe('La contraseña es obligatoria.');
  });

  it('con contraseña incorrecta muestra un mensaje y no inicia sesión', () => {
    renderConApp(<Login />);
    fireEvent.change(screen.getByLabelText(/Correo electrónico/), { target: { value: 'mathias@duoc.cl' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/), { target: { value: 'otra123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(screen.getByRole('alert').textContent).toBe('La contraseña es incorrecta.');
    expect(localStorage.getItem('promaco_sesion')).toBeNull();
  });

  it('un administrador con datos correctos es redirigido al panel', () => {
    renderConApp(<Login />);
    fireEvent.change(screen.getByLabelText(/Correo electrónico/), { target: { value: 'mathias@duoc.cl' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(screen.getByRole('heading', { name: 'Panel admin' })).toBeTruthy();
  });
});

describe('Pruebas de estado: Contacto', () => {
  it('muestra el mensaje de éxito y limpia el formulario cuando los datos son válidos', () => {
    renderConApp(<Contacto />);
    const escribir = (etiqueta, valor) => fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
    escribir(/Nombre completo/, 'Camilo Godoy');
    escribir(/Teléfono/, '+56 9 1234 5678');
    escribir(/Correo electrónico/, 'camilo@duoc.cl');
    escribir(/Dirección del trabajo/, 'Concha y Toro 980');
    escribir(/Descripción breve/, 'Necesito cotizar un radier de 20 m2');
    fireEvent.click(screen.getByRole('button', { name: 'Enviar solicitud' }));

    expect(screen.getByRole('status').textContent).toContain('Recibimos tu solicitud');
    expect(screen.getByLabelText(/Nombre completo/).value).toBe('');
  });

  it('valida el teléfono con menos de 8 dígitos', () => {
    renderConApp(<Contacto />);
    fireEvent.change(screen.getByLabelText(/Teléfono/), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar solicitud' }));

    expect(screen.getByTestId('error-telefono').textContent).toContain('mínimo 8 dígitos');
  });
});

describe('Pruebas de estado: filtros del catálogo', () => {
  it('al escribir en el buscador se muestran solo los productos que coinciden', () => {
    renderConApp(<Productos />);
    expect(screen.getAllByTestId('producto-card').length).toBe(12);

    fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'cemento' } });
    expect(screen.getAllByTestId('producto-card').length).toBe(1);
    expect(screen.getByText('Cemento Polpaico Especial 25kg')).toBeTruthy();
  });

  it('el filtro de categoría y el botón Limpiar actualizan la lista', () => {
    renderConApp(<Productos />);
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: '3' } }); // Pinturas
    expect(screen.getAllByTestId('producto-card').length).toBe(2);

    fireEvent.click(screen.getByRole('button', { name: 'Limpiar' }));
    expect(screen.getAllByTestId('producto-card').length).toBe(12);
  });
});

describe('Pruebas de eventos con mocks: panel admin y checkout', () => {
  it('eliminar un producto pide confirmación (window.confirm simulado) y lo quita de la tabla', () => {
    const confirmar = spyOn(window, 'confirm').and.returnValue(true); // mock: el usuario acepta
    renderConApp(<ProductosAdmin />);

    const fila = screen.getByText('Gravilla Saco 25kg').closest('tr');
    fireEvent.click(fila.querySelector('.btn-outline-danger'));

    expect(confirmar).toHaveBeenCalled();
    expect(screen.queryByText('Gravilla Saco 25kg')).toBeNull();
    expect(obtener('productos', 4)).toBeNull();
  });

  it('si el usuario cancela la confirmación, el producto NO se elimina', () => {
    spyOn(window, 'confirm').and.returnValue(false); // mock: el usuario cancela
    renderConApp(<ProductosAdmin />);

    const fila = screen.getByText('Gravilla Saco 25kg').closest('tr');
    fireEvent.click(fila.querySelector('.btn-outline-danger'));

    expect(screen.getByText('Gravilla Saco 25kg')).toBeTruthy();
    expect(listar('productos').length).toBe(12);
  });

  it('el checkout redirige a "compra con error" cuando se pide más que el stock disponible', () => {
    agregarAlCarrito(obtener('productos', 4), 5); // gravilla: hay solo 4 en stock
    renderConApp(<Checkout />);

    const escribir = (etiqueta, valor) => fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
    escribir(/^Nombre/, 'Pedro');
    escribir(/Apellidos/, 'Constructor');
    escribir(/Correo/, 'pedro@gmail.com');
    escribir(/^Calle/, 'Los Crisantemos 603');
    escribir(/Región/, 'Región Metropolitana de Santiago');
    escribir(/Comuna/, 'Cerrillos');
    fireEvent.click(screen.getByRole('button', { name: /Pagar ahora/ }));

    expect(screen.getByRole('heading', { name: 'Compra con error' })).toBeTruthy();
    expect(obtener('productos', 4).stock).toBe(4); // el stock no se tocó
  });
});
