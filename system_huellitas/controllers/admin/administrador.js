const ADMINISTRADOR_API = 'services/admin/admins.php';

const SEARCH_FORM = document.getElementById('search_admin');
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

// Constante para estableces los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_ADMIN = document.getElementById('idAdministrador'),
    NOMBRE_ADMIN = document.getElementById('nombreAdmin'),
    APELLIDO_ADMIN = document.getElementById('apellidoAdmin'),
    CORREO_ADMIN = document.getElementById('correoAdmin'),
    ALIAS_ADMIN = document.getElementById('aliasAdmin'),
    CLAVE_ADMIN = document.getElementById('claveAdmin'),
    CONFIRMAR_CLAVE = document.getElementById('confirmarContraAdmin');

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
    console.log(DATA)
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

const openCreate = () => {
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear administrador';
    SAVE_FORM.reset();
    ALIAS_ADMIN.disabled = false;
    CLAVE_ADMIN.disabled = false;
    CONFIRMAR_CLAVE.disable = false;
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
        CLAVE_ADMIN.disabled = true;
        CONFIRMAR_CLAVE.disabled = true;
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


const fillTable = async (form = null) =>{
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const  DATA = await fetchData(ADMINISTRADOR_API, action, form);

    if(DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
               <tr>
                    <td>${row.imagen_admin}</td>
                    <td>${row.nombre_admin}</td>
                    <td>${row.apellido_admin}</td>
                    <td>${row.correo_admin}</td> 
                    <td>${row.fecha_registro_admin}</td> 
                    <td>Permiso</td> 
                    <td>
                       <button type="button" class="btn btn-light">
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
    } else{
        sweetAlert(4, DATA.error, true);
    }
}
