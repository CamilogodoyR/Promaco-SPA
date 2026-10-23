// =========================================================
// CONTEXTO DE SESIÓN
// Mantiene en el estado quién inició sesión, para que la barra
// de navegación, el checkout y el panel admin lo sepan.
// =========================================================
import { createContext, useContext, useState } from 'react';
import * as db from '../data/db';

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(() => db.usuarioActual());

  const iniciarSesion = (correo, clave) => {
    const resultado = db.iniciarSesion(correo, clave);
    if (resultado.ok) setUsuario(resultado.usuario);
    return resultado;
  };

  const registrar = (datos) => {
    const resultado = db.registrarUsuario(datos);
    if (resultado.ok) setUsuario(resultado.usuario);
    return resultado;
  };

  const cerrarSesion = () => {
    db.cerrarSesion();
    setUsuario(null);
  };

  // Vuelve a leer el usuario (por ejemplo, después de editar el perfil)
  const refrescar = () => setUsuario(db.usuarioActual());

  const esAdmin = usuario?.rol === 'admin';

  return (
    <SesionContext.Provider value={{ usuario, esAdmin, iniciarSesion, registrar, cerrarSesion, refrescar }}>
      {children}
    </SesionContext.Provider>
  );
}

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return contexto;
}
