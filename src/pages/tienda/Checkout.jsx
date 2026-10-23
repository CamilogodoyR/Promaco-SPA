import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TablaCarrito from '../../components/TablaCarrito';
import ResumenTotales from '../../components/ResumenTotales';
import CampoTexto from '../../components/CampoTexto';
import { useCarrito } from '../../context/CarritoContext';
import { useSesion } from '../../context/SesionContext';
import { procesarCompra } from '../../data/db';
import { REGIONES } from '../../data/datosIniciales';
import { validarCheckout } from '../../utils/validaciones';
import { formatearPrecio } from '../../utils/formato';

// Paso de pago: datos del cliente y dirección de entrega.
// Si el usuario inició sesión, el formulario parte con sus datos.
export default function Checkout() {
  const { items, totales, recargar } = useCarrito();
  const { usuario } = useSesion();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellidos || '',
    correo: usuario?.correo || '',
    calle: usuario?.direccion || '',
    departamento: '',
    region: usuario?.region || '',
    comuna: usuario?.comuna || '',
    indicaciones: '',
  });
  const [errores, setErrores] = useState({});

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-white h3">No hay productos para pagar</h1>
        <Link to="/productos" className="btn btn-light mt-3">Ir a productos</Link>
      </div>
    );
  }

  const cambiar = (e) => {
    const { name, value } = e.target;
    // Si cambia la región, se limpia la comuna
    setForm((anterior) => ({ ...anterior, [name]: value, ...(name === 'region' ? { comuna: '' } : {}) }));
  };

  const pagar = (e) => {
    e.preventDefault();
    const nuevosErrores = validarCheckout(form);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const resultado = procesarCompra({
      cliente: { nombre: form.nombre, apellidos: form.apellidos, correo: form.correo },
      direccion: { calle: form.calle, departamento: form.departamento, region: form.region, comuna: form.comuna, indicaciones: form.indicaciones },
      carrito: items,
      usuarioId: usuario?.id ?? null,
    });
    recargar(); // el carrito se vacía en db si el pago fue exitoso
    navigate(resultado.ok ? '/compra-exitosa' : '/compra-error');
  };

  const regiones = Object.keys(REGIONES).map((r) => ({ valor: r, texto: r }));
  const comunas = (REGIONES[form.region] || []).map((c) => ({ valor: c, texto: c }));

  return (
    <div className="container py-4" style={{ maxWidth: 960 }}>
      <div className="card p-4">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <div>
            <h1 className="h3 fw-bold mb-0">Carrito de compra</h1>
            <p className="text-muted small mb-0">Completa la siguiente información</p>
          </div>
          <span className="badge bg-primary fs-6 p-3">Total a pagar: {formatearPrecio(totales.total)}</span>
        </div>

        <TablaCarrito items={items} />

        <form onSubmit={pagar} noValidate className="mt-4">
          <h2 className="h5 fw-bold">Información del cliente</h2>
          <div className="row">
            <div className="col-md-6"><CampoTexto id="nombre" etiqueta="Nombre" requerido valor={form.nombre} onChange={cambiar} error={errores.nombre} /></div>
            <div className="col-md-6"><CampoTexto id="apellidos" etiqueta="Apellidos" requerido valor={form.apellidos} onChange={cambiar} error={errores.apellidos} /></div>
            <div className="col-md-6"><CampoTexto id="correo" etiqueta="Correo" requerido valor={form.correo} onChange={cambiar} error={errores.correo} /></div>
          </div>

          <h2 className="h5 fw-bold mt-2">Dirección de entrega</h2>
          <div className="row">
            <div className="col-md-6"><CampoTexto id="calle" etiqueta="Calle" requerido valor={form.calle} onChange={cambiar} error={errores.calle} /></div>
            <div className="col-md-6"><CampoTexto id="departamento" etiqueta="Departamento (opcional)" placeholder="Ej: 603" valor={form.departamento} onChange={cambiar} /></div>
            <div className="col-md-6"><CampoTexto id="region" etiqueta="Región" tipo="select" requerido opciones={regiones} valor={form.region} onChange={cambiar} error={errores.region} /></div>
            <div className="col-md-6"><CampoTexto id="comuna" etiqueta="Comuna" tipo="select" requerido opciones={comunas} valor={form.comuna} onChange={cambiar} error={errores.comuna} deshabilitado={!form.region} /></div>
            <div className="col-12"><CampoTexto id="indicaciones" etiqueta="Indicaciones para la entrega (opcional)" tipo="textarea" placeholder="Ej: entre calles, color del edificio, no tiene timbre." valor={form.indicaciones} onChange={cambiar} /></div>
          </div>

          <ResumenTotales subtotal={totales.subtotal} descuento={totales.descuento} total={totales.total} />
          <div className="d-flex justify-content-between">
            <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
            <button type="submit" className="btn btn-success">Pagar ahora {formatearPrecio(totales.total)}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
