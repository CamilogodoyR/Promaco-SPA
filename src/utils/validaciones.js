// =========================================================
// VALIDACIONES REUTILIZABLES
// Migradas desde js/validaciones.js de la entrega 1.
// En React ya no escriben el error en el DOM: solo devuelven
// true/false o un objeto de errores, y el componente guarda esos
// errores en su estado para mostrarlos.
// =========================================================

export const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

// Correo con @ y dominio dentro de la lista permitida
export function correoValido(correo) {
  if (!correo || !correo.includes('@')) return false;
  const partes = correo.trim().toLowerCase().split('@');
  if (partes.length !== 2 || partes[0] === '') return false;
  return DOMINIOS_PERMITIDOS.includes(partes[1]);
}

// Contraseña entre 4 y 10 caracteres
export function claveValida(clave) {
  return typeof clave === 'string' && clave.length >= 4 && clave.length <= 10;
}

// RUT sin puntos ni guion, entre 7 y 9 caracteres
export function rutValido(rut) {
  if (!rut || rut.includes('.') || rut.includes('-')) return false;
  return /^[0-9]{6,8}[0-9kK]$/.test(rut);
}

// Teléfono con al menos 8 dígitos
export function telefonoValido(telefono) {
  return (telefono || '').replace(/[^0-9]/g, '').length >= 8;
}

export function textoRequerido(valor) {
  return typeof valor === 'string' ? valor.trim() !== '' : valor !== null && valor !== undefined;
}

// ---------------------------------------------------------
// Validadores de formularios completos.
// Devuelven un objeto { campo: 'mensaje' } solo con los campos con error.
// Si el objeto está vacío, el formulario es válido.
// ---------------------------------------------------------

export function validarLogin({ correo, clave }) {
  const errores = {};
  if (!textoRequerido(correo)) errores.correo = 'El correo es obligatorio.';
  else if (!correoValido(correo)) errores.correo = 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  if (!textoRequerido(clave)) errores.clave = 'La contraseña es obligatoria.';
  else if (!claveValida(clave)) errores.clave = 'La contraseña debe tener entre 4 y 10 caracteres.';
  return errores;
}

export function validarRegistro(datos) {
  const errores = {};
  if (!textoRequerido(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
  if (!textoRequerido(datos.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.';
  if (!rutValido(datos.rut)) errores.rut = 'RUT inválido (sin puntos ni guion, ej: 19011022K).';
  if (!correoValido(datos.correo)) errores.correo = 'Correo no válido o dominio no permitido.';
  if (!claveValida(datos.clave)) errores.clave = 'La contraseña debe tener entre 4 y 10 caracteres.';
  if (datos.clave !== datos.confirmarClave) errores.confirmarClave = 'Las contraseñas no coinciden.';
  return errores;
}

export function validarContacto(datos) {
  const errores = {};
  if (!textoRequerido(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
  if (!textoRequerido(datos.telefono)) errores.telefono = 'El teléfono es obligatorio.';
  else if (!telefonoValido(datos.telefono)) errores.telefono = 'Ingresa un teléfono válido (mínimo 8 dígitos).';
  if (!textoRequerido(datos.correo)) errores.correo = 'El correo es obligatorio.';
  else if (!correoValido(datos.correo)) errores.correo = 'Solo se aceptan correos permitidos.';
  if (!textoRequerido(datos.direccion)) errores.direccion = 'La dirección es obligatoria.';
  if (!textoRequerido(datos.mensaje)) errores.mensaje = 'La descripción es obligatoria.';
  else if (datos.mensaje.length > 500) errores.mensaje = 'Máximo 500 caracteres.';
  return errores;
}

export function validarCheckout(datos) {
  const errores = {};
  if (!textoRequerido(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
  if (!textoRequerido(datos.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.';
  if (!correoValido(datos.correo)) errores.correo = 'Ingresa un correo válido.';
  if (!textoRequerido(datos.calle)) errores.calle = 'La calle es obligatoria.';
  if (!textoRequerido(datos.region)) errores.region = 'Selecciona una región.';
  if (!textoRequerido(datos.comuna)) errores.comuna = 'Selecciona una comuna.';
  return errores;
}

export function validarProducto(datos) {
  const errores = {};
  if (!textoRequerido(datos.codigo)) errores.codigo = 'El código es obligatorio.';
  if (!textoRequerido(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
  else if (datos.nombre.length > 100) errores.nombre = 'Máximo 100 caracteres.';
  if (!textoRequerido(datos.categoriaId)) errores.categoriaId = 'Selecciona una categoría.';
  if (!(Number(datos.precio) > 0)) errores.precio = 'El precio debe ser mayor a 0.';
  if (datos.precioOferta !== '' && datos.precioOferta !== null && datos.precioOferta !== undefined) {
    if (!(Number(datos.precioOferta) > 0) || Number(datos.precioOferta) >= Number(datos.precio)) {
      errores.precioOferta = 'La oferta debe ser mayor a 0 y menor al precio normal.';
    }
  }
  if (!Number.isInteger(Number(datos.stock)) || Number(datos.stock) < 0) errores.stock = 'El stock debe ser un entero mayor o igual a 0.';
  if (!Number.isInteger(Number(datos.stockCritico)) || Number(datos.stockCritico) < 0) errores.stockCritico = 'El stock crítico debe ser un entero mayor o igual a 0.';
  return errores;
}

export function validarCategoria(datos) {
  const errores = {};
  if (!textoRequerido(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
  if (!textoRequerido(datos.descripcion)) errores.descripcion = 'La descripción es obligatoria.';
  return errores;
}

export function validarUsuario(datos, { esNuevo = true } = {}) {
  const errores = {};
  if (!textoRequerido(datos.nombre)) errores.nombre = 'El nombre es obligatorio.';
  if (!textoRequerido(datos.apellidos)) errores.apellidos = 'Los apellidos son obligatorios.';
  if (!rutValido(datos.rut)) errores.rut = 'RUT inválido (sin puntos ni guion).';
  if (!correoValido(datos.correo)) errores.correo = 'Correo no válido o dominio no permitido.';
  if (esNuevo || datos.clave) {
    if (!claveValida(datos.clave)) errores.clave = 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  if (!['admin', 'cliente'].includes(datos.rol)) errores.rol = 'Selecciona un rol.';
  return errores;
}
