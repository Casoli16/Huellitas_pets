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
    NOMBRE_MARCA = document.getElementById('nombreMarca')

// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen');

// LLAMAMOS AL DIV QUE CONTIENE EL MENSAJE QUE APARECERA CUANDO NO SE ENCUENTREN LOS REGISTROS EN TABLA A BUSCAR
const HIDDEN_ELEMENT = document.getElementById('anyTable');

//Obtiene el id de la tabla
const PAGINATION_TABLE = document.getElementById('paginationTable');
//Declaramos una variable que permitira guardar la paginacion de la tabla
let PAGINATION;

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //Muestra los registros que hay en la tabla
    fillTable();
    //Carga el menu en las pantalla
    loadTemplate();
});

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
        // Destruimos la instancia que ya existe para que no se vuelva a reinicializar.
        if(PAGINATION){
            PAGINATION.destroy();
        }
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const openCreate = () => {
    ID_MARCA.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear administrador';
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
        MODAL_TITLE.textContent = 'Actualizar administrador';
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
    const RESPONSE = await confirmAction('¿Desea eliminar el administrador de forma permanente?');
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
            // Destruimos la instancia que ya existe para que no se vuelva a reinicializar.
            PAGINATION.destroy();
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
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
                    </td>                                                  
                `;
            });
            ROWS_FOUND.textContent = DATA.message;
            //En caso que si existen los registro en la base, entonces no se mostrara este codigo.
            HIDDEN_ELEMENT.style.display = 'none';

             //Creamos la instancia de DataTable y la guardamos en la variable
            PAGINATION = new DataTable(PAGINATION_TABLE, {
                paging: true,
                searching: true,
                language: spanishLanguage,
            });

        } else {
            sweetAlert(3, DATA.error, true);
            // Si lo que se ha buscado no coincide con los registros de la base entonces injectara este codigo html
            HIDDEN_ELEMENT.innerHTML = `
            <div class="container text-center">
                <p class="p-4 bg-beige-color rounded-4">No existen resultados</p>
            </div>`
            // Muestra el codigo injectado
            HIDDEN_ELEMENT.style.display = 'block'
        }
    }