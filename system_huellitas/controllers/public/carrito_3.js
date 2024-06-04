const NAME_CLIENT = document.getElementById('nameClient');

//Obtenemos los parametros de la mascota que se selecciono en la pantalla menu_productos.html
const PARAMS = new URLSearchParams(window.location.search);

//Guarda en una variable el parametro obtenido
const TOTAL = PARAMS.get("total");
const PEDIDO = PARAMS.get("idPedido");

const TOTAL_PRICE = document.getElementById('totalPrice');
const DATE = document.getElementById('date');
const STATE = document.getElementById('status');
const CARDS = document.getElementById('cardProducts');

document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate()
        .then(getUser)
        .then(getOrder);
});

const getUser = async () => {
    const DATA = await fetchData(USER_API, 'getUser');
    if (DATA.status) {
        NAME_CLIENT.textContent = DATA.name + ' ' + DATA.lastName;
        TOTAL_PRICE.textContent = 'Total: ' + '$' + TOTAL.toString();
    }
}

const getOrder = async () => {
    const FORM = new FormData();
    FORM.append('idPedido', PEDIDO)
    const DATA = await fetchData(PEDIDO_API, 'readFinishDetail', FORM);
    if (DATA.status) {
        loadTemplate();
        DATE.textContent = 'Compra realizada el ' + DATA.dataset[0].fecha_registro_producto;
        STATE.textContent = DATA.dataset[0].estado_pedido;
        let subtotal = 0;
        CARDS.innerHTML = '';
        DATA.dataset.forEach(row => {
            subtotal = row.precio_detalle_pedido * row.cantidad_detalle_pedido;
            id = row.id_detalle_pedido;
            CARDS.innerHTML += `
             <li class="list-group-item mb-4 rounded-4 shadow">
                    <div class="row d-flex align-items-center">
                        <div class="col-auto">
                            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" width="80px"/>
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <small class="text-body-secondary mt-4">${row.nombre_marca}</small>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <p class="fw-semibold fs-6">${row.nombre_producto}</p>
                                <p class="fw-bold">$${subtotal.toFixed(2)}</p>
                            </div>
                            <div
                                class="contador d-flex justify-content-between col-md-2 col-sm-12 rounded-5 shadow mb-3">
                                <input type="number" value="${row.cantidad_detalle_pedido}" id="cantidad-${id}" min="1"
                                       class="form-control text-center sin-barra bg-white" disabled/>              
                            </div>
                                                        <div class="mt-0 d-flex mb-3">
                                <small class="fw-light me-2">Precio unitario:</small>
                                <small class="fw-semibold">$${row.precio_detalle_pedido}</small>
                            </div>
                        </div>
                    </div>
                </li>
            `
        });
    }
}
