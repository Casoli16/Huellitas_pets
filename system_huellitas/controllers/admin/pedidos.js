// API'S UTILIZADAS EN LA PANTALLA
const PEDIDOS_API = 'services/admin/pedidos.php';

// BUSCADOR
const SEARCH_INPUT = document.getElementById('searchInput');

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// CARTAS QUE SE MUESTRAN AL ABRIR EL MODAL DE PERMISOS
const CARDS = document.getElementById('tarjetas');

//MODAL PARA CREAR/ACTUALIZAR REGISTROS
const SAVE_MODAL = new bootstrap.Modal('#saveModal')

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PEDIDO = document.getElementById('id_pedido'),
    ESTADO = document.getElementById('estado')

const VIEW_MODAL = new bootstrap.Modal('#viewModal'),
    ID_PEDIDO_VIEW = document.getElementById('idPedidoView'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    DIRECCION = document.getElementById('direccion'),
    ESTADO_PEDIDO = document.getElementById('estadoPedido'),
    TOTAL_A_PAGAR = document.getElementById('totalAPagar')
// LLAMAMOS AL DIV QUE CONTIENE EL MENSAJE QUE APARECERA CUANDO NO SE ENCUENTREN LOS REGISTROS EN TABLA A BUSCAR
const HIDDEN_ELEMENT = document.getElementById('anyTable');

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Muestra los registros que hay en la tabla
    fillTable();
});

//Metodo para el buscador
const searchRow = async () => {
    //Obtenemos lo que se ha escrito en el input
    const inputValue = SEARCH_INPUT.value;
    // Mandamos lo que se ha escrito y lo convertimos para que sea aceptado como FORM
    const FORM = new FormData();
    FORM.append('search', inputValue);
    //Revisa si el input esta vacio entonces muestra todos los resultados de la tabla
    if (inputValue === '') {
        fillTable();
    } else {
        // En caso que no este vacio, entonces cargara la tabla pero le pasamos el valor que se escribio en el input y se mandara a la funcion FillTable()
        fillTable(FORM);
    }
}

// Escuchamos el evento 'submit' del formulario
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    action = 'updateRow'
    console.log(action);
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    console.log(FORM.get('id_pedido'));
    console.log(FORM.get('estado'));
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PEDIDOS_API, action, FORM);
    console.log(DATA)
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


const openView = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_pedido', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PEDIDOS_API, 'readTwo', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        const [ROW] = DATA.dataset;
        ID_PEDIDO_VIEW.value = ROW.id_pedido;
        NOMBRE_CLIENTE.textContent = ROW.nombre_cliente;
        DIRECCION.textContent = ROW.direccion;
        ESTADO_PEDIDO.textContent = ROW.estado;
        TOTAL_A_PAGAR.textContent = ROW.precio_total;

        await fillCards(null, id);
        VIEW_MODAL.show();
        // Se prepara el formulario.

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openOrderStatus = async (id) => {
    const options = ['pendiente', 'completado', 'cancelado'];
    ID_PEDIDO.value = id;
    const FORM = new FormData();
    FORM.append('id_pedido', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PEDIDOS_API, 'readThree', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        ESTADO.value = ROW.estado_pedido;
        // Llenamos el select con las opciones y ponemos la opción predeterminada.
        fillSelectStatic(options, 'estado', ROW.estado_pedido);
        // Se abre el modal
        SAVE_MODAL.show();
        // Se prepara el formulario.
        SAVE_FORM.reset();
    } else {
        sweetAlert(2, DATA.error, false);
    }

}

//Funcion que cargara los productos de ese cliente en el modal de viewModal.
const fillCards = async (form = null, id) => {
    CARDS.innerHTML = '';
    const FORM = new FormData();
    FORM.append('id_pedido', id);
    const DATA = await fetchData(PEDIDOS_API, 'readOne', FORM);

    if (DATA.status) {
        const cantidad_registros = DATA.dataset.length;
        console.log(cantidad_registros);
        DATA.dataset.forEach(row => {
            CARDS.innerHTML += `
            <li
            class="list-group-item d-flex justify-content-between align-items-start shadow mb-4">
            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="Imagen" height="90">
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
                <div class="p-2 text-end">
                    <button type="button" class="btn-close btn-close-red" onclick="openDeleteDetail(${row.id_detalle_pedido}, ${row.id_pedido}, ${cantidad_registros})"></button>
                </div>
                <div class="p-2">
                    <label class="fw-bold" id="Precio_InformacionPedidosN">${row.precio}</label>
                </div>
            </div>
        </li>
            `
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el pedido de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        console.log(id);
        FORM.append('id_pedido', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PEDIDOS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openDeleteDetail = async (id, id_pedido, cant_registros) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este producto del pedido de forma permanente?');
    const RESPONSE2 = await confirmAction('Si eliminas el último producto del pedido, este estará vacío, ¿Deseas eliminarlo?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        console.log(id);
        FORM.append('id_detalle_pedido', id);
        // Petición para eliminar el registro seleccionado.
        // Petición para eliminar el registro seleccionado.
        if (cant_registros === 1) {
           if(RESPONSE2){
            const DATA = await fetchData(PEDIDOS_API, 'deleteRow2', FORM);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status) {
                // Se muestra un mensaje de éxito.
                await sweetAlert(1, DATA.message, true);
                // Se carga nuevamente la tabla para visualizar los cambios.
            await fillCards(null, id_pedido);
            } else {
                sweetAlert(2, DATA.error, false);
            }
           }
        }
        const DATA = await fetchData(PEDIDOS_API, 'deleteRow2', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            await fillCards(null, id_pedido);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Funcion para llenar la tabla con los registros de la base
// Funcion para llenar la tabla con los registros de la base
const fillTable = async (form = null) => {
    try {
        ROWS_FOUND.textContent = '';
        TABLE_BODY.innerHTML = '';
        // Evalua si viene con un paramentro, de ser asi entonces sera un searchRows pero si viene vacio entonces sera un readAll
        (form) ? action = 'searchRows' : action = 'readAll';
        const DATA = await fetchData(PEDIDOS_API, action, form);
        if (DATA.status) {
            DATA.dataset.forEach(row => {
                TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.cliente}</td>
                    <td>${row.fecha}</td>
                    <td>${row.cantidad}</td>
                    <td>
                        <button type="button" class="btn btn-light" onclick="openOrderStatus(${row.id_pedido})">
                        <img src="../../resources/img/png/eye.square.png" width="35px">
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-light" onclick="openView(${row.id_pedido})">
                        <img src="../../resources/img/svg/edit_icon.svg" width="35px">
                        </button>
                    </td>        
                `;
            });
            ROWS_FOUND.textContent = DATA.message;
            //En caso que si existen los registro en la base, entonces no se mostrara este codigo.
            HIDDEN_ELEMENT.style.display = 'none';
        } else {
            sweetAlert(3, DATA.error, true);
            // Si lo que se ha buscado no coincide con los registros de la base entonces injectara este codigo html
            HIDDEN_ELEMENT.innerHTML = `
            <div class="container text-center">
                <p class="p-4 bg-beige-color rounded-4">No hay resultados para tu búsqueda</p>
            </div>`
            // Muestra el codigo injectado
            HIDDEN_ELEMENT.style.display = 'block'
        }
    } catch (error) {
        console.error('Error:', error);
        // Aquí puedes hacer algo con el error, como imprimirlo en la consola o mostrar un mensaje al usuario.
    }
}

