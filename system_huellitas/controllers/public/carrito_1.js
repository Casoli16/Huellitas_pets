const CARDS = document.getElementById('cardProducts');
const PRICE_TOTAL = document.getElementById('totalPrice');

document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate()
        .then(fillCard);
})

let id;

//Variable del total que se enviara como parametro a la siguiente pagina
let totalOrder;

const fillCard = async ()=> {
    const DATA = await fetchData(PEDIDO_API, 'readDetail');
    if(DATA.status){
        let total = 0;
        let subtotal = 0;
        CARDS.innerHTML = '';
        DATA.dataset.forEach(row => {
            subtotal = row.precio_producto * row.cantidad_detalle_pedido;
            total += subtotal
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
                                <button type="button" class="btn-close close" aria-label="Close" onclick="deleteProduct(${id})"></button>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <p class="fw-semibold fs-6">${row.nombre_producto}</p>
                                <p class="fw-bold">$${subtotal.toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2,})}</p>
                            </div>
                            <div
                                class="contador d-flex justify-content-between col-md-3 col-sm-12 rounded-5 shadow mb-3">
                                <button class="btn mas text-red-color fw-bolder" onClick="restar(${id})">-</button>
                                <input type="number" value="${row.cantidad_detalle_pedido}" id="cantidad-${id}" min="1"
                                       class="form-control text-center sin-barra bg-white" onchange="updateProduct(${id})"/>
                                <button class="btn menos text-red-color fw-bolder" onClick="sumar(${row.existencia_producto}, ${id})">+</button>
                            </div>
                                                        <div class="mt-0 d-flex mb-3">
                                <small class="fw-light me-2">Precio unitario:</small>
                                <small class="fw-semibold">$${row.precio_producto}</small>
                            </div>
                        </div>
                    </div>
                </li>
            `
        });
        PRICE_TOTAL.textContent = "$" + total.toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2,});
        PRICE_TOTAL.style.color = 'red'
        totalOrder= total.toLocaleString('en-US', {maximumFractionDigits: 2, minimumFractionDigits: 2,});
    } else{
        sweetAlert(4, DATA.error, false, 'index.html');
        const ANY_PRODUCTS = document.getElementById('anyProducts');
        ANY_PRODUCTS.classList.remove('d-none')

    }
}

const sumar = (existencia, id) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (cantidad < existencia) {
        cantidad++;
        document.getElementById(`cantidad-${id}`).value = cantidad;
        updateProduct(id);
        fillCard();
    }
};

const restar = (id) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (cantidad > 1) {
        cantidad--;
        document.getElementById(`cantidad-${id}`).value = cantidad;
        updateProduct(id);
        fillCard();
    }
};

const updateProduct = async (idDetalle) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${idDetalle}`).value);

    const FORM = new FormData();
    FORM.append('idDetalle', idDetalle);
    FORM.append('cantidadProducto', cantidad);

    const DATA = await fetchData(PEDIDO_API, 'updateDetail', FORM);

    if(DATA.status){
        fillCard();
        loadTemplate();
    } else{
        sweetAlert(2, DATA.error, true);
    }
}

const deleteProduct = async (id) => {
    const RESPONSE = await confirmAction('¿Está seguro de elminar el producto?');

    if(RESPONSE){
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        const DATA = await fetchData(PEDIDO_API, 'deleteDetail', FORM);

        if(DATA.status){
            await sweetAlert(1, DATA.message, true);
            await fillCard();
            loadTemplate();
        }else{
            sweetAlert(2, DATA.error, false);
        }
    }
}

const goToPage = async () => {
    window.location.href = `../../views/public/carrito_2.html?total=${totalOrder}`;
}
