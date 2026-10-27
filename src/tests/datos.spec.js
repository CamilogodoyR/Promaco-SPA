// =========================================================
// PRUEBAS DE LÓGICA: archivo de datos (CRUD) y validaciones
// =========================================================
import * as db from '../data/db';
import { correoValido, claveValida, rutValido, validarProducto, validarRegistro } from '../utils/validaciones';
import { formatearPrecio } from '../utils/formato';

beforeEach(() => localStorage.clear());

describe('CRUD del archivo de datos (db.js)', () => {
  it('LEER: la primera vez carga los datos iniciales y los guarda en localStorage', () => {
    const productos = db.listar('productos');
    expect(productos.length).toBe(12);
    expect(localStorage.getItem('promaco_productos')).not.toBeNull();
  });

  it('CREAR: agrega un producto con un id nuevo', () => {
    const nuevo = db.crear('productos', { nombre: 'Llana metálica', precio: 3990 });
    expect(nuevo.id).toBe(13);
    expect(db.obtener('productos', 13).nombre).toBe('Llana metálica');
  });

  it('ACTUALIZAR: modifica solo los campos indicados', () => {
    db.actualizar('productos', 1, { precio: 6490 });
    const cemento = db.obtener('productos', 1);
    expect(cemento.precio).toBe(6490);
    expect(cemento.nombre).toBe('Cemento Polpaico Especial 25kg');
  });

  it('ELIMINAR: borra el registro y devuelve false si no existía', () => {
    expect(db.eliminar('productos', 1)).toBe(true);
    expect(db.obtener('productos', 1)).toBeNull();
    expect(db.eliminar('productos', 999)).toBe(false);
  });

  it('si localStorage tiene datos corruptos, vuelve a los datos iniciales (mock de getItem)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{esto no es json');
    expect(db.listar('categorias').length).toBe(5);
  });

  it('lanza un error si se pide una colección que no existe', () => {
    expect(() => db.listar('clientes')).toThrowError('La colección "clientes" no existe');
  });
});

describe('Lógica del carrito', () => {
  it('agregar dos veces el mismo producto suma la cantidad en vez de duplicarlo', () => {
    const cemento = db.obtener('productos', 1);
    db.agregarAlCarrito(cemento, 2);
    const carrito = db.agregarAlCarrito(cemento, 3);
    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(5);
  });

  it('usa el precio de oferta cuando el producto está en oferta', () => {
    const [item] = db.agregarAlCarrito(db.obtener('productos', 2)); // taladro en oferta
    expect(item.precio).toBe(109990);
  });

  it('aplica 15% de descuento solo a productos con 50 unidades o más', () => {
    const totales = db.calcularTotales([
      { productoId: 1, precio: 1000, cantidad: 50 }, // 50.000 -> descuento 7.500
      { productoId: 2, precio: 2000, cantidad: 1 }, // 2.000 sin descuento
    ]);
    expect(totales.subtotal).toBe(52000);
    expect(totales.descuento).toBe(7500);
    expect(totales.total).toBe(44500);
  });

  it('una compra exitosa descuenta el stock, guarda la orden y vacía el carrito', () => {
    db.agregarAlCarrito(db.obtener('productos', 1), 10);
    const resultado = db.procesarCompra({
      cliente: { nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@gmail.com' },
      direccion: { calle: 'Calle 1', region: 'Región de Valparaíso', comuna: 'Quilpué' },
      carrito: db.obtenerCarrito(),
    });
    expect(resultado.ok).toBe(true);
    expect(db.obtener('productos', 1).stock).toBe(310);
    expect(db.listar('ordenes').length).toBe(4);
    expect(db.obtenerCarrito().length).toBe(0);
  });
});

describe('Validaciones (migradas de la entrega 1)', () => {
  it('correoValido acepta solo los dominios permitidos', () => {
    expect(correoValido('mathias@duoc.cl')).toBe(true);
    expect(correoValido('profe@profesor.duoc.cl')).toBe(true);
    expect(correoValido('juan@hotmail.com')).toBe(false);
    expect(correoValido('sinarroba.cl')).toBe(false);
    expect(correoValido('a@b@gmail.com')).toBe(false);
  });

  it('claveValida y rutValido respetan sus reglas', () => {
    expect(claveValida('1234')).toBe(true);
    expect(claveValida('123')).toBe(false);
    expect(claveValida('12345678901')).toBe(false);
    expect(rutValido('19011022K')).toBe(true);
    expect(rutValido('19.011.022-K')).toBe(false);
  });

  it('validarProducto detecta precio inválido y oferta mayor al precio', () => {
    const errores = validarProducto({ codigo: 'X', nombre: 'X', categoriaId: '1', precio: '1000', precioOferta: '1500', stock: '5', stockCritico: '1' });
    expect(Object.keys(errores)).toEqual(['precioOferta']);
    expect(validarProducto({ codigo: '', nombre: '', categoriaId: '', precio: '0', precioOferta: '', stock: '-1', stockCritico: '0' }).precio).toBeDefined();
  });

  it('validarRegistro detecta contraseñas que no coinciden', () => {
    const errores = validarRegistro({ nombre: 'Ana', apellidos: 'Pérez', rut: '19011022K', correo: 'ana@gmail.com', clave: 'abcd', confirmarClave: 'abce' });
    expect(errores).toEqual({ confirmarClave: 'Las contraseñas no coinciden.' });
  });

  it('formatearPrecio usa el formato chileno con punto de miles', () => {
    expect(formatearPrecio(129990)).toBe('$129.990');
    expect(formatearPrecio('abc')).toBe('$0');
  });
});

describe('Consultas y reportes del administrador', () => {
  it('productosCriticos devuelve solo los productos con stock bajo su mínimo', () => {
    const nombres = db.productosCriticos().map((p) => p.nombre);
    expect(nombres).toEqual(['Gravilla Saco 25kg', 'Sierra Circular 7 1/4" 1400W', 'Plancha OSB 9,5mm 1,22x2,44m']);
  });

  it('filtrarProductos ordena por precio final (considerando ofertas)', () => {
    const ordenados = db.filtrarProductos(db.listar('productos'), { categoriaId: '2', orden: 'precio-asc' });
    expect(ordenados.map((p) => db.precioFinal(p))).toEqual([42990, 89990, 109990]);
  });

  it('resumenVentas suma las órdenes pagadas y agrupa por categoría', () => {
    const resumen = db.resumenVentas();
    expect(resumen.cantidadOrdenes).toBe(3);
    expect(resumen.totalVendido).toBe(405090 + 119860 + 69940);
    expect(resumen.masVendidos[0].nombre).toBe('Cemento Polpaico Especial 25kg');
  });

  it('iniciarSesion guarda la sesión y cerrarSesion la elimina', () => {
    expect(db.iniciarSesion('cliente@gmail.com', 'cliente1').ok).toBe(true);
    expect(db.usuarioActual().nombre).toBe('Pedro');
    db.cerrarSesion();
    expect(db.usuarioActual()).toBeNull();
  });
});
