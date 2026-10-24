import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampoTexto from '../../components/CampoTexto';
import { actualizar, crear, listar, obtener } from '../../data/db';
import { validarProducto } from '../../utils/validaciones';

const VACIO = { codigo: '', nombre: '', descripcion: '', categoriaId: '', precio: '', precioOferta: '', stock: '', stockCritico: '5', imagen: '/img/cemento.jpg' };

// Un mismo formulario sirve para CREAR (/nuevo) y EDITAR (/:id/editar).
export default function ProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existente = id ? obtener('productos', id) : null;

  const [form, setForm] = useState(() =>
    existente
      ? { ...existente, precioOferta: existente.precioOferta ?? '', categoriaId: String(existente.categoriaId) }
      : VACIO,
  );
  const [errores, setErrores] = useState({});

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarProducto(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const datos = {
      ...form,
      categoriaId: Number(form.categoriaId),
      precio: Number(form.precio),
      precioOferta: form.precioOferta === '' ? null : Number(form.precioOferta),
      stock: Number(form.stock),
      stockCritico: Number(form.stockCritico),
    };
    if (existente) actualizar('productos', existente.id, datos);
    else crear('productos', datos);
    navigate('/admin/productos');
  };

  const categorias = listar('categorias').map((c) => ({ valor: String(c.id), texto: c.nombre }));

  return (
    <div className="card p-4" style={{ maxWidth: 820 }}>
      <h1 className="h4 fw-bold mb-3">{existente ? `Editar producto: ${existente.nombre}` : 'Nuevo producto'}</h1>
      <form onSubmit={guardar} noValidate>
        <div className="row">
          <div className="col-md-4"><CampoTexto id="codigo" etiqueta="Código" requerido valor={form.codigo} onChange={cambiar} error={errores.codigo} /></div>
          <div className="col-md-8"><CampoTexto id="nombre" etiqueta="Nombre" requerido maxLength={100} valor={form.nombre} onChange={cambiar} error={errores.nombre} /></div>
          <div className="col-12"><CampoTexto id="descripcion" etiqueta="Descripción" tipo="textarea" valor={form.descripcion} onChange={cambiar} /></div>
          <div className="col-md-6"><CampoTexto id="categoriaId" etiqueta="Categoría" tipo="select" requerido opciones={categorias} valor={form.categoriaId} onChange={cambiar} error={errores.categoriaId} /></div>
          <div className="col-md-6"><CampoTexto id="imagen" etiqueta="Ruta de la imagen" valor={form.imagen} onChange={cambiar} /></div>
          <div className="col-md-3"><CampoTexto id="precio" etiqueta="Precio" tipo="number" requerido valor={form.precio} onChange={cambiar} error={errores.precio} /></div>
          <div className="col-md-3"><CampoTexto id="precioOferta" etiqueta="Precio oferta" tipo="number" valor={form.precioOferta} onChange={cambiar} error={errores.precioOferta} /></div>
          <div className="col-md-3"><CampoTexto id="stock" etiqueta="Stock" tipo="number" requerido valor={form.stock} onChange={cambiar} error={errores.stock} /></div>
          <div className="col-md-3"><CampoTexto id="stockCritico" etiqueta="Stock crítico" tipo="number" requerido valor={form.stockCritico} onChange={cambiar} error={errores.stockCritico} /></div>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">{existente ? 'Guardar cambios' : 'Crear producto'}</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/productos')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
