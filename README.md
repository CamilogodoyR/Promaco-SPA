# Promaco SpA — Tienda Online (React) · Evaluación Parcial 2

Migración del prototipo HTML de la Evaluación 1 a **React**, con **Bootstrap 5** para el diseño responsivo, un **archivo de datos con CRUD y persistencia en localStorage**, nuevas vistas de tienda y administración, y **pruebas unitarias con Jasmine + Karma**.

---

## Cómo ejecutar

Requisitos: **Node.js 18 o superior** y **Google Chrome** (para las pruebas).

```bash
npm install        # instala las dependencias (solo la primera vez)
npm run dev        # abre la app en http://localhost:5173
npm test           # ejecuta las pruebas con Karma + Jasmine y genera la cobertura
npm run build      # genera la versión de producción en /dist
```

El reporte de cobertura queda en `coverage/html/index.html` (abrir en el navegador) y el resumen en `coverage/resumen.txt`.

## Usuarios de prueba

| Correo | Contraseña | Rol |
|---|---|---|
| `mathias@duoc.cl`, `moise@duoc.cl`, `camilo@duoc.cl` | `admin123` | Administrador (entra al panel) |
| `cliente@gmail.com` | `cliente1` | Cliente (el checkout se rellena con sus datos) |

También se puede crear una cuenta nueva desde **Crear cuenta**.

**Para ver la vista "pago con error":** agrega 5 unidades de *Gravilla Saco 25kg* (solo hay 4 en stock) y paga. El pago se rechaza por stock insuficiente.

**Para reiniciar los datos:** en la consola del navegador ejecuta `localStorage.clear()` y recarga la página.

---

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework de componentes y servidor de desarrollo |
| React Router 6 | Navegación entre vistas sin recargar la página (SPA) |
| Bootstrap 5.3 + Bootstrap Icons | Diseño responsivo (grilla, navbar colapsable, formularios, tablas) |
| localStorage | Persistencia de productos, categorías, usuarios, órdenes, carrito y sesión |
| Jasmine + Karma | Pruebas unitarias en un navegador real (Chrome headless) |
| React Testing Library | Renderizar componentes y simular eventos dentro de las pruebas |
| karma-coverage (Istanbul) | Reporte de cobertura de código |

## Estructura del proyecto

```
src/
├── main.jsx                 # Punto de entrada: Bootstrap, estilos, router y providers
├── App.jsx                  # Mapa de rutas (tienda y admin)
├── data/
│   ├── datosIniciales.js    # Datos semilla (productos, categorías, usuarios, órdenes, blogs, regiones)
│   └── db.js                # "Base de datos": CRUD genérico + carrito, sesión, compras y reportes
├── context/
│   ├── CarritoContext.jsx   # Estado global del carrito
│   └── SesionContext.jsx    # Estado global del usuario conectado
├── components/              # Componentes reutilizables (props)
│   ├── BotonAccion.jsx      ├── CampoTexto.jsx       ├── ProductoCard.jsx
│   ├── ListaProductos.jsx   ├── PrecioProducto.jsx   ├── TablaCarrito.jsx
│   ├── ResumenTotales.jsx   ├── DetalleOrden.jsx     ├── Aviso.jsx
│   └── layout/              # NavbarTienda, Footer, LayoutTienda, LayoutAdmin, RutaAdmin
├── pages/
│   ├── tienda/              # Home, Productos, DetalleProducto, Categorias, Ofertas, Carrito,
│   │                        # Checkout, ResultadoCompra, Blogs, DetalleBlog, Nosotros,
│   │                        # Contacto, Login, Registro, NoEncontrado
│   └── admin/               # Dashboard, Ordenes, Boleta, ProductosAdmin, ProductoForm,
│                            # ProductosCriticos, CategoriasAdmin, CategoriaForm, UsuariosAdmin,
│                            # UsuarioForm, HistorialCompras, Reportes, Perfil
├── hooks/useAviso.js        # Aviso temporal (reemplaza los alert() de la entrega 1)
├── utils/                   # validaciones.js (migradas de la entrega 1) y formato.js
├── styles/estilo.css        # Estilos propios (se cargan después de Bootstrap)
└── tests/                   # Pruebas Jasmine (*.spec.js / *.spec.jsx)
karma.conf.cjs               # Configuración de Karma
babel.config.cjs             # Babel para compilar JSX en las pruebas + instrumentar cobertura
```

## Rutas

**Tienda:** `/` · `/productos` · `/productos/:id` · `/categorias` · `/categorias/:id` · `/ofertas` · `/carrito` · `/checkout` · `/compra-exitosa` · `/compra-error` · `/blogs` · `/blogs/:id` · `/nosotros` · `/contacto` · `/login` · `/registro`

**Administrador** (solo rol admin): `/admin` · `/admin/ordenes` · `/admin/ordenes/:id` · `/admin/productos` · `/admin/productos/nuevo` · `/admin/productos/:id/editar` · `/admin/productos/criticos` · `/admin/categorias` · `/admin/categorias/nueva` · `/admin/categorias/:id/editar` · `/admin/usuarios` · `/admin/usuarios/nuevo` · `/admin/usuarios/:id/editar` · `/admin/usuarios/:id/historial` · `/admin/reportes` · `/admin/perfil`

## Qué cambió respecto a la entrega 1

| Entrega 1 (HTML) | Entrega 2 (React) |
|---|---|
| Un archivo `.html` por página, con la navbar copiada en cada uno | Componentes reutilizables (`NavbarTienda`, `Footer`) y rutas con React Router |
| Productos escritos a mano en el HTML | Productos en `db.js`, renderizados con `.map()` desde los datos |
| `?producto=cemento` en la URL | Parámetro de ruta `/productos/:id` con `useParams()` |
| `mostrarError()` escribía en el DOM con `getElementById` | Los errores se guardan en el **estado** (`useState`) y React los muestra |
| `alert()` al agregar al carrito | Aviso temporal no bloqueante (`useAviso`) |
| Carrito solo en `carrito.html` | Carrito en un **Context**: la navbar muestra el total en tiempo real |
| Sin pruebas | 45 pruebas unitarias con Jasmine + Karma y reporte de cobertura |

## Pruebas

Las pruebas están en `src/tests/` y siguen la propuesta del docente:

- **Renderizado** y **renderizado condicional** (`componentes.spec.jsx`)
- **Propiedades (props)**, incluido el botón que recibe etiqueta y `onClick` (`componentes.spec.jsx`)
- **Estado (state)** de formularios y filtros (`formularios.spec.jsx`)
- **Eventos** simulados con `fireEvent` y funciones espía `jasmine.createSpy` (ambos archivos)
- **Mocks** con `spyOn`: `window.confirm`, `Storage.prototype.getItem` (`formularios.spec.jsx`, `datos.spec.js`)
- **Lógica de datos**: CRUD, carrito, promoción, compras, reportes y validaciones (`datos.spec.js`)

## Equipo

Mathias Soto · Moise Fonseca · Camilo Godoy
