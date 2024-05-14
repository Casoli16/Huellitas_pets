// API'S UTILIZADAS EN LA PANTALLA
const ADMINISTRADOR_API = 'services/admin/admins.php';
const PERMISO_API = 'services/admin/permisos.php';
const ASIGNACION_PERMISO_API = 'services/admin/asignacionPermisos.php';

// BUSCADOR
const SEARCH_INPUT = document.getElementById('searchInput');

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// CARTAS QUE SE MUESTRAN AL ABRIR EL MODAL DE PERMISOS
const CARDS = document.getElementById('tarjetas');

//MODAL PARA CREAR/ACTUALIZAR REGISTROS
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

//MODAL PARA ABRIR LOS PERMISOS
const SAVE_MODAL_PERMISO = new bootstrap.Modal('#permisosAdminModal'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

// LLAMDADO A NUESTRO FORM Y TODOS LOS INPUT'S QUE ESTAN DENTRO DEL FORM
const SAVE_FORM_PERMISOS = document.getElementById('permisosForm'),
    ID_ADMIN_PERMISO = document.getElementById('idAdministrador2'),
    PERMISO_ADMIN = document.getElementById('idPermiso'),
    ID_ASIGNACION_PERMISO = document.getElementById('idAsignacionPermiso');

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

// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen');

// LLAMAMOS AL DIV QUE CONTIENE EL MENSAJE QUE APARECERA CUANDO NO SE ENCUENTREN LOS REGISTROS EN TABLA A BUSCAR
const HIDDEN_ELEMENT = document.getElementById('anyTable');

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

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_ADMIN.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // PARA REGISTRAR LA FECHA DEL REGISTRO
    const currentDate = new Date().toISOString().split('T')[0];

    FORM.append('fechaRegistroAdmin', currentDate);

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
        //Cargamos la imagen por defecto
        IMAGEN.src = '../../resources/img/png/rectangulo.png'
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const openCreate = () => {
    //Inicializamos el valor del idAdmin
    ID_ADMIN.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear administrador';
    SAVE_FORM.reset();
    //Cargamos la imagen por defecto
    IMAGEN.src = '../../resources/img/png/rectangulo.png'
    ALIAS_ADMIN.disabled = false;
    CLAVE_ADMIN.disabled = false;
    CONFIRMAR_CLAVE.disabled = false;
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
        ALIAS_ADMIN.disabled = true;
        CLAVE_ADMIN.disabled = true;
        CONFIRMAR_CLAVE.disabled = true;
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        ID_ADMIN.value = ROW.id_admin;
        NOMBRE_ADMIN.value = ROW.nombre_admin;
        APELLIDO_ADMIN.value = ROW.apellido_admin;
        CORREO_ADMIN.value = ROW.correo_admin;
        ALIAS_ADMIN.value = ROW.alias_admin;
        //Cargamos la imagen del registro seleccionado
        IMAGEN.src = SERVER_URL + 'images/admins/' + ROW.imagen_admin;

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

// Funcion para llenar la tabla con los registros de la base
const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Evalua si viene con un paramentro, de ser asi entonces sera un searchRows pero si viene vacio entonces sera un readAll
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
                            <img src="../../resources/img/png/permisos.png" width="35px">
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
        //En caso que si existen los registro en la base, entonces no se mostrara este codigo.
        HIDDEN_ELEMENT.style.display = 'none';
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

SAVE_FORM_PERMISOS.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    (ID_ASIGNACION_PERMISO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM_PERMISOS);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ASIGNACION_PERMISO_API, action, FORM);
    console.log(DATA)
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

const openDeletePermission = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar el permiso del usuario de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idAsignacionPermiso', id);
        const DATA = await fetchData(ASIGNACION_PERMISO_API, 'deleteRow', FORM);
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            SAVE_MODAL_PERMISO.hide();
        } else {
            sweetAlert(2, DATA.message, false);
        }
    }
}

const openUpdatePermission = async (id) => {
    const FORM = new FormData();
    FORM.append('idAsignacionPermiso', id);
    const DATA = await fetchData(ASIGNACION_PERMISO_API, 'readOneByPermisoId', FORM);
    if (DATA.status) {
        SAVE_FORM_PERMISOS.reset();
        const [ROW] = DATA.dataset;
        ID_ASIGNACION_PERMISO.value = ROW.id_asignacion_permiso;
        PERMISO_ADMIN.value = ROW.id_permiso;
    }
}

//Funcion que cargara los permisos de ese usuario en el modal de permisos.
const fillCards = async (form = null, id) => {
    CARDS.innerHTML = '';
    const FORM = new FormData();
    FORM.append('idAdministrador', id);
    const DATA = await fetchData(ASIGNACION_PERMISO_API, 'readOneByAdminId', FORM);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARDS.innerHTML += `
                <div class="col-12 mb-4">
                    <div class="row p-1 text-center shadow rounded-3">
                        <div class="col-1">
                        <img class="mt-3" src="../../resources/img/png/permisos.png" width="30px">
                        </div>
                        <div class="col-7">
                            <p class="mt-3">${row.nombre_permiso}</p>
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-light" onclick="openUpdatePermission(${row.id_asignacion_permiso})"> 
                                 <img src="../../resources/img/svg/edit_icon.svg" width="30px">
                            </button>
                            <button type="button" class="btn btn-light" onclick="openDeletePermission(${row.id_asignacion_permiso})"> 
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
