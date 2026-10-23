// =========================================================
// DATOS INICIALES (SEMILLA) DE LA "BASE DE DATOS" SIMULADA
// Se cargan la primera vez que se abre la app. Después, todo
// lo que se crea o modifica se guarda en localStorage (ver db.js).
// =========================================================

export const CATEGORIAS = [
  { id: 1, nombre: 'Cemento y Áridos', descripcion: 'Cemento, arena, gravilla y materiales para obra gruesa.', icono: 'bi-bricks' },
  { id: 2, nombre: 'Herramientas Eléctricas', descripcion: 'Taladros, esmeriles, sierras y equipos a batería.', icono: 'bi-tools' },
  { id: 3, nombre: 'Pinturas', descripcion: 'Látex, esmaltes y productos para terminaciones.', icono: 'bi-palette' },
  { id: 4, nombre: 'Fijaciones y Ferretería', descripcion: 'Tornillos, clavos y elementos de fijación.', icono: 'bi-nut' },
  { id: 5, nombre: 'Maderas y Tableros', descripcion: 'Madera dimensionada, OSB y tableros.', icono: 'bi-tree' },
];

export const PRODUCTOS = [
  {
    id: 1, codigo: 'CEM-001', nombre: 'Cemento Polpaico Especial 25kg', categoriaId: 1,
    precio: 5990, precioOferta: null, stock: 320, stockCritico: 20, imagen: '/img/cemento.jpg',
    descripcion: 'Cemento de albañilería y uso general de alta resistencia inicial, diseñado bajo estrictos estándares industriales.',
  },
  {
    id: 2, codigo: 'HER-001', nombre: 'Taladro Percutor Inalámbrico 20V', categoriaId: 2,
    precio: 129990, precioOferta: 109990, stock: 14, stockCritico: 5, imagen: '/img/taladro_inalambrico.jpg',
    descripcion: 'Taladro percutor a batería de ion de litio de 20V, ideal para faenas en concreto, madera y metal.',
  },
  {
    id: 3, codigo: 'CEM-002', nombre: 'Arena Gruesa Saco 25kg', categoriaId: 1,
    precio: 2490, precioOferta: null, stock: 500, stockCritico: 30, imagen: '/img/productos/arena.svg',
    descripcion: 'Arena gruesa lavada, apta para hormigones y morteros de pega.',
  },
  {
    id: 4, codigo: 'CEM-003', nombre: 'Gravilla Saco 25kg', categoriaId: 1,
    precio: 2690, precioOferta: null, stock: 4, stockCritico: 10, imagen: '/img/productos/gravilla.svg',
    descripcion: 'Gravilla de tamaño uniforme para hormigones, radieres y drenajes.',
  },
  {
    id: 5, codigo: 'HER-002', nombre: 'Esmeril Angular 4 1/2" 850W', categoriaId: 2,
    precio: 49990, precioOferta: 42990, stock: 8, stockCritico: 5, imagen: '/img/productos/esmeril.svg',
    descripcion: 'Esmeril angular de 850W para corte y desbaste de metal y albañilería.',
  },
  {
    id: 6, codigo: 'HER-003', nombre: 'Sierra Circular 7 1/4" 1400W', categoriaId: 2,
    precio: 89990, precioOferta: null, stock: 3, stockCritico: 5, imagen: '/img/productos/sierra.svg',
    descripcion: 'Sierra circular con guía paralela y ajuste de profundidad para cortes precisos en madera.',
  },
  {
    id: 7, codigo: 'PIN-001', nombre: 'Pintura Látex Blanca 1 Galón', categoriaId: 3,
    precio: 15990, precioOferta: 12990, stock: 60, stockCritico: 10, imagen: '/img/productos/latex.svg',
    descripcion: 'Látex lavable de alto rendimiento para interiores y exteriores.',
  },
  {
    id: 8, codigo: 'PIN-002', nombre: 'Esmalte Sintético Gris 1/4 Galón', categoriaId: 3,
    precio: 8990, precioOferta: null, stock: 35, stockCritico: 8, imagen: '/img/productos/esmalte.svg',
    descripcion: 'Esmalte sintético brillante para metal y madera, con protección anticorrosiva.',
  },
  {
    id: 9, codigo: 'FER-001', nombre: 'Tornillo Volcanita 6x1" Caja 100u', categoriaId: 4,
    precio: 3290, precioOferta: null, stock: 200, stockCritico: 25, imagen: '/img/productos/tornillos.svg',
    descripcion: 'Tornillos punta fina para fijar planchas de yeso-cartón a perfiles metálicos.',
  },
  {
    id: 10, codigo: 'FER-002', nombre: 'Clavo Corriente 3" 1kg', categoriaId: 4,
    precio: 2190, precioOferta: 1790, stock: 150, stockCritico: 20, imagen: '/img/productos/clavos.svg',
    descripcion: 'Clavos de acero corriente para carpintería y moldajes.',
  },
  {
    id: 11, codigo: 'MAD-001', nombre: 'Pino Dimensionado 2x4" 3,2m', categoriaId: 5,
    precio: 4590, precioOferta: null, stock: 90, stockCritico: 15, imagen: '/img/productos/pino.svg',
    descripcion: 'Pino seco dimensionado para tabiquería y estructuras livianas.',
  },
  {
    id: 12, codigo: 'MAD-002', nombre: 'Plancha OSB 9,5mm 1,22x2,44m', categoriaId: 5,
    precio: 11990, precioOferta: null, stock: 2, stockCritico: 6, imagen: '/img/productos/osb.svg',
    descripcion: 'Tablero de virutas orientadas para revestimientos, pisos y techumbres.',
  },
];

// Nota: las claves están en texto plano porque es un prototipo sin backend.
export const USUARIOS = [
  { id: 1, nombre: 'Mathias', apellidos: 'Soto', rut: '19011022K', correo: 'mathias@duoc.cl', clave: 'admin123', rol: 'admin', region: 'Región Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Av. Libertador 1234' },
  { id: 2, nombre: 'Moise', apellidos: 'Fonseca', rut: '20111333K', correo: 'moise@duoc.cl', clave: 'admin123', rol: 'admin', region: 'Región Metropolitana de Santiago', comuna: 'Maipú', direccion: 'Pajaritos 4500' },
  { id: 3, nombre: 'Camilo', apellidos: 'Godoy', rut: '20555666', correo: 'camilo@duoc.cl', clave: 'admin123', rol: 'admin', region: 'Región Metropolitana de Santiago', comuna: 'Puente Alto', direccion: 'Concha y Toro 980' },
  { id: 4, nombre: 'Pedro', apellidos: 'Constructor', rut: '15444777', correo: 'cliente@gmail.com', clave: 'cliente1', rol: 'cliente', region: 'Región Metropolitana de Santiago', comuna: 'Cerrillos', direccion: 'Los Crisantemos 603' },
];

export const ORDENES = [
  {
    id: 1, numero: 20261001, fecha: '2026-10-01T10:15:00', usuarioId: 4, estado: 'pagada',
    cliente: { nombre: 'Pedro', apellidos: 'Constructor', correo: 'cliente@gmail.com' },
    direccion: { calle: 'Los Crisantemos 603', departamento: '', region: 'Región Metropolitana de Santiago', comuna: 'Cerrillos', indicaciones: '' },
    items: [
      { productoId: 1, nombre: 'Cemento Polpaico Especial 25kg', precio: 5990, cantidad: 60 },
      { productoId: 3, nombre: 'Arena Gruesa Saco 25kg', precio: 2490, cantidad: 40 },
    ],
    subtotal: 459000, descuento: 53910, total: 405090,
  },
  {
    id: 2, numero: 20261008, fecha: '2026-10-08T17:40:00', usuarioId: 4, estado: 'pagada',
    cliente: { nombre: 'Pedro', apellidos: 'Constructor', correo: 'cliente@gmail.com' },
    direccion: { calle: 'Los Crisantemos 603', departamento: '', region: 'Región Metropolitana de Santiago', comuna: 'Cerrillos', indicaciones: 'Dejar con conserje' },
    items: [
      { productoId: 2, nombre: 'Taladro Percutor Inalámbrico 20V', precio: 109990, cantidad: 1 },
      { productoId: 9, nombre: 'Tornillo Volcanita 6x1" Caja 100u', precio: 3290, cantidad: 3 },
    ],
    subtotal: 119860, descuento: 0, total: 119860,
  },
  {
    id: 3, numero: 20261015, fecha: '2026-10-15T09:05:00', usuarioId: null, estado: 'pagada',
    cliente: { nombre: 'Ana', apellidos: 'Pérez', correo: 'ana.perez@gmail.com' },
    direccion: { calle: 'Pedro de Valdivia 2100', departamento: 'Depto 41', region: 'Región de Valparaíso', comuna: 'Viña del Mar', indicaciones: '' },
    items: [
      { productoId: 7, nombre: 'Pintura Látex Blanca 1 Galón', precio: 12990, cantidad: 4 },
      { productoId: 8, nombre: 'Esmalte Sintético Gris 1/4 Galón', precio: 8990, cantidad: 2 },
    ],
    subtotal: 69940, descuento: 0, total: 69940,
  },
];

export const BLOGS = [
  {
    id: 1, titulo: 'Nuevas herramientas inalámbricas ya disponibles', fecha: '2026-09-28', imagen: '/img/taladro_inalambrico.jpg',
    resumen: 'Sumamos taladros y equipos a batería de última generación a nuestro catálogo industrial.',
    contenido: [
      'Las herramientas inalámbricas se han vuelto el estándar en obra: no dependen de extensiones, son más seguras y permiten trabajar en altura o en terreno sin conexión eléctrica.',
      'En Promaco incorporamos una nueva línea de taladros percutores, esmeriles y sierras con baterías de ion de litio de 20V intercambiables entre equipos.',
      'Recuerda revisar la sección de Ofertas: varios de estos equipos tienen precio de lanzamiento por tiempo limitado.',
    ],
  },
  {
    id: 2, titulo: 'Tips para elegir el cemento correcto', fecha: '2026-10-05', imagen: '/img/cemento.jpg',
    resumen: 'Te contamos qué diferencia hay entre los tipos de cemento y cuál usar según tu proyecto.',
    contenido: [
      'No todos los cementos sirven para lo mismo. El cemento de uso general es ideal para morteros y hormigones de obra menor, mientras que los de alta resistencia se usan en elementos estructurales.',
      'Para radieres y fundaciones conviene combinar el cemento con arena gruesa y gravilla en la dosificación indicada por el fabricante.',
      'Si tu obra supera las 50 unidades, aprovecha nuestra Promoción Constructor con 15% de descuento automático en el carrito.',
    ],
  },
];

export const REGIONES = {
  'Región Metropolitana de Santiago': ['Santiago', 'Cerrillos', 'Maipú', 'Puente Alto', 'Providencia', 'Ñuñoa', 'La Florida'],
  'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
  'Región del Biobío': ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles'],
  'Región de Antofagasta': ['Antofagasta', 'Calama', 'Mejillones'],
};
