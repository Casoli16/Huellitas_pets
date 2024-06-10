// API'S UTILIZADAS EN LA PANTALLA
const CLIENTES_API = 'services/public/clientes.php';

//Elementos html utilizados en esta pantalla.
const HISTORIAL = document.getElementById('historialContainer');

const VIEW_MODAL = new bootstrap.Modal('#viewModal'),
    ID_PEDIDO_VIEW = document.getElementById('idPedidoView'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    DIRECCION = document.getElementById('direccion'),
    ESTADO_PEDIDO = document.getElementById('estadoPedido'),
    TOTAL_A_PAGAR = document.getElementById('totalAPagar')

// CARTAS QUE SE MUESTRAN AL ABRIR EL MODAL DE PERMISOS
const CARDS = document.getElementById('tarjetas');

// Método del evento para cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", () => {
    loadTemplate();
    fillHistorial();
});

//Método que permite cargar los comentarios del producto
const fillHistorial = async () => {
    const DATA = await fetchData(CLIENTES_API, 'readHistorial');

    if (DATA.status) {
        HISTORIAL.innerHTML = '';
        DATA.dataset.forEach(row => {
            HISTORIAL.innerHTML += `
                <h5><b>${row.fecha}</b></h5>
                <div class="row py-3" onclick="openView(${row.id_pedido})" style="cursor: pointer;">
                    <div class="col-1 py-2">
                        <img class="image-fluid" src="../../resources/img/png/historial_compra_img.png" alt="">
                    </div>
                    <div class="col-12 col-lg-10">
                        <div class="row">
                            <div class="col-9 col-lg-11 py-3">
                                <h6><b>Estado del pedido: ${row.estado_pedido}</b></h6>
                                <div class="row">
                                    <div class="col-8 col-lg-4">
                                        <p class="fs-6">Cantidad: ${row.cantidad} Unidades</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            `;
        });
    } else {
        sweetAlert(3, 'Aún no tienes pedidos', true);
    }
};


//Funcion que cargara los productos de ese cliente en el modal de viewModal.
const fillCards = async (id) => {
    let subtotal = 0;
    let total_pedido = 0;
    CARDS.innerHTML = '';
    const FORM = new FormData();
    FORM.append('id_pedido', id);
    const DATA = await fetchData(CLIENTES_API, 'readOne', FORM);
    if (DATA.status) {
        const cantidad_registros = DATA.dataset.length;
        console.log(cantidad_registros);
        DATA.dataset.forEach(row => {
            subtotal = row.cantidad * row.precio;
            total_pedido += subtotal;
            TOTAL_A_PAGAR.textContent = '$' + total_pedido;
            CARDS.innerHTML += `
            <li
            class="list-group-item d-flex justify-content-between align-items-start shadow mb-4">
            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" width="90" height="100">
            <!-- Información del producto -->
            <div class="ms-2 me-auto">
                <span class="badge badge-custom text-dark shadow mb-4"
                    id="Cantidad_InformacionPedidos"
                    name="Cantidad__InformacionPedidosN">${row.cantidad}</span>
                <div class="marca" id="Marca_InformacionPedidos"
                    name="Marca_InformacionPedidosN"> ${row.nombre_marca}</div>
                <div class="producto" id="Producto_InformacionPedidos"
                    name="Producto__InformacionPedidosN"> ${row.nombre_producto}
                </div>
            </div>
            <!-- Opciones para el producto -->
            <div class="d-flex flex-column mb-3">
                <div class="p-2">
                    <label class="fw-bold" id="Precio_InformacionPedidosN">$${subtotal}</label>
                </div>
            </div>
        </li>
            `
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
}

// Preparamos el metodo para llenar los datos del modal, en este caso primero se llenan los datos generales del pedido
const openView = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_pedido', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'readTwo', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        const [ROW] = DATA.dataset;
        ID_PEDIDO_VIEW.value = ROW.id_pedido;
        NOMBRE_CLIENTE.textContent = ROW.nombre_cliente;
        DIRECCION.textContent = ROW.direccion;
        ESTADO_PEDIDO.textContent = ROW.estado;

        await fillCards(id);
        VIEW_MODAL.show();

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openViewMini = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_pedido', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'readTwo', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        const [ROW] = DATA.dataset;
        ID_PEDIDO_VIEW.value = ROW.id_pedido;
        NOMBRE_CLIENTE.textContent = ROW.nombre_cliente;
        DIRECCION.textContent = ROW.direccion;
        ESTADO_PEDIDO.textContent = ROW.estado;
        TOTAL_A_PAGAR.textContent = ROW.precio_total;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}