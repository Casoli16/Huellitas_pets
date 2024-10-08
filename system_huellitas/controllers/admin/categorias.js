//Constantes para completar las rutas API
const CATEGORIA_API = 'services/admin/categorias.php';

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    MODAL_BUTTON = document.getElementById('modalButton');

//Constantes para establecer contenido en la tabla
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CATEGORIA = document.getElementById('idCategoria'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoria'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoria'),
    DESCRIPCION_CATEGORIA = document.getElementById('descripcionCategoria')

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

// Agregamos el evento change al input de tipo file que selecciona la imagen
IMAGEN_CATEGORIA.addEventListener('change', function (event) {
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


SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
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
    ID_CATEGORIA.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear categoría';
    MODAL_BUTTON.textContent = ' Agregar '
    IMAGEN.src = '../../resources/img/png/rectangulo.png'
    SAVE_FORM.reset();
    NOMBRE_CATEGORIA.disabled = false;
    DESCRIPCION_CATEGORIA.disabled = false;
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoria', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar categoría';
        MODAL_BUTTON.textContent = 'Actualizar '
        // Se prepara el formulario.
        SAVE_FORM.reset();
        NOMBRE_CATEGORIA.disabled = false;
        DESCRIPCION_CATEGORIA.disabled = false;
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        ID_CATEGORIA.value = ROW.id_categoria;
        NOMBRE_CATEGORIA.value = ROW.nombre_categoria;
        DESCRIPCION_CATEGORIA.value = ROW.descripcion_categoria;
        //Cargamos la imagen del registro seleccionado
        IMAGEN.src = SERVER_URL + 'images/categorias/' + ROW.imagen_categoria;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCategoria', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
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
    //let action = form ? 'searchRows' : 'readAll'
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(CATEGORIA_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `       
                    <tr>
                        <td><img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" height="70px" width="80px"></td>
                        <td>${row.nombre_categoria}</td>
                        <td>${row.descripcion_categoria}</td>  
                        <td class="align-middle">
                            <!-- Botones de acciones (eliminar, editar) -->
                            <button type="button" class="btn btn-light" onclick="openDelete(${row.id_categoria})">
                                <img src="../../resources/img/svg/delete_icon.svg" width="35px">
                            </button>
                            <button type="button" class="btn btn-light" onclick="openUpdate(${row.id_categoria})">
                                <img src="../../resources/img/svg/edit_icon.svg" width="35px">
                            </button>
                            </td>
                    </tr>
                `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(3, DATA.error, true);
    }
}