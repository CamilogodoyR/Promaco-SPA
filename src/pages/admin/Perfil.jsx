import { useState } from 'react';
import CampoTexto from '../../components/CampoTexto';
import { useSesion } from '../../context/SesionContext';
import { actualizar } from '../../data/db';
import { claveValida, correoValido, textoRequerido } from '../../utils/validaciones';

export default function Perfil() {
  const { usuario, refrescar } = useSesion();
  const [form, setForm] = useState({ nombre: usuario.nombre, apellidos: usuario.apellidos, correo: usuario.correo, clave: '' });
  const [errores, setErrores] = useState({});
  const [guardado, setGuardado] = useState(false);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setGuardado(false);
  };

  const guardar = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    if (!textoRequerido(form.nombre)) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!correoValido(form.correo)) nuevosErrores.correo = 'Correo no válido.';
    if (form.clave && !claveValida(form.clave)) nuevosErrores.clave = 'Entre 4 y 10 caracteres.';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const cambios = { nombre: form.nombre, apellidos: form.apellidos, correo: form.correo };
    if (form.clave) cambios.clave = form.clave;
    actualizar('usuarios', usuario.id, cambios);
    refrescar();
    setGuardado(true);
    setForm({ ...form, clave: '' });
  };

  return (
    <div className="card p-4" style={{ maxWidth: 640 }}>
      <h1 className="h4 fw-bold mb-3">Mi perfil</h1>
      <form onSubmit={guardar} noValidate>
        <CampoTexto id="nombre" etiqueta="Nombre" valor={form.nombre} onChange={cambiar} error={errores.nombre} />
        <CampoTexto id="apellidos" etiqueta="Apellidos" valor={form.apellidos} onChange={cambiar} />
        <CampoTexto id="correo" etiqueta="Correo" valor={form.correo} onChange={cambiar} error={errores.correo} />
        <CampoTexto id="clave" etiqueta="Nueva contraseña (opcional)" tipo="password" valor={form.clave} onChange={cambiar} error={errores.clave} />
        <button type="submit" className="btn btn-primary">Guardar cambios</button>
        {guardado && <span className="text-success ms-3">Cambios guardados</span>}
      </form>
    </div>
  );
}
