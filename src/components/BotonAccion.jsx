// Botón reutilizable: recibe el texto (etiqueta) y la función a
// ejecutar (onClick) por props. Así todos los botones del sitio
// se ven y se comportan igual.
export default function BotonAccion({
  etiqueta,
  onClick,
  variante = 'dark',
  icono = null,
  tipo = 'button',
  deshabilitado = false,
  className = '',
}) {
  return (
    <button type={tipo} className={`btn btn-${variante} ${className}`} onClick={onClick} disabled={deshabilitado}>
      {icono && <i className={`bi ${icono} me-1`} aria-hidden="true"></i>}
      {etiqueta}
    </button>
  );
}
