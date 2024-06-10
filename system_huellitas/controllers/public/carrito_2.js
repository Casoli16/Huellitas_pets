const TOTAL_PRICE = document.getElementById('totalPrice');
const ADDRESS = document.getElementById('direccionCliente');
const SHOW_DIV = document.getElementById('showDiv');
const NEW_ADDRESS = document.getElementById('newDireccionCliente');

const ADDRESS_FORM = document.getElementById('formAddress');

//Obtenemos los parametros de la mascota que se selecciono en la pantalla menu_productos.html
const PARAMS = new URLSearchParams(window.location.search);

//Guarda en una variable el parametro obtenido
const TOTAL = PARAMS.get("total");
document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate()
        .then(getAddress);
})

//Variable que permitirá guardar el idPedido
let idPedido;

//Funcion que permite obtener la dirección registrada en el pedido y se lo pasa al input de la dirección.
const getAddress = async () => {
    const DATA = await fetchData(PEDIDO_API, 'readDetail');
    if (DATA.status) {
        ADDRESS.value = DATA.dataset[0].direccion_pedido;
        TOTAL_PRICE.textContent = '$' + TOTAL;
        idPedido = DATA.dataset[0].id_pedido;
    } else {
        console.log('Ocurrió un error');
    }
}

//Función que permite mostrar el input, en caso se desee cambiar la dirección del pedido.
const updateAddress = async () => {
    SHOW_DIV.classList.remove('d-none');
}

//Función que permite actualizar la dirección del pedido.
ADDRESS_FORM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const FORM = new FormData(ADDRESS_FORM);
    const DATA = await fetchData(PEDIDO_API, 'updateAddress', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        await getAddress();
        SHOW_DIV.classList.add('d-none');
        ADDRESS_FORM.reset();
    } else {
        sweetAlert(2, DATA.error, true);
    }
})

const finishOrder = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de finalizar el pedido?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para finalizar el pedido en proceso.
        const DATA = await fetchData(PEDIDO_API, 'finishOrder');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            await goToPage();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

//Función que permite ir a la pantalla de carrito_3.html, pasando el total del pedido y id del pedido.
const goToPage = async () => {
    window.location.href = `../../views/public/carrito_3.html?total=${TOTAL}&idPedido=${idPedido}`;
}