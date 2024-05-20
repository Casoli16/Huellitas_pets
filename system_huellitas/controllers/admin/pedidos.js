// API'S UTILIZADAS EN LA PANTALLA
const PEDIDOS_API = 'services/admin/pedidos.php';

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

//Obtiene el id de la tabla
const PAGINATION_TABLE = document.getElementById('paginationTable');
//Declaramos una variable que permitira guardar la paginacion de la tabla
let PAGINATION;

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Muestra los registros que hay en la tabla
    fillTable().then(initializeDataTable);
});

// Función asincrona para inicializar la instancia de DataTable(Paginacion en las tablas)
const initializeDataTable = async () => {
    PAGINATION = await new DataTable(PAGINATION_TABLE, {
        paging: true,
        searching: true,
        language: spanishLanguage,
        responsive: true
    });
};

// Función asincrona para reinicializar DataTable después de realizar cambios en la tabla
const resetDataTable = async () => {
    //Revisamos si ya existe una instancia de DataTable ya creada, si es asi se elimina
    if (PAGINATION) {
        PAGINATION.destroy();
    }
    // Espera a que se ejecute completamente la funcion antes de seguir (fillTable llena la tabla con los datos actualizados)
    await fillTable();
    //Espera a que se ejecute completamente la funcion antes de seguir.
    await initializeDataTable();
};


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
        //Llamos la funcion que reinicializara DataTable y cargara nuevamente la tabla para visualizar los cambios.
        await resetDataTable();
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
    const DATA = await fetchData(PEDIDOS_API, 'readTwo', FORM);
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

const openOrderStatus = async (id) => {
    const options = ['Pendiente', 'Completado', 'Cancelado'];
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
const fillCards = async (id) => {
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

const openDeleteDetail = async (id, id_pedido, cant_registros) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este producto del pedido de forma permanente?');
    const RESPONSE2 = await confirmAction('Si eliminas el último producto del pedido, este estará vacío, ¿Deseas eliminarlo?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        console.log(id);
        console.log(id_pedido)
        FORM.append('id_detalle_pedido', id);
        FORM.append('id_pedido', id_pedido);
        // Petición para eliminar el registro seleccionado.
        // Petición para eliminar el registro seleccionado.
        if (cant_registros === 1) {
            if (RESPONSE2) {
                const DATA = await fetchData(PEDIDOS_API, 'deleteRow', FORM);
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (DATA.status) {
                    // Se muestra un mensaje de éxito.
                    await sweetAlert(1, DATA.message, true);
                    VIEW_MODAL.hide();
                    //Llamos la funcion que reinicializara DataTable y cargara nuevamente la tabla para visualizar los cambios.
                    await resetDataTable();
                } else {
                    sweetAlert(2, DATA.error, false);
                }
            }
        }
        else {
            const DATA = await fetchData(PEDIDOS_API, 'deleteRow2', FORM);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status) {
                // Se muestra un mensaje de éxito.
                await sweetAlert(1, DATA.message, true);
                // Se carga nuevamente la las cartas para visualizar los cambios.
                await fillCards(id_pedido);
                // Se carga los datos de abajo que son puros text
                await openViewMini(id_pedido);

            } else {
                sweetAlert(2, DATA.error, false);
            }
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

                let textColor = 'emphasis'

                switch (row.estado_pedido) {
                    case 'Completado':
                        textColor = 'success';
                        break;
                    case 'Cancelado':
                        textColor = 'danger';
                        break;
                    case 'Pendiente':
                        textColor = 'warning';
                        break;
                }

                TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.cliente}</td>
                    <td>${row.fecha}</td>
                    <td>${row.cantidad}</td>
                    <td class="text-${textColor} fw-semibold">${row.estado_pedido}</td>
                    <td>
                        <button type="button" class="btn btn-light" onclick="openOrderStatus(${row.id_pedido})">
                        <img src="../../resources/img/svg/eye.square.svg" width="35px">
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-light" onclick="openView(${row.id_pedido})">
                        <img src="../../resources/img/svg/info_icon.svg" width="35px">
                        </button>
                    </td>        
                `;
            });
            ROWS_FOUND.textContent = DATA.message;
        } else {
            sweetAlert(3, DATA.error, true);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

