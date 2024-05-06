// API'S UTILIZADAS EN LA PANTALLA
const PERMISOS_API = 'services/admin/permisos.php';

// BUSCADOR
const SEARCH_INPUT = document.getElementById('searchInput');

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

//MODAL PARA CREAR/ACTUALIZAR REGISTROS
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PERMISO = document.getElementById('idPermiso'),
    VER_CLIENTE = document.getElementById('ver_cliente'),
    VER_MARCA = document.getElementById('ver_marca'),
    VER_PEDIDO = document.getElementById('ver_pedido'),
    VER_COMENTARIO = document.getElementById('ver_comentario'),
    VER_PRODUCTO = document.getElementById('ver_producto'),
    VER_CATEGORIA = document.getElementById('ver_categoria'),
    VER_CUPON = document.getElementById('ver_cupon'),
    VER_PERMISO = document.getElementById('ver_permiso'),
    VER_USUARIO = document.getElementById('ver_usuario');

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
    // Evitar que el formulario se envíe y la página se recargue
    event.preventDefault();

    // Determinar la acción a realizar (actualización o creación de un cupón)
    (ID_CUPON.value) ? action = 'updateRow' : action = 'createRow';

    // Obtener los datos del formulario
    const FORM = new FormData(SAVE_FORM);

    // Modificar el valor de los checkboxs antes de enviarlo
    const checkIds = [
        'ver_cliente',
        'ver_marca',
        'ver_pedido',
        'ver_comentario',
        'ver_producto',
        'ver_categoria',
        'ver_cupon',
        'ver_permiso',
        'ver_usuario'
    ];

    // Modificar los valores de 'estado' para cada check usando un ciclo for
    for (const checkId of checkIds) {
        const estado = document.getElementById(checkId).checked ? '1' : '0';
        FORM.set(checkId, estado);
    }
    // Enviar los datos del formulario al servidor y manejar la respuesta
    const DATA = await fetchData(PERMISOS_API, action, FORM);

    console.log(DATA);
    // Verificar si la respuesta del servidor fue satisfactoria
    if (DATA.status) {
        // Ocultar el modal
        SAVE_MODAL.hide();
        // Mostrar mensaje de éxito
        sweetAlert(1, DATA.message, true);
        // Volver a llenar la tabla para mostrar los cambios
        fillTable();
        //Cargamos la imagen por defecto
        IMAGEN.src = '../../resources/img/png/rectangulo.png'
    } else {
        // Mostrar mensaje de error
        console.log(DATA.error);
        sweetAlert(2, DATA.error, false);
    }
});



const openCreate = () => {
    ID_CUPON.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear permsio';
    SAVE_FORM.reset();
    //Cargamos la imagen por defecto
    IMAGEN.src = '../../resources/img/png/rectangulo.png'
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idPermiso', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PERMISOS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar permiso';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;

        const checkIds = [
            'ver_cliente',
            'ver_marca',
            'ver_pedido',
            'ver_comentario',
            'ver_producto',
            'ver_categoria',
            'ver_cupon',
            'ver_permiso',
            'ver_usuario'
        ];

        for (const checkId of checkIds) {
            const checkElement = document.getElementById(checkId);
            const checkValue = (ROW[checkId] === 1) ? 'checked' : '';
            checkElement.checked = checkValue;
        }

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el permiso de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        console.log(id);
        FORM.append('idPermiso', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PERMISOS_API, 'deleteRow', FORM);
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

// Funcion para llenar la tabla con los registros de la base
// Funcion para llenar la tabla con los registros de la base
const fillTable = async (form = null) => {
    try {
        ROWS_FOUND.textContent = '';
        TABLE_BODY.innerHTML = '';
        // Evalua si viene con un paramentro, de ser asi entonces sera un searchRows pero si viene vacio entonces sera un readAll
        (form) ? action = 'searchRows' : action = 'readAll';
        const DATA = await fetchData(PERMISOS_API, action, form);
        if (DATA.status) {
            DATA.dataset.forEach(row => {
                TABLE_BODY.innerHTML += `
                <tr>
                <td>${row.nombre_permiso}</td>
                <td>
                    <button type="button" class="btn btn-light" onclick="openDelete(${row.id_permiso})">
                        <img src="../../resources/img/svg/delete_icon.svg" width="35px">
                    </button>
                    <button type="button" class="btn btn-light" onclick="openUpdate(${row.id_permiso})">
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

