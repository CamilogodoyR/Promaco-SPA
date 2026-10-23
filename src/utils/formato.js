// Formatea un número como precio chileno: 5990 -> "$5.990"
export function formatearPrecio(valor) {
  return '$' + Math.round(Number(valor) || 0).toLocaleString('es-CL');
}

// Formatea una fecha ISO como "15-10-2026"
export function formatearFecha(iso) {
  const fecha = new Date(iso);
  return fecha.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
