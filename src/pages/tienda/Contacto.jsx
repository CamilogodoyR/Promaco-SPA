import { useState } from 'react';
import CampoTexto from '../../components/CampoTexto';
import { validarContacto } from '../../utils/validaciones';

const FORM_VACIO = { nombre: '', telefono: '', correo: '', direccion: '', mensaje: '' };

// Formulario de contacto / cotización (migrado de contacto.html).
// Los valores y los errores ahora viven en el estado del componente.
export default function Contacto() {
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEnviado(false);
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarContacto(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true);
      setForm(FORM_VACIO);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <div className="card p-4">
        <h1 className="h3 fw-bold text-center mb-4">Contáctanos</h1>
        <form onSubmit={enviar} noValidate>
          <CampoTexto id="nombre" etiqueta="Nombre completo" requerido maxLength={100} valor={form.nombre} onChange={cambiar} error={errores.nombre} />
          <CampoTexto id="telefono" etiqueta="Teléfono" requerido placeholder="+56 9 ..." valor={form.telefono} onChange={cambiar} error={errores.telefono} />
          <CampoTexto id="correo" etiqueta="Correo electrónico" requerido placeholder="tucorreo@gmail.com" valor={form.correo} onChange={cambiar} error={errores.correo} />
          <CampoTexto id="direccion" etiqueta="Dirección del trabajo" requerido placeholder="Calle, número, comuna" maxLength={200} valor={form.direccion} onChange={cambiar} error={errores.direccion} />
          <CampoTexto id="mensaje" etiqueta="Descripción breve del trabajo" tipo="textarea" filas={4} requerido maxLength={500} valor={form.mensaje} onChange={cambiar} error={errores.mensaje} />
          <button type="submit" className="btn btn-dark w-100 fw-bold">Enviar solicitud</button>
          {enviado && <p className="text-success small mt-3 mb-0" role="status">¡Gracias! Recibimos tu solicitud y te contactaremos pronto.</p>}
        </form>
      </div>
    </div>
  );
}
