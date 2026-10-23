import { Link } from 'react-router-dom';
import { listar } from '../../data/db';
import { formatearFecha } from '../../utils/formato';

// Noticias y novedades (antes noticias.html)
export default function Blogs() {
  const blogs = listar('blogs');
  return (
    <div className="container py-4">
      <h1 className="fw-bold text-white mb-4">Blog y novedades</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {blogs.map((blog) => (
          <div className="col" key={blog.id}>
            <article className="card h-100 p-3">
              <img src={blog.imagen} className="card-img-top rounded object-fit-contain bg-white" style={{ height: 200 }} alt="" />
              <div className="card-body d-flex flex-column px-0">
                <small className="text-muted">{formatearFecha(blog.fecha)}</small>
                <h2 className="h5 fw-bold">{blog.titulo}</h2>
                <p className="text-muted">{blog.resumen}</p>
                <Link to={`/blogs/${blog.id}`} className="btn btn-dark btn-sm mt-auto align-self-start">Leer más</Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}
