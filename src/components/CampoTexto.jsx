// Campo de formulario reutilizable (input, textarea o select).
// Recibe por props la etiqueta, el valor, la función onChange y,
// si existe, el mensaje de error. El error SOLO se muestra cuando
// la prop "error" trae texto (renderizado condicional).
export default function CampoTexto({
  id,
  etiqueta,
  valor,
  onChange,
  error = '',
  tipo = 'text',
  placeholder = '',
  requerido = false,
  opciones = [],
  maxLength,
  deshabilitado = false,
  filas = 3,
}) {
  const clases = `form-control ${error ? 'is-invalid' : ''}`;
  const props = {
    id,
    name: id,
    value: valor ?? '',
    onChange,
    placeholder,
    maxLength,
    disabled: deshabilitado,
    'aria-invalid': error ? 'true' : 'false',
  };

  let control;
  if (tipo === 'textarea') {
    control = <textarea className={clases} rows={filas} {...props} />;
  } else if (tipo === 'select') {
    control = (
      <select className={`form-select ${error ? 'is-invalid' : ''}`} {...props}>
        <option value="">Selecciona...</option>
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
    );
  } else {
    control = <input type={tipo} className={clases} {...props} />;
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label small fw-bold">
        {etiqueta} {requerido && <span className="text-danger">*</span>}
      </label>
      {control}
      {error && (
        <div className="invalid-feedback d-block" role="alert" data-testid={`error-${id}`}>
          {error}
        </div>
      )}
    </div>
  );
}
