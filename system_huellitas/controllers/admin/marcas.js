//Constantes para completar las rutas API
const MARCAS_API = 'services/admin/marcas.php';

// Constante para establecer el formulario de buscar.
const SEARCH_INPUT = document.getElementById('searchInput');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    MODAL_BUTTON = document.getElementById('modalButton');

//Constantes para establecer contenido en la tabla
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('crear_marca'),
    ID_MARCA = document.getElementById('idMarca'),
    IMAGEN_MARCA = document.getElementById('imagenMarca'),
    NOMBRE_MARCA = document.getElementById('nombreMarca');

// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen');

//Obtiene el id de la tabla
const PAGINATION_TABLE = document.getElementById('paginationTable');
//Declaramos una variable que permitira guardar la paginacion de la tabla
let PAGINATION;

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Espera a que fillTable termine de ejecutarse, para luego llamar a la funcion initializeDataTable;
    fillTable().then(initializeDataTable)
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

// Agregamos el evento change al input de tipo file que selecciona la imagen
IMAGEN_MARCA.addEventListener('change', function (event) {
    // Verifica si hay una imagen seleccionada
    if (event.target.files && event.target.files[0]) {
        // con el objeto FileReader lee de forma asincrona el archivo seleccionado
        const reader = new FileReader();
        // Luego de haber leido la imagen seleccionada se nos devuele un objeto de tipo blob
        // Con el metodo createObjectUrl de fileReader crea una url temporal para la imagen  
        reader.onload = function (event) {
            // finalmente la url creada se le asigna al atributo src de la etiqueta img
            IMAGEN.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
});

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_MARCA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(MARCAS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        IMAGEN.src = '../../resources/img/png/rectangulo.png'
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

const openCreate = () => {
    ID_MARCA.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear marca';
    MODAL_BUTTON.textContent = ' Agregar '
    IMAGEN.src = '../../resources/img/png/rectangulo.png'
    SAVE_FORM.reset();
    NOMBRE_MARCA.disabled = false;
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idMarca', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MARCAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar marca';
        MODAL_BUTTON.textContent = 'Actualizar '
        // Se prepara el formulario.
        SAVE_FORM.reset();
        NOMBRE_MARCA.disabled = false;
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        ID_MARCA.value = ROW.id_marca;
        NOMBRE_MARCA.value = ROW.nombre_marca;
        //Cargamos la imagen del registro seleccionado
        IMAGEN.src = SERVER_URL + 'images/marcas/' + ROW.imagen_marca;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la marca de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idMarca', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(MARCAS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            //Llamos la funcion que reinicializara DataTable y cargara nuevamente la tabla para visualizar los cambios.
            await resetDataTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(MARCAS_API, action, form);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/marcas/${row.imagen_marca}" height="70px" width="80px"></td>
                    <td>${row.nombre_marca}</td>  
                    <td>
                        <button type="button" class="btn btn-light" onclick="openDelete(${row.id_marca})">
                            <img src="../../resources/img/svg/delete_icon.svg" width="35px">
                        </button>
                        <button type="button" class="btn btn-light" onclick="openUpdate(${row.id_marca})">
                            <img src="../../resources/img/svg/edit_icon.svg" width="35px">
                        </button>
                        <button type="button" class="btn btn-light" onclick="openReportWithParams(${row.id_marca})">
                            <img src="../../resources/img/png/reportesIcons.png" width="35px">
                        </button>
                    </td>                                                  
                `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(3, DATA.error, true);
    }
}

/*
*   Función para abrir un reporte automático de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/marcas.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

/*
*   Función para abrir un reporte parametrizado de productos de una categoría.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openReportWithParams = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productosPorMarcas.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idMarca', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}