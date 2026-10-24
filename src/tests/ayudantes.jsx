// Funciones de ayuda compartidas por las pruebas.
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SesionProvider } from '../context/SesionContext';
import { CarritoProvider } from '../context/CarritoContext';

// Renderiza un componente dentro de los mismos "providers" que usa la app
// (router, sesión y carrito), para que funcione igual que en el navegador.
export function renderConApp(ui, { ruta = '/', patron = '*' } = {}) {
  return render(
    <MemoryRouter initialEntries={[ruta]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SesionProvider>
        <CarritoProvider>
          <Routes>
            <Route path={patron} element={ui} />
            <Route path="/admin" element={<h1>Panel admin</h1>} />
            <Route path="/compra-exitosa" element={<h1>Compra exitosa</h1>} />
            <Route path="/compra-error" element={<h1>Compra con error</h1>} />
          </Routes>
        </CarritoProvider>
      </SesionProvider>
    </MemoryRouter>,
  );
}

// Producto de ejemplo para las pruebas de componentes
export const productoDePrueba = {
  id: 99,
  codigo: 'TST-001',
  nombre: 'Martillo de prueba',
  categoriaId: 2,
  precio: 10000,
  precioOferta: null,
  stock: 10,
  stockCritico: 2,
  imagen: '/img/cemento.jpg',
  descripcion: 'Producto creado solo para las pruebas.',
};
