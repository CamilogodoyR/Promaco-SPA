// <!-- FUNCION GLOBAL: AGREGAR PRODUCTOS AL CARRITO -->
function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('promaco_carrito')) || [];

    let productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    localStorage.setItem('promaco_carrito', JSON.stringify(carrito));
    alert(`¡"${nombre}" se agrego al carrito correctamente! 🛒`);
}

// <!-- LOGICA AUTOMATICA EXCLUSIVA DEL CARRITO -->
document.addEventListener("DOMContentLoaded", () => {
    const tablaCarrito = document.getElementById("cart-items");
    const spanTotal = document.getElementById("cart-total");
    const btnPromo = document.getElementById("btn-aplicar-promo");
    const btnPagar = document.getElementById("btn-pagar");
    const btnConfirmarPago = document.getElementById("btn-confirmar-pago");

    // Valida si estamos en la pagina del carrito
    if (!tablaCarrito) return; 

    // <!-- FUNCION: RENDERIZAR Y ACTUALIZAR EL CARRITO -->
    function renderizarCarrito(aplicarDescuento = false) {
        let carrito = JSON.parse(localStorage.getItem('promaco_carrito')) || [];
        
        // Valida si el carrito esta vacio
        if (carrito.length === 0) {
            tablaCarrito.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Tu carrito esta vacio. ¡Agrega productos desde el catalogo!</td></tr>`;
            if (spanTotal) spanTotal.textContent = "$0";
            if (btnPagar) btnPagar.setAttribute("disabled", "true");
            return;
        }

        // Habilita el boton de pago si hay elementos
        if (btnPagar) btnPagar.removeAttribute("disabled");

        let html = "";
        let totalGeneral = 0;

        // Recorre los productos para construir la tabla
        carrito.forEach((item, index) => {
            let subtotal = item.precio * item.cantidad;

            // Aplica descuento si cumple la condicion por mayor (50+)
            if (aplicarDescuento && item.cantidad >= 50) {
                subtotal = subtotal * 0.85; 
            }

            totalGeneral += subtotal;

            html += `
                <tr>
                    <td class="fw-semibold">${item.nombre}</td>
                    <td>$${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                        <input type="number" class="form-control form-control-sm w-50 input-cantidad" data-index="${index}" value="${item.cantidad}" min="1">
                    </td>
                    <td class="fw-bold text-primary">$${Math.round(subtotal).toLocaleString('es-CL')}</td>
                    <td>
                        <button class="btn btn-outline-danger btn-sm btn-eliminar" data-index="${index}">🗑️</button>
                    </td>
                </tr>
            `;
        });

        tablaCarrito.innerHTML = html;
        if (spanTotal) spanTotal.textContent = `$${Math.round(totalGeneral).toLocaleString('es-CL')}`;

        // <!-- EVENTO: CAMBIAR CANTIDAD EN TIEMPO REAL -->
        document.querySelectorAll(".input-cantidad").forEach(input => {
            input.addEventListener("change", (e) => {
                let index = e.target.getAttribute("data-index");
                let nuevaCantidad = parseInt(e.target.value);
                if (nuevaCantidad > 0) {
                    carrito[index].cantidad = nuevaCantidad;
                    localStorage.setItem('promaco_carrito', JSON.stringify(carrito));
                    renderizarCarrito(aplicarDescuento);
                }
            });
        });

        // <!-- EVENTO: ELIMINAR PRODUCTO DEL CARRITO -->
        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let index = e.currentTarget.getAttribute("data-index");
                carrito.splice(index, 1);
                localStorage.setItem('promaco_carrito', JSON.stringify(carrito));
                renderizarCarrito(aplicarDescuento);
            });
        });
    }

    // Carga inicial del carrito
    renderizarCarrito(false);

    // <!-- BOTON: APLICAR PROMOCION POR MAYOR -->
    if (btnPromo) {
        btnPromo.addEventListener("click", () => {
            let carrito = JSON.parse(localStorage.getItem('promaco_carrito')) || [];
            let cumpleCondicion = carrito.some(item => item.cantidad >= 50);

            if (cumpleCondicion) {
                renderizarCarrito(true);
                alert("¡Descuento del 15% aplicado con exito!");
            } else {
                alert("⚠️ Debes tener al menos un producto con 50 o mas unidades.");
            }
        });
    }

    // <!-- BOTON: CONFIRMAR Y PROCESAR PAGO -->
    if (btnConfirmarPago) {
        btnConfirmarPago.addEventListener("click", () => {
            // Confirmacion simulada de compra segun requerimiento academico
            alert("🎉 ¡Compra realizada con exito! Su pedido ha sido registrado.");

            // Limpia el almacenamiento local del carrito
            localStorage.removeItem('promaco_carrito');

            // Cierre automatico del modal
            const modalElement = document.getElementById('modalPago');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();  
            }

            renderizarCarrito(false);
        });
    }
});