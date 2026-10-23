// =========================================================
// CONTEXTO DEL CARRITO
// Guarda el carrito en el ESTADO de React (useState) y lo
// sincroniza con localStorage a través de db.js.
// Así, cuando se agrega un producto en el catálogo, la barra
// de navegación y la página del carrito se actualizan solas.
// =========================================================
import { createContext, useContext, useState } from 'react';
import * as db from '../data/db';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  // Estado inicial: lo que esté guardado en localStorage
  const [items, setItems] = useState(() => db.obtenerCarrito());

  const agregar = (producto, cantidad = 1) => setItems(db.agregarAlCarrito(producto, cantidad));
  const cambiarCantidad = (productoId, cantidad) => setItems(db.cambiarCantidad(productoId, cantidad));
  const quitar = (productoId) => setItems(db.quitarDelCarrito(productoId));
  const vaciar = () => setItems(db.vaciarCarrito());
  const recargar = () => setItems(db.obtenerCarrito());

  const totales = db.calcularTotales(items);

  return (
    <CarritoContext.Provider value={{ items, totales, agregar, cambiarCantidad, quitar, vaciar, recargar }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  return contexto;
}
