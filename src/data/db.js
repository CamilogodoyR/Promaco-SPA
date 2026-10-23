// =========================================================
// "BASE DE DATOS" SIMULADA DE PROMACO SPA
// ---------------------------------------------------------
// Este archivo actúa como la fuente de datos de la aplicación.
// Cada colección (productos, categorías, usuarios, órdenes) se
// guarda en localStorage para que los cambios persistan aunque
// se recargue la página o se cierre el navegador.
//
// Expone funciones CRUD genéricas (crear, listar, obtener,
// actualizar, eliminar) y funciones de negocio (carrito, sesión,
// compras, reportes) que usan los componentes de React.
// =========================================================

import { CATEGORIAS, PRODUCTOS, USUARIOS, ORDENES, BLOGS } from './datosIniciales';

const PREFIJO = 'promaco_';

// Datos con los que parte cada colección si localStorage está vacío
const SEMILLAS = {
  productos: PRODUCTOS,
  categorias: CATEGORIAS,
  usuarios: USUARIOS,
  ordenes: ORDENES,
  blogs: BLOGS,
};

export const COLECCIONES = Object.keys(SEMILLAS);

// Porcentaje y cantidad mínima de la "Promoción Constructor"
export const PROMO_MINIMO_UNIDADES = 50;
export const PROMO_DESCUENTO = 0.15;

// ---------------------------------------------------------
// Lectura y escritura en localStorage
// ---------------------------------------------------------
function leer(clave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(PREFIJO + clave);
    return texto ? JSON.parse(texto) : valorPorDefecto;
  } catch {
    // Si el JSON está corrupto, se vuelve al valor por defecto
    return valorPorDefecto;
  }
}

function escribir(clave, valor) {
  localStorage.setItem(PREFIJO + clave, JSON.stringify(valor));
}

function validarColeccion(coleccion) {
  if (!SEMILLAS[coleccion]) {
    throw new Error(`La colección "${coleccion}" no existe`);
  }
}

// =========================================================
// CRUD GENÉRICO
// =========================================================

// LEER: devuelve todos los registros de una colección
export function listar(coleccion) {
  validarColeccion(coleccion);
  const datos = leer(coleccion, null);
  if (datos === null) {
    // Primera vez: se guarda una copia de los datos iniciales
    const copia = structuredClone(SEMILLAS[coleccion]);
    escribir(coleccion, copia);
    return copia;
  }
  return datos;
}

// LEER: devuelve un registro por su id (o null si no existe)
export function obtener(coleccion, id) {
  return listar(coleccion).find((item) => item.id === Number(id)) || null;
}

// CREAR: agrega un registro nuevo con id autoincremental
export function crear(coleccion, datos) {
  const items = listar(coleccion);
  const nuevoId = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
  const nuevo = { ...datos, id: nuevoId };
  escribir(coleccion, [...items, nuevo]);
  return nuevo;
}

// ACTUALIZAR: modifica los campos indicados de un registro
export function actualizar(coleccion, id, cambios) {
  const items = listar(coleccion);
  const indice = items.findIndex((item) => item.id === Number(id));
  if (indice === -1) return null;
  const actualizado = { ...items[indice], ...cambios, id: items[indice].id };
  items[indice] = actualizado;
  escribir(coleccion, items);
  return actualizado;
}

// ELIMINAR: borra un registro; devuelve true si existía
export function eliminar(coleccion, id) {
  const items = listar(coleccion);
  const filtrados = items.filter((item) => item.id !== Number(id));
  escribir(coleccion, filtrados);
  return filtrados.length < items.length;
}

// Restaura todas las colecciones a sus datos iniciales
export function reiniciarDatos() {
  COLECCIONES.forEach((c) => escribir(c, structuredClone(SEMILLAS[c])));
  localStorage.removeItem(PREFIJO + 'carrito');
}

// =========================================================
// PRODUCTOS
// =========================================================

// Precio que realmente se cobra (el de oferta si existe)
export function precioFinal(producto) {
  return producto.precioOferta ? producto.precioOferta : producto.precio;
}

export function productosEnOferta() {
  return listar('productos').filter((p) => p.precioOferta);
}

export function productosPorCategoria(categoriaId) {
  return listar('productos').filter((p) => p.categoriaId === Number(categoriaId));
}

// Productos con stock igual o menor a su stock crítico
export function productosCriticos() {
  return listar('productos').filter((p) => p.stock <= p.stockCritico);
}

// Búsqueda por texto + filtro de categoría + orden
export function filtrarProductos(productos, { texto = '', categoriaId = '', orden = '' } = {}) {
  const busqueda = texto.trim().toLowerCase();
  let resultado = productos.filter((p) => {
    const coincideTexto = !busqueda || p.nombre.toLowerCase().includes(busqueda);
    const coincideCategoria = !categoriaId || p.categoriaId === Number(categoriaId);
    return coincideTexto && coincideCategoria;
  });

  if (orden === 'precio-asc') {
    resultado = [...resultado].sort((a, b) => precioFinal(a) - precioFinal(b));
  } else if (orden === 'precio-desc') {
    resultado = [...resultado].sort((a, b) => precioFinal(b) - precioFinal(a));
  } else if (orden === 'nombre') {
    resultado = [...resultado].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  return resultado;
}

// =========================================================
// CARRITO DE COMPRAS
// =========================================================

export function obtenerCarrito() {
  return leer('carrito', []);
}

export function guardarCarrito(carrito) {
  escribir('carrito', carrito);
  return carrito;
}

// Agrega un producto; si ya estaba, suma la cantidad
export function agregarAlCarrito(producto, cantidad = 1) {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.productoId === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      productoId: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: precioFinal(producto),
      cantidad,
    });
  }
  return guardarCarrito(carrito);
}

export function cambiarCantidad(productoId, cantidad) {
  const carrito = obtenerCarrito()
    .map((item) => (item.productoId === productoId ? { ...item, cantidad } : item))
    .filter((item) => item.cantidad > 0);
  return guardarCarrito(carrito);
}

export function quitarDelCarrito(productoId) {
  return guardarCarrito(obtenerCarrito().filter((item) => item.productoId !== productoId));
}

export function vaciarCarrito() {
  return guardarCarrito([]);
}

// Calcula subtotal, descuento por mayor y total a pagar.
// La promoción aplica 15% solo a los productos con 50 o más unidades.
export function calcularTotales(carrito) {
  let subtotal = 0;
  let descuento = 0;
  carrito.forEach((item) => {
    const linea = item.precio * item.cantidad;
    subtotal += linea;
    if (item.cantidad >= PROMO_MINIMO_UNIDADES) {
      descuento += Math.round(linea * PROMO_DESCUENTO);
    }
  });
  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  return { subtotal, descuento, total: subtotal - descuento, unidades };
}

// =========================================================
// SESIÓN Y USUARIOS
// =========================================================

export function buscarUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase();
  return listar('usuarios').find((u) => u.correo.toLowerCase() === buscado) || null;
}

// Devuelve { ok, usuario } o { ok: false, mensaje }
export function iniciarSesion(correo, clave) {
  const usuario = buscarUsuarioPorCorreo(correo);
  if (!usuario) return { ok: false, mensaje: 'No existe una cuenta con ese correo.' };
  if (usuario.clave !== clave) return { ok: false, mensaje: 'La contraseña es incorrecta.' };
  escribir('sesion', usuario.id);
  return { ok: true, usuario };
}

export function cerrarSesion() {
  localStorage.removeItem(PREFIJO + 'sesion');
}

export function usuarioActual() {
  const id = leer('sesion', null);
  return id ? obtener('usuarios', id) : null;
}

export function registrarUsuario(datos) {
  if (buscarUsuarioPorCorreo(datos.correo)) {
    return { ok: false, mensaje: 'Ese correo ya está registrado.' };
  }
  const usuario = crear('usuarios', { ...datos, correo: datos.correo.trim().toLowerCase(), rol: 'cliente' });
  escribir('sesion', usuario.id);
  return { ok: true, usuario };
}

// =========================================================
// COMPRAS (ÓRDENES)
// =========================================================

// Simula el pago: falla si algún producto no tiene stock suficiente.
// Si es exitoso, descuenta el stock, guarda la orden y vacía el carrito.
export function procesarCompra({ cliente, direccion, carrito, usuarioId = null }) {
  const totales = calcularTotales(carrito);
  const sinStock = carrito.filter((item) => {
    const producto = obtener('productos', item.productoId);
    return !producto || producto.stock < item.cantidad;
  });

  const orden = {
    numero: Number(new Date().toISOString().slice(0, 10).replace(/-/g, '') + String(listar('ordenes').length + 1).padStart(2, '0')),
    fecha: new Date().toISOString(),
    usuarioId,
    cliente,
    direccion,
    items: carrito,
    ...totales,
  };

  if (sinStock.length > 0) {
    const fallida = { ...orden, estado: 'rechazada', motivo: `Stock insuficiente: ${sinStock.map((i) => i.nombre).join(', ')}` };
    escribir('ultimaOrden', fallida);
    return { ok: false, orden: fallida };
  }

  carrito.forEach((item) => {
    const producto = obtener('productos', item.productoId);
    actualizar('productos', item.productoId, { stock: producto.stock - item.cantidad });
  });
  const guardada = crear('ordenes', { ...orden, estado: 'pagada' });
  escribir('ultimaOrden', guardada);
  vaciarCarrito();
  return { ok: true, orden: guardada };
}

export function ultimaOrden() {
  return leer('ultimaOrden', null);
}

export function ordenesDeUsuario(usuarioId) {
  return listar('ordenes').filter((o) => o.usuarioId === Number(usuarioId));
}

// =========================================================
// REPORTES (para el panel de administración)
// =========================================================

export function resumenVentas() {
  const ordenes = listar('ordenes').filter((o) => o.estado === 'pagada');
  const productos = listar('productos');
  const categorias = listar('categorias');

  const porProducto = {};
  ordenes.forEach((orden) => {
    orden.items.forEach((item) => {
      porProducto[item.productoId] = porProducto[item.productoId] || { nombre: item.nombre, unidades: 0, monto: 0 };
      porProducto[item.productoId].unidades += item.cantidad;
      porProducto[item.productoId].monto += item.precio * item.cantidad;
    });
  });

  const porCategoria = categorias.map((categoria) => {
    const ids = productos.filter((p) => p.categoriaId === categoria.id).map((p) => p.id);
    const monto = ids.reduce((suma, id) => suma + (porProducto[id]?.monto || 0), 0);
    return { categoria: categoria.nombre, monto };
  });

  return {
    totalVendido: ordenes.reduce((suma, o) => suma + o.total, 0),
    cantidadOrdenes: ordenes.length,
    masVendidos: Object.values(porProducto).sort((a, b) => b.unidades - a.unidades).slice(0, 5),
    porCategoria,
  };
}
