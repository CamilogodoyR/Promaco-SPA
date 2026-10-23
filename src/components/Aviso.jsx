// Aviso flotante (esquina inferior derecha). Solo se renderiza si hay texto.
export default function Aviso({ texto, tipo = 'success' }) {
  if (!texto) return null;
  return (
    <div className={`alert alert-${tipo} shadow position-fixed bottom-0 end-0 m-3`} style={{ zIndex: 1080 }} role="status">
      {texto}
    </div>
  );
}
