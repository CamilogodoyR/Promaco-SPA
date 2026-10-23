const VALORES = [
  { icono: 'bi-truck', titulo: 'Despacho a todo Chile', texto: 'Llevamos los materiales directo a tu obra.' },
  { icono: 'bi-award', titulo: 'Calidad certificada', texto: 'Trabajamos con marcas reconocidas de la industria.' },
  { icono: 'bi-people', titulo: 'Asesoría experta', texto: 'Te ayudamos a cotizar y elegir lo que tu proyecto necesita.' },
];

export default function Nosotros() {
  return (
    <div className="container py-4">
      <div className="card p-4 p-md-5 mb-4">
        <h1 className="fw-bold">Sobre Promaco SpA</h1>
        <p className="lead">Somos una empresa dedicada a la venta de materiales y herramientas de construcción para constructoras, maestros y particulares.</p>
        <p className="mb-0">Nuestro objetivo es simplificar la compra de materiales: catálogo en línea, precios claros, promociones por volumen y despacho a la obra.</p>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {VALORES.map((valor) => (
          <div className="col" key={valor.titulo}>
            <div className="card h-100 p-4 text-center">
              <i className={`bi ${valor.icono} fs-1 text-warning`}></i>
              <h2 className="h5 fw-bold mt-2">{valor.titulo}</h2>
              <p className="text-muted mb-0">{valor.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
