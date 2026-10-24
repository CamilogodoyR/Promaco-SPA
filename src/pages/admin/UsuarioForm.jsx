import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampoTexto from '../../components/CampoTexto';
import { actualizar, buscarUsuarioPorCorreo, crear, obtener } from '../../data/db';
import { validarUsuario } from '../../utils/validaciones';

const ROLES = [{ valor: 'cliente', texto: 'Cliente' }, { valor: 'admin', texto: 'Administrador' }];

export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existente = id ? obtener('usuarios', id) : null;
  const [form, setForm] = useState(
    existente ? { ...existente, clave: '' } : { nombre: '', apellidos: '', rut: '', correo: '', clave: '', rol: 'cliente', direccion: '' },
  );
  const [errores, setErrores] = useState({});

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarUsuario(form, { esNuevo: !existente });
    const otro = buscarUsuarioPorCorreo(form.correo);
    if (otro && otro.id !== existente?.id) nuevosErrores.correo = 'Ese correo ya está registrado.';
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const datos = { ...form };
    if (existente && !datos.clave) delete datos.clave; // si no escribe clave, se mantiene la anterior
    if (existente) actualizar('usuarios', existente.id, datos);
    else crear('usuarios', datos);
    navigate('/admin/usuarios');
  };

  return (
    <div className="card p-4" style={{ maxWidth: 720 }}>
      <h1 className="h4 fw-bold mb-3">{existente ? 'Editar usuario' : 'Nuevo usuario'}</h1>
      <form onSubmit={guardar} noValidate>
        <div className="row">
          <div className="col-md-6"><CampoTexto id="nombre" etiqueta="Nombre" requerido valor={form.nombre} onChange={cambiar} error={errores.nombre} /></div>
          <div className="col-md-6"><CampoTexto id="apellidos" etiqueta="Apellidos" requerido valor={form.apellidos} onChange={cambiar} error={errores.apellidos} /></div>
          <div className="col-md-6"><CampoTexto id="rut" etiqueta="RUT" requerido valor={form.rut} onChange={cambiar} error={errores.rut} /></div>
          <div className="col-md-6"><CampoTexto id="correo" etiqueta="Correo" requerido valor={form.correo} onChange={cambiar} error={errores.correo} /></div>
          <div className="col-md-6"><CampoTexto id="clave" etiqueta={existente ? 'Nueva contraseña (opcional)' : 'Contraseña'} tipo="password" requerido={!existente} valor={form.clave} onChange={cambiar} error={errores.clave} /></div>
          <div className="col-md-6"><CampoTexto id="rol" etiqueta="Rol" tipo="select" requerido opciones={ROLES} valor={form.rol} onChange={cambiar} error={errores.rol} /></div>
          <div className="col-12"><CampoTexto id="direccion" etiqueta="Dirección" valor={form.direccion} onChange={cambiar} /></div>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/usuarios')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
