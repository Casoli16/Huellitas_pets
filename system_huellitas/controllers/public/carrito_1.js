const PEDIDO_API = 'services/public/pedidos.php';
const CARDS = document.getElementById('cardProducts');
const PRICE_TOTAL = document.getElementById('totalPrice');

document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate()
        .then(fillCard);
})

let id;
const fillCard = async ()=> {
    const DATA = await fetchData(PEDIDO_API, 'readDetail');
    if(DATA.status){
        let total = 0;
        CARDS.innerHTML = '';
        DATA.dataset.forEach(row => {
            total += parseFloat(row.precio_detalle_pedido);

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
                                <p class="mb-1 fw-semibold fs-6">${row.nombre_producto}</p>
                                <p class="fw-bold">${row.precio_detalle_pedido}</p>
                            </div>
                            <div
                                class="contador d-flex justify-content-between col-md-2 col-sm-12 rounded-5 shadow mb-3">
                                <button class="btn mas text-red-color fw-bolder" onClick="restar(${id})">-</button>
                                <input type="number" value="${row.cantidad_detalle_pedido}" id="cantidad-${id}" min="1"
                                       class="form-control text-center sin-barra bg-white"/>
                                <button class="btn menos text-red-color fw-bolder" onClick="sumar(${row.existencia_producto}, ${id})">+</button>
                            </div>
                        </div>
                    </div>
                </li>
            `
        });
        PRICE_TOTAL.textContent = "$" + total.toFixed(2);
    } else{
        sweetAlert(4, DATA.error, false, 'index.html');
    }
}

const sumar = (existencia, id) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (cantidad < existencia) {
        cantidad++;
        document.getElementById(`cantidad-${id}`).value = cantidad;
    }
};

const restar = (id) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (cantidad > 1) {
        cantidad--;
        document.getElementById(`cantidad-${id}`).value = cantidad;
    }
};

const deleteProduct = async (id) => {
    const RESPONSE = await confirmAction('¿Está seguro de elminar el producto?');

    if(RESPONSE){
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        const DATA = await fetchData(PEDIDO_API, 'deleteDetail', FORM);

        if(DATA.status){
            await sweetAlert(1, DATA.message, true);
            await fillCard();
        }else{
            sweetAlert(2, DATA.error, false);
        }
    }
}

