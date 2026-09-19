// ==========================================
// FUNCIONES DE VALIDACIÓN REUTILIZABLES
// Se usan en login, registro y contacto.
// ==========================================

// Revisa que el correo tenga arroba y pertenezca a un dominio permitido
function correoValido(correo) {
    const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
    if (!correo.includes("@")) {
        return false;
    }
    const dominio = correo.split("@")[1];
    return dominiosPermitidos.includes(dominio);
}

// Revisa que la contraseña tenga entre 4 y 10 caracteres
function claveValida(clave) {
    return clave.length >= 4 && clave.length <= 10;
}

// Revisa que el RUT no tenga puntos ni guion y tenga un largo razonable (7-9)
function rutValido(rut) {
    if (rut.includes(".") || rut.includes("-")) {
        return false;
    }
    return rut.length >= 7 && rut.length <= 9;
}

// Muestra un mensaje de error debajo de un campo específico
function mostrarError(idError, mensaje) {
    const el = document.getElementById(idError);
    if (el) el.textContent = mensaje;
}

function limpiarError(idError) {
    const el = document.getElementById(idError);
    if (el) el.textContent = "";
}
