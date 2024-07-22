//Obtenemos los elemntos html que queremos manejar.
const CARDS = document.getElementById('cardProducts');
const PRICE_TOTAL = document.getElementById('totalPrice');

//Cada vez que se cargue el documento.
document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate()
        .then(fillCard);
})

//Declaramos una varaible que guardara el idDetallePedido;
let id;

//Variable del total que se enviara como parametro a la siguiente pagina
let totalOrder;

const fillCard = async () => {
    const DATA = await fetchData(PEDIDO_API, 'readDetail');
    if (DATA.status) {
        //Declaramos las variables total y subtotal que mostrarán el precio de los productos agregados al carrito
        let total = 0;
        let subtotal = 0;
        CARDS.innerHTML = '';
        DATA.dataset.forEach(row => {
            //Se multiplicara el precio detalle pedido por cantidad detalle pedido y se guardara en la variable subtotal.
            subtotal = row.precio_producto * row.cantidad_detalle_pedido;
            //Sumara todos los subtotale de los productos, para sacar el total del pedido.
            total += subtotal
            //Le pasamos el id detalle pedido a la variable id.
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
                                <p class="fw-bold">$${subtotal.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2, })}</p>
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
                                <small class="fw-semibold">$${row.precio_producto.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2, })}</small>
                            </div>
                        </div>
                    </div>
                </li>
            `
        });
        //Mandamos el precio total al frontend y ademas de eso le damos un poco de estilo con style.color.
        PRICE_TOTAL.textContent = "$" + total.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2, });
        PRICE_TOTAL.style.color = 'red'
        totalOrder = total.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2, });
    } else {
        //Cuando la respuesta de la api no venga correcta entonces se insertará el siguiente código html.
        sweetAlert(4, DATA.error, false, 'index.html');
        const ANY_PRODUCTS = document.getElementById('anyProducts');
        ANY_PRODUCTS.classList.remove('d-none')

    }
}

//funcion que recibe como parametro las existencias y id para poder agregar más existencias de un producto
const sumar = (existencia, id) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    console.log(existencia)
    if (cantidad < (cantidad + existencia)) {
        cantidad++;
        document.getElementById(`cantidad-${id}`).value = cantidad;
        updateProduct(id);
        fillCard();
    }
};


//funcion que recibe como parametro el id para poder restar existencias de un producto
const restar = (id) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
    if (cantidad > 1) {
        cantidad--;
        document.getElementById(`cantidad-${id}`).value = cantidad;
        updateProduct(id);
        fillCard();
    }
};

//Permite actualizar las exitencias de un producto cada vez que se mande a llamar esta funcion, recibe como parameto un idDetalle.
const updateProduct = async (idDetalle) => {
    let cantidad = parseInt(document.getElementById(`cantidad-${idDetalle}`).value);

    const FORM = new FormData();
    FORM.append('idDetalle', idDetalle);
    FORM.append('cantidadProducto', cantidad);

    const DATA = await fetchData(PEDIDO_API, 'updateDetail', FORM);

    if (DATA.status) {
        fillCard();
        loadTemplate();
    } else {
        sweetAlert(2, DATA.error, true);
    }
}

//Funcion que permite eliminar un producto del carrito.
const deleteProduct = async (id) => {
    const RESPONSE = await confirmAction('¿Está seguro de elminar el producto?');

    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        const DATA = await fetchData(PEDIDO_API, 'deleteDetail', FORM);

        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            await fillCard();
            loadTemplate();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Funcion que permite redirijirse a la pantalla de carrito_2.html y se pasa el tota del pedido
const goToPage = async () => {
    window.location.href = `../../views/public/carrito_2.html?total=${totalOrder}`;
}
