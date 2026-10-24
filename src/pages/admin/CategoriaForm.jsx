import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampoTexto from '../../components/CampoTexto';
import { actualizar, crear, obtener } from '../../data/db';
import { validarCategoria } from '../../utils/validaciones';

const ICONOS = ['bi-bricks', 'bi-tools', 'bi-palette', 'bi-nut', 'bi-tree', 'bi-lightning', 'bi-droplet', 'bi-house'].map((i) => ({ valor: i, texto: i.replace('bi-', '') }));

export default function CategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existente = id ? obtener('categorias', id) : null;
  const [form, setForm] = useState(existente || { nombre: '', descripcion: '', icono: 'bi-bricks' });
  const [errores, setErrores] = useState({});

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarCategoria(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
    if (existente) actualizar('categorias', existente.id, form);
    else crear('categorias', form);
    navigate('/admin/categorias');
  };

  return (
    <div className="card p-4" style={{ maxWidth: 640 }}>
      <h1 className="h4 fw-bold mb-3">{existente ? 'Editar categoría' : 'Nueva categoría'}</h1>
      <form onSubmit={guardar} noValidate>
        <CampoTexto id="nombre" etiqueta="Nombre" requerido valor={form.nombre} onChange={cambiar} error={errores.nombre} />
        <CampoTexto id="descripcion" etiqueta="Descripción" tipo="textarea" requerido valor={form.descripcion} onChange={cambiar} error={errores.descripcion} />
        <CampoTexto id="icono" etiqueta="Ícono" tipo="select" opciones={ICONOS} valor={form.icono} onChange={cambiar} />
        <p className="small">Vista previa: <i className={`bi ${form.icono} fs-4`}></i></p>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/categorias')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
