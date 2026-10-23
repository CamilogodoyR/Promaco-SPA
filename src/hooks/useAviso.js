import { useEffect, useRef, useState } from 'react';

// Hook para mostrar un aviso que desaparece solo después de unos segundos.
// Reemplaza los alert() del navegador que se usaban en la entrega 1.
export default function useAviso(duracion = 2500) {
  const [aviso, setAviso] = useState('');
  const temporizador = useRef(null);

  const mostrar = (texto) => {
    setAviso(texto);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAviso(''), duracion);
  };

  // Limpia el temporizador si el componente se desmonta
  useEffect(() => () => clearTimeout(temporizador.current), []);

  return [aviso, mostrar];
}
