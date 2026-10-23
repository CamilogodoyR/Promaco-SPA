import { Link, useParams } from 'react-router-dom';
import { obtener } from '../../data/db';
import { formatearFecha } from '../../utils/formato';

export default function DetalleBlog() {
  const { id } = useParams();
  const blog = obtener('blogs', id);

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-white h3">Artículo no encontrado</h1>
        <Link to="/blogs" className="btn btn-light mt-3">Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 860 }}>
      <article className="card p-4">
        <img src={blog.imagen} className="rounded mb-3 object-fit-contain bg-white" style={{ maxHeight: 320 }} alt="" />
        <small className="text-muted">{formatearFecha(blog.fecha)}</small>
        <h1 className="h2 fw-bold">{blog.titulo}</h1>
        {blog.contenido.map((parrafo, i) => <p key={i}>{parrafo}</p>)}
        <Link to="/blogs" className="btn btn-outline-dark align-self-start">Volver al blog</Link>
      </article>
    </div>
  );
}
