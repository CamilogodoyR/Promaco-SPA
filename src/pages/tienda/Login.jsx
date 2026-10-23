import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoTexto from '../../components/CampoTexto';
import { useSesion } from '../../context/SesionContext';
import { validarLogin } from '../../utils/validaciones';

// Inicio de sesión. Valida en tiempo real (al escribir) y al enviar.
// Los admin van al panel y los clientes a la tienda.
export default function Login() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: '', clave: '' });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const cambiar = (e) => {
    const nuevoForm = { ...form, [e.target.name]: e.target.value };
    setForm(nuevoForm);
    // Validación en tiempo real solo del campo que se está escribiendo
    const erroresCampo = validarLogin(nuevoForm);
    setErrores((anteriores) => ({ ...anteriores, [e.target.name]: erroresCampo[e.target.name] }));
    setMensaje('');
  };

  const enviar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarLogin(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const resultado = iniciarSesion(form.correo, form.clave);
    if (!resultado.ok) {
      setMensaje(resultado.mensaje);
      return;
    }
    navigate(resultado.usuario.rol === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-4 p-md-5 login-card" style={{ width: '100%', maxWidth: 420 }}>
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold">Iniciar sesión</h1>
          <p className="text-muted small">Gestión y proyectos de construcción</p>
        </div>
        <form onSubmit={enviar} noValidate data-testid="form-login">
          <CampoTexto id="correo" etiqueta="Correo electrónico" placeholder="usuario@duoc.cl" valor={form.correo} onChange={cambiar} error={errores.correo} />
          <CampoTexto id="clave" etiqueta="Contraseña" tipo="password" valor={form.clave} onChange={cambiar} error={errores.clave} />
          <button type="submit" className="btn btn-dark w-100 fw-bold">Ingresar</button>
          {mensaje && <div className="alert alert-danger small mt-3 mb-0" role="alert">{mensaje}</div>}
        </form>
        <p className="text-center small mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}
