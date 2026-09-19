// ==========================================
// LÓGICA DEL FORMULARIO DE LOGIN (index.html)
// Usa las funciones de validaciones.js
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    if (!formLogin) return;

    const inputEmail = document.getElementById("email");
    const inputPass = document.getElementById("password");
    const mensaje = document.getElementById("login-mensaje");

    // Lista de correos con privilegios de administrador (solo para el prototipo)
    const adminsPermitidos = [
        "camilo@duoc.cl",
        "mathias@duoc.cl",
        "carlos@duoc.cl",
        "mario@duoc.cl"
    ];

    // Validación del correo en tiempo real, mientras el usuario escribe
    inputEmail.addEventListener("input", () => {
        if (inputEmail.value.trim() === "") {
            mostrarError("email-error", "El correo es obligatorio.");
        } else if (!correoValido(inputEmail.value.trim())) {
            mostrarError("email-error", "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        } else {
            limpiarError("email-error");
        }
    });

    // Validación de la contraseña en tiempo real
    inputPass.addEventListener("input", () => {
        if (inputPass.value === "") {
            mostrarError("password-error", "La contraseña es obligatoria.");
        } else if (!claveValida(inputPass.value)) {
            mostrarError("password-error", "La contraseña debe tener entre 4 y 10 caracteres.");
        } else {
            limpiarError("password-error");
        }
    });

    // Validación final al enviar el formulario
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = inputEmail.value.trim().toLowerCase();
        const clave = inputPass.value;
        let esValido = true;

        if (email === "") {
            mostrarError("email-error", "El correo es obligatorio.");
            esValido = false;
        } else if (!correoValido(email)) {
            mostrarError("email-error", "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            esValido = false;
        }

        if (clave === "") {
            mostrarError("password-error", "La contraseña es obligatoria.");
            esValido = false;
        } else if (!claveValida(clave)) {
            mostrarError("password-error", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        }

        if (!esValido) {
            mensaje.innerHTML = "";
            return;
        }

        localStorage.setItem('promaco_usuario_actual', email);

        if (adminsPermitidos.includes(email)) {
            mensaje.innerHTML = "<p class='text-success small'>¡Bienvenido, administrador! Redirigiendo...</p>";
            setTimeout(() => window.location.href = "admin/dashboard.html", 800);
        } else {
            mensaje.innerHTML = "<p class='text-success small'>¡Inicio de sesión exitoso! Redirigiendo a la tienda...</p>";
            setTimeout(() => window.location.href = "tienda/home.html", 800);
        }
    });
});
