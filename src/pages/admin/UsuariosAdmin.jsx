import { useState } from 'react';
import { Link } from 'react-router-dom';
import { eliminar, listar } from '../../data/db';
import { useSesion } from '../../context/SesionContext';

export default function UsuariosAdmin() {
  const { usuario: actual } = useSesion();
  const [usuarios, setUsuarios] = useState(() => listar('usuarios'));

  const borrar = (u) => {
    if (window.confirm(`¿Eliminar a ${u.nombre} ${u.apellidos}?`)) {
      eliminar('usuarios', u.id);
      setUsuarios(listar('usuarios'));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 fw-bold mb-0">Usuarios</h1>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary btn-sm"><i className="bi bi-person-plus me-1"></i>Nuevo usuario</Link>
      </div>
      <div className="card p-3">
        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-dark"><tr><th>Nombre</th><th>RUT</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombre} {u.apellidos}</td>
                  <td>{u.rut}</td>
                  <td>{u.correo}</td>
                  <td><span className={`badge ${u.rol === 'admin' ? 'bg-dark' : 'bg-secondary'}`}>{u.rol === 'admin' ? 'Administrador' : 'Cliente'}</span></td>
                  <td className="text-nowrap">
                    <Link to={`/admin/usuarios/${u.id}/historial`} className="btn btn-sm btn-outline-secondary me-1">Historial</Link>
                    <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-outline-primary me-1">Editar</Link>
                    <button className="btn btn-sm btn-outline-danger" disabled={u.id === actual?.id} onClick={() => borrar(u)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
