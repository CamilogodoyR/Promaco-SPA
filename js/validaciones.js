// <!-- FUNCIONES DE VALIDACION REUTILIZABLES -->
// Se usan en login, registro y contacto.

// <!-- VALIDA QUE EL CORREO TENGA ARROBA Y DOMINIO PERMITIDO -->
function correoValido(correo) {
    const dominiosPermitidos = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];
    if (!correo.includes("@")) {
        return false;
    }
    const dominio = correo.split("@")[1];
    return dominiosPermitidos.includes(dominio);
}

// <!-- VALIDA QUE LA CONTRASENA TENGA ENTRE 4 Y 10 CARACTERES -->
function claveValida(clave) {
    return clave.length >= 4 && clave.length <= 10;
}

// <!-- VALIDA QUE EL RUT NO TENGA PUNTOS NI GUION Y SU LARGO -->
function rutValido(rut) {
    if (rut.includes(".") || rut.includes("-")) {
        return false;
    }
    return rut.length >= 7 && rut.length <= 9;
}

// <!-- MUESTRA UN MENSAJE DE ERROR EN UN CAMPO ESPECIFICO -->
function mostrarError(idError, mensaje) {
    const el = document.getElementById(idError);
    if (el) el.textContent = mensaje;
}

// <!-- LIMPIA EL MENSAJE DE ERROR DE UN CAMPO -->
function limpiarError(idError) {
    const el = document.getElementById(idError);
    if (el) el.textContent = "";
}