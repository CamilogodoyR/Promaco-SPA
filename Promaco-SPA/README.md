# Promaco SpA — Tienda Online de Materiales de Construcción

Prototipo web para la Evaluación Parcial 1 (DSY1104), desarrollado como un sitio de comercio electrónico para **Promaco SpA**, empresa dedicada a la venta de materiales y productos de construcción.

El proyecto implementa un flujo completo de usuario: inicio de sesión, registro, catálogo de productos, ficha de detalle, carrito de compras y un panel básico de administración, construido con **HTML5, CSS3 y JavaScript**, usando **Bootstrap 5.3.3** como base de estilos.

---

## Tabla de contenidos

- [Estructura del proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Usuarios de prueba](#usuarios-de-prueba)
- [Equipo](#equipo)

---

## Estructura del proyecto

```
Promaco_SPA/
├── index.html                 # Inicio de sesión (punto de entrada del sitio)
├── registro.html              # Registro de nuevos usuarios
├── estilo_login.css           # Hoja de estilos personalizada (usada en todo el sitio)
│
├── js/
│   ├── main.js                 # Lógica del login (validaciones y redirección por rol)
│   ├── validaciones.js         # Funciones de validación reutilizables (correo, RUT, clave)
│   └── carrito.js              # Lógica del carrito de compras (localStorage)
│
├── tienda/                    # Vistas públicas de la tienda (una vez logueado)
│   ├── home.html                # Página de bienvenida + video institucional
│   ├── catalogo.html            # Catálogo de productos
│   ├── detalle_producto.html    # Ficha técnica de un producto
│   ├── carrito.html             # Carrito de compras y confirmación de pedido
│   ├── noticias.html            # Noticias y novedades de la empresa
│   └── contacto.html            # Formulario de contacto / solicitud de cotización
│
├── admin/                     # Panel de administración (solo usuarios admin)
│   ├── dashboard.html           # Página principal del panel
│   └── usuarios.html            # Listado de usuarios registrados
│
├── img/                        # Imágenes de productos, logo y fondos
└── video/                      # Video institucional mostrado en el Home
    └── video_muestra.mp4
```

---

## Funcionalidades

- **Inicio de sesión y registro** con validaciones en tiempo real (dominio de correo permitido, largo de contraseña, formato de RUT).
- **Catálogo de productos** de materiales de construcción (cemento, herramientas, pinturas, etc.).
- **Ficha de detalle** de cada producto, cargada dinámicamente según el producto seleccionado.
- **Video institucional** embebido en el Home con la etiqueta nativa `<video>` de HTML5.
- **Carrito de compras** persistente (usa `localStorage`), con opción de modificar cantidades, eliminar productos y aplicar una promoción por compra al por mayor.
- **Confirmación de compra simulada** (sin pasarela de pago real — ver [Alcance del prototipo](#alcance-del-prototipo)).
- **Panel de administración** básico, accesible solo para cuentas con rol de administrador.
- **Formulario de contacto** para solicitar cotizaciones de trabajos (nombre, teléfono, correo, dirección y descripción del trabajo).

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de todas las vistas |
| CSS3 + Bootstrap 5.3.3 | Estilos, diseño responsivo y componentes de interfaz |
| JavaScript (Vanilla) | Validaciones de formularios, lógica del carrito, manejo de sesión |
| localStorage | Persistencia del carrito de compras en el navegador |

No se utiliza ningún framework de JavaScript (React, Vue, etc.) ni backend/base de datos: es un prototipo 100% frontend.

---

## Usuarios de prueba

Como el sistema no tiene base de datos real, el acceso se valida contra una lista fija de correos en `js/main.js`:

| Correo | Rol | Redirección |
|---|---|---|
| `mathias@duoc.cl`, `carlos@duoc.cl`, `camilo@duoc.cl`, `mario@duoc.cl` | Administrador | Panel de administración |
| Cualquier otro correo con dominio válido (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`) | Cliente | Tienda |

La contraseña solo se valida por longitud (entre 4 y 10 caracteres), no contra un valor real — cualquier clave que cumpla ese largo permite ingresar.

---

## Equipo

**Mathias Soto**  
**Carlos Lobos**  
**Camilo Godoy**  

**PROYECTO PROMACO SPA**
