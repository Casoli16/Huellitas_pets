const ADMINISTRADOR_API = 'services/admin/admins.php';
const PERMISO_API = 'services/admin/permisos.php';
const ASIGNACION_PERMISO_API = 'services/admin/asignacionPermisos.php';

const SEARCH_FORM = document.getElementById('search_admin');
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

const CARDS = document.getElementById('tarjetas');

const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL_PERMISO = new bootstrap.Modal('#permisosAdminModal'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

const SAVE_FORM_PERMISOS = document.getElementById('permisosForm'),
    ID_ADMIN_PERMISO = document.getElementById('idAdministrador2');

// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen');

// Constante para estableces los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_ADMIN = document.getElementById('idAdministrador'),
    IMAGEN_ADMIN = document.getElementById('imgAdmin')
NOMBRE_ADMIN = document.getElementById('nombreAdmin'),
    APELLIDO_ADMIN = document.getElementById('apellidoAdmin'),
    CORREO_ADMIN = document.getElementById('correoAdmin'),
    ALIAS_ADMIN = document.getElementById('aliasAdmin'),
    CLAVE_ADMIN = document.getElementById('claveAdmin'),
    CONFIRMAR_CLAVE = document.getElementById('confirmarClave');


// Agregamos el evento change al input de tipo file que selecciona la imagen
IMAGEN_ADMIN.addEventListener('change', function (event) {
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

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //MAIN_TITLE.textContent = 'Administradores';
    fillTable();
});

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_ADMIN.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ADMINISTRADOR_API, action, FORM);
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

SAVE_FORM_PERMISOS.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_PERMISOS);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ASIGNACION_PERMISO_API, 'createRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL_PERMISO.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


const openCreate = () => {
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear administrador';
    SAVE_FORM.reset();
    ALIAS_ADMIN.disabled = false;
    CLAVE_ADMIN.disabled = false;
    CONFIRMAR_CLAVE.disable = false;
}

const openCreatePermission = async (id) => {
    await fillSelect(PERMISO_API, 'readAll', 'idPermiso');
    await fillCards(null, id);
    MODAL_TITLE2.textContent = 'Asignación de permisos';
    const FORM = new FormData();
    FORM.append('idAdministrador', id);
    const DATA = await fetchData(ADMINISTRADOR_API, 'readOne', FORM);
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL_PERMISO.show();
        // Se prepara el formulario.
        SAVE_FORM_PERMISOS.reset();
        const [ROW] = DATA.dataset;
        ID_ADMIN_PERMISO.value = ROW.id_admin;
    } else {
        sweetAlert(3, DATA.error, false);
    }
}

const openDeletePermission =  async (id) => {
    const FORM = new FormData();
    FORM.append('idAsignacionPermiso', id);
    const DATA = await fetchData(ASIGNACION_PERMISO_API, 'deleteRow', FORM);
    if(DATA.status) {
        await sweetAlert(1, DATA.message, true);
        SAVE_MODAL_PERMISO.hide();
    }else{
        sweetAlert(2, DATA.message, false);
    }
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idAdministrador', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ADMINISTRADOR_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar administrador';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        ALIAS_ADMIN.disabled = false;
        CLAVE_ADMIN.disabled = false;
        CONFIRMAR_CLAVE.disabled = false;
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        ID_ADMIN.value = ROW.id_admin;
        NOMBRE_ADMIN.value = ROW.nombre_admin;
        APELLIDO_ADMIN.value = ROW.apellido_admin;
        CORREO_ADMIN.value = ROW.correo_admin;
        ALIAS_ADMIN.value = ROW.alias_admin;

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
        FORM.append('idAdministrador', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ADMINISTRADOR_API, 'deleteRow', FORM);
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


const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(ADMINISTRADOR_API, action, form);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
               <tr>
                    <td><img class="rounded-circle" src="${SERVER_URL}images/admins/${row.imagen_admin}" height="70px" width="80px"></td>
                    <td>${row.nombre_admin}</td>
                    <td>${row.apellido_admin}</td>
                    <td>${row.correo_admin}</td>
                    <td>${row.fecha_registro_admin}</td>
                    <td>
                       <button type="button" class="btn btn-light" onclick="openCreatePermission(${row.id_admin})">
                            <img src="../../resources/img/svg/info_icon.svg" width="33px">
                       </button>
                    </td>
                    <td>
                       <button type="button" class="btn btn-light" onclick="openDelete(${row.id_admin})">
                            <img src="../../resources/img/svg/delete_icon.svg" width="35px">
                       </button>
                       <button type="button" class="btn btn-light" onclick="openUpdate(${row.id_admin})">
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

const fillCards = async (form = null, id) => {
    CARDS.innerHTML = '';
    const FORM = new FormData();
    FORM.append('idAdministrador', id);
    const DATA = await fetchData(ASIGNACION_PERMISO_API, 'readOne', FORM);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARDS.innerHTML += `
                <div class="col-12 mb-4">
                    <div class="row p-1 text-center shadow rounded-3">
                        <div class="col-8">
                            <p>${row.nombre_permiso}</p>
                        </div>
                        <div class="col-4">
                            <button class="btn btn-light" onclick="openDelete"> 
                                 <img src="../../resources/img/svg/edit_icon.svg" width="30px">
                            </button>
                            <button class="btn btn-light" onclick="openDeletePermission(${row.id_asignacion_permiso})"> 
                                <img src="../../resources/img/svg/delete_icon.svg" width="30px">
                            </button>
                        </div>
                    </div>
                </div>            
            `
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
}
