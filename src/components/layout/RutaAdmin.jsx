import { Navigate } from 'react-router-dom';
import { useSesion } from '../../context/SesionContext';

// Protege las rutas del panel: solo entran usuarios con rol admin.
export default function RutaAdmin({ children }) {
  const { usuario, esAdmin } = useSesion();
  if (!usuario) return <Navigate to="/login" replace />;
  if (!esAdmin) return <Navigate to="/" replace />;
  return children;
}
