//Constantes para completar las rutas API
const MARCAS_API = 'services/admin/marcas.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

//Constantes para establecer contenido en la tabla
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('crear_marca'),
    ID_MARCA = document.getElementById('id_marca'),
    IMAGEN_MARCA = document.getElementById('imagen_marca'),
    NOMBRE_MARCA = document.getElementById('nombre_marca')

// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen');

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //MAIN_TITLE.textContent = 'Administradores';
    fillTable();
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
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(MARCAS_API, action, form);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img class="rounded-circle" src="${SERVER_URL}images/marcas/${row.imagen_marca}" height="70px" width="80px"></td>
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
        } else {
            sweetAlert(4, DATA.error, true);
        }

    }