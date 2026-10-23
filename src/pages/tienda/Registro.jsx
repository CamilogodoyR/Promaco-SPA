import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoTexto from '../../components/CampoTexto';
import { useSesion } from '../../context/SesionContext';
import { REGIONES } from '../../data/datosIniciales';
import { validarRegistro } from '../../utils/validaciones';

const FORM_VACIO = { nombre: '', apellidos: '', rut: '', correo: '', clave: '', confirmarClave: '', region: '', comuna: '', direccion: '' };

export default function Registro() {
  const { registrar } = useSesion();
  const navigate = useNavigate();
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value, ...(name === 'region' ? { comuna: '' } : {}) }));
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarRegistro(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const { confirmarClave, ...datos } = form;
    const resultado = registrar(datos);
    if (!resultado.ok) {
      setMensaje(resultado.mensaje);
      return;
    }
    navigate('/');
  };

  const regiones = Object.keys(REGIONES).map((r) => ({ valor: r, texto: r }));
  const comunas = (REGIONES[form.region] || []).map((c) => ({ valor: c, texto: c }));

  return (
    <div className="container py-5" style={{ maxWidth: 720 }}>
      <div className="card p-4 p-md-5">
        <h1 className="h3 fw-bold text-center mb-4">Crear cuenta</h1>
        <form onSubmit={enviar} noValidate>
          <div className="row">
            <div className="col-md-6"><CampoTexto id="nombre" etiqueta="Nombre" requerido maxLength={50} valor={form.nombre} onChange={cambiar} error={errores.nombre} /></div>
            <div className="col-md-6"><CampoTexto id="apellidos" etiqueta="Apellidos" requerido maxLength={100} valor={form.apellidos} onChange={cambiar} error={errores.apellidos} /></div>
            <div className="col-md-6"><CampoTexto id="rut" etiqueta="RUT (sin puntos ni guion)" requerido placeholder="19011022K" valor={form.rut} onChange={cambiar} error={errores.rut} /></div>
            <div className="col-md-6"><CampoTexto id="correo" etiqueta="Correo" requerido placeholder="tucorreo@duoc.cl" valor={form.correo} onChange={cambiar} error={errores.correo} /></div>
            <div className="col-md-6"><CampoTexto id="clave" etiqueta="Contraseña" tipo="password" requerido valor={form.clave} onChange={cambiar} error={errores.clave} /></div>
            <div className="col-md-6"><CampoTexto id="confirmarClave" etiqueta="Confirmar contraseña" tipo="password" requerido valor={form.confirmarClave} onChange={cambiar} error={errores.confirmarClave} /></div>
            <div className="col-md-6"><CampoTexto id="region" etiqueta="Región" tipo="select" opciones={regiones} valor={form.region} onChange={cambiar} /></div>
            <div className="col-md-6"><CampoTexto id="comuna" etiqueta="Comuna" tipo="select" opciones={comunas} valor={form.comuna} onChange={cambiar} deshabilitado={!form.region} /></div>
            <div className="col-12"><CampoTexto id="direccion" etiqueta="Dirección" valor={form.direccion} onChange={cambiar} /></div>
          </div>
          <button type="submit" className="btn btn-promaco w-100 fw-bold">Registrarme</button>
          {mensaje && <div className="alert alert-danger small mt-3 mb-0">{mensaje}</div>}
        </form>
        <p className="text-center small mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
}
