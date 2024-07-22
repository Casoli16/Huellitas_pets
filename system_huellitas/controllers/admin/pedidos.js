// API'S UTILIZADAS EN LA PANTALLA
const PEDIDOS_API = 'services/admin/pedidos.php';
const PRODUCTOS_API = 'services/admin/productos.php';

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    CONTAINER_GRAPHICS = document.getElementById('ContenedorG'),
    ROWS_FOUND = document.getElementById('rowsFound');
BTN2_GRAPHICS = document.getElementById('btn2G'),
    BTN_REPORTE = document.getElementById('reporte');

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
let datos = [];
let nameimg = null;
let variable_x = []; // ventas de cada mes
let variable_y = []; // numeros del mes

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Muestra los registros que hay en la tabla
    fillTable().then(initializeDataTable);

});


//Función que permite darle click al boton de ver los graficos 2
BTN2_GRAPHICS.addEventListener('click', () => {
    CONTAINER_GRAPHICS.classList.remove('d-none');
    generarGrafico2();
    //deletefile(nameimg);
});

BTN2_GRAPHICS.addEventListener('dblclick', () => {
    CONTAINER_GRAPHICS.classList.add('d-none');
    BTN2_GRAPHICS.classList.add('active');
});

BTN_REPORTE.addEventListener('click', () => {
    openReport();
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

const generarGrafico2 = async (callback) => {
    const DATA = await fetchData(PRODUCTOS_API, 'Top5ProductosPorMes', null);
    if (DATA.status) {
        datos = DATA.dataset;
        console.log('Estos son los datos de la variable', datos);
        let mes = [];
        let cantidad = [];
        DATA.dataset.forEach(row => {
            mes.push(row.nombre_mes);
            cantidad.push(row.cantidad_total);
            variable_y.push(row.numero_mes);
        });
        variable_x = cantidad;
        console.log(mes, cantidad);
        console.log('Llegue hasta aqui, variable en x: ', variable_x, ' variable en y: ', variable_y);

        lineGraph('myChart', mes, cantidad, 'Pedidos completados', `Ventas completadas en los últimos meses`, callback);

        console.log('Llegue después de la grafica');
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const generarGraficoPredictivo = async (callback) => {
    // Reinicializar las variables antes de usarlas
    variable_x = [];
    variable_y = [];
    
    const DATA = await fetchData(PRODUCTOS_API, 'Top5ProductosPorMes', null); 
    if (DATA.status) {
        datos = DATA.dataset;
        let mes = [];
        let cantidad = [];
        DATA.dataset.forEach(row => {
            mes.push(row.nombre_mes);
            cantidad.push(row.cantidad_total);
            variable_y.push(row.numero_mes);
        });
        variable_x = cantidad;

        let result = predictNextMonth(cantidad, variable_y);
        mes.push("Próximo mes");
        cantidad.push(result.predictedSales);

        lineGraph('myChart', mes, cantidad, 'Pedidos completados', 'Ventas completadas en los últimos meses', callback);

        return [cantidad[cantidad.length - 2], cantidad[cantidad.length - 1]];
        
    } else {
        sweetAlert(2, DATA.error, false);
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
        //Llamos la funcion que reinicializara DataTable y cargara nuevamente la tabla para visualizar los cambios.
        await resetDataTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Preparamos el metodo para llenar los datos del modal, en este caso primero se llenan los datos generales del pedido
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

// Este metodo es para que se use cuando se actualice un producto del pedido y este recargué la información general del pedido
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

// Este metodo prepara el modal de estado pedido para que este con el estado correspondiente de este registro
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

function predictNextMonth(xValues, yValues) {
    // Convertir los elementos de los arreglos de strings a números
    xValues = xValues.map(Number);
    yValues = yValues.map(Number);

    // Calcular las sumas necesarias para la regresión lineal
    let n = xValues.length;
    let sumX = xValues.reduce((acc, val) => acc + val, 0);
    let sumY = yValues.reduce((acc, val) => acc + val, 0);
    let sumXY = xValues.reduce((acc, val, idx) => acc + val * yValues[idx], 0);
    let sumY2 = yValues.reduce((acc, val) => acc + val * val, 0);

    // Calcular la pendiente (b)
    let b = (n * sumXY - sumX * sumY) / (n * sumY2 - sumY * sumY);

    // Calcular la ordenada al origen (a)
    let a = (sumX - b * sumY) / n;

    // Calcular el siguiente mes
    let lastY = yValues[yValues.length - 1];
    let nextY = lastY + 1;
    if (nextY > 12) nextY = 1;

    // Condicional para casos en que los meses sean festivos, para agregar cierto porcentaje a las ventas
    let porcentaje = 0;
    switch (nextY) {
        case 1: // Año Nuevo
            porcentaje = 2.0;  // Ajustar al 2%
            break;
        case 3: // Semana Santa (puede caer en marzo o abril)
        case 4: // Semana Santa (puede caer en marzo o abril)
            porcentaje = 3.5;  // Ajustar al 3.5%
            break;
        case 5: // Día del Trabajo, Día de la Madre
            porcentaje = 4.0;  // Ajustar al 4%
            break;
        case 6: // Día del Padre
            porcentaje = 1.8;  // Ajustar al 1.8%
            break;
        case 8: // Fiestas Agostinas
            porcentaje = 5.0;  // Ajustar al 5%
            break;
        case 9: // Día de la Independencia
            porcentaje = 2.5;  // Ajustar al 2.5%
            break;
        case 12: // Navidad
            porcentaje = 7.0;  // Ajustar al 7%
            break;
        default:
            porcentaje = 0;  // Sin ajuste para otros meses
            break;
    }

    // Predecir la venta para el siguiente mes
    let predictedX = a + b * nextY;
    // Calcular la media de las ventas
    let yM = sumXY / n;
    // Ajustar la predicción según el porcentaje haciendo uso de la media de ventas
    let adjustedPredictedX = predictedX + (yM * porcentaje / 100);
    // Quiero que nextY y adjustedPredictedX sean números enteros
    nextY = Math.round(nextY);
    adjustedPredictedX = Math.round(adjustedPredictedX);
    nextY = parseInt(nextY);
    adjustedPredictedX = parseInt(adjustedPredictedX);
    return {
        nextMonth: nextY,
        predictedSales: adjustedPredictedX
    };
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

// Metodo para eliminar un producto especifico de un pedido en especifico, maneja 2 condiciones, eliminar solo 1 producto o el producto y el pedido
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

/*
*   Función para abrir un reporte automático de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReport = async () => {
    CONTAINER_GRAPHICS.classList.remove('d-none');
    // Obtener el canvas y configurar el fondo beige
    var canvas = document.getElementById('myChart');

    const predictedValues = await generarGraficoPredictivo(async () => {
        // Convertir el contenido del canvas a Data URL
        var dataURL = canvas.toDataURL('image/png', 0.99);
        console.log("genere el primer to dataUrl");
        // Convertir Data URL a File
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        }

        const imageFile = dataURLtoFile(dataURL, 'grafico.png');
        console.log("Genere la primera imagen con las configuraciones");
            // Crear un objeto FormData y agregar la imagen y otros datos
            const FORM = new FormData();
            console.log("Genere la primera imagen con las configuraciones");
            FORM.append('imagen', imageFile);
    
            // Enviar el FormData al servidor
            const DATA = await fetchData(PEDIDOS_API, 'readReport', FORM);
    
            if (DATA.status) {
                const PATH = new URL(`${SERVER_URL}reports/admin/pedidos.php`);
                PATH.searchParams.append('imagen', DATA.filename);
            PATH.searchParams.append('ventas', JSON.stringify(predictedValues));
                // Abrir el reporte en una nueva pestaña.
                nameimg = DATA.filename;
                console.log('Estoy dentro de generarGrafico2 ', nameimg);
                window.open(PATH.href);
            } else {
                console.error('Error en readReport: ', DATA);
            }
    });
    CONTAINER_GRAPHICS.classList.add('d-none');
}


const deletefile = async (name) => {
    // Asegurarse de que la gráfica haya sido generada antes de continuar
    if (name) {
        const DELETE_FORM = new FormData();
        DELETE_FORM.append('name', name);
        console.log('Nombre del archivo a eliminar: ', name);

        const DELETE_DATA = await fetchData(PEDIDOS_API, 'deleteimg', DELETE_FORM);

        if (DELETE_DATA) {
            console.log('¿La imagen se eliminó? ', DELETE_DATA.status);
        } else {
            console.error('Error en deleteimg: ', DELETE_DATA);
        }
    } else {
        console.warn('No se generó ningún nombre de archivo para eliminar');
    }

}






