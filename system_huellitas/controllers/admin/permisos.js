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
    NOMBRE_PERMISO = document.getElementById('NombrePermiso'),
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

//Obtiene el id de la tabla
const PAGINATION_TABLE = document.getElementById('paginationTable');
//Declaramos una variable que permitira guardar la paginacion de la tabla
let PAGINATION;

//Metodo del evento para cuando el documento ha cargago.
document.addEventListener("DOMContentLoaded", () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Espera a que fillTable termine de ejecutarse, para luego llamar a la funcion initializeDataTable;
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
    // Evitar que el formulario se envíe y la página se recargue
    event.preventDefault();

    // Determinar la acción a realizar (actualización o creación de un cupón)
    (ID_PERMISO.value) ? ACTION = 'updateRow' : ACTION = 'createRow';

    // Obtener los datos del formulario
    const FORM = new FormData(SAVE_FORM);

    const SWVER_CLIENTE = VER_CLIENTE.checked ? 1 : 0;
    const SWVER_MARCA = VER_MARCA.checked ? 1 : 0;
    const SWVER_PEDIDO = VER_PEDIDO.checked ? 1 : 0;
    const SWVER_COMENTARIO = VER_COMENTARIO.checked ? 1 : 0;
    const SWVER_PRODUCTO = VER_PRODUCTO.checked ? 1 : 0;
    const SWVER_CATEGORIA = VER_CATEGORIA.checked ? 1 : 0;
    const SWVER_CUPON = VER_CUPON.checked ? 1 : 0;
    const SWVER_PERMISO = VER_PERMISO.checked ? 1 : 0;
    const SWVER_USUARIO = VER_USUARIO.checked ? 1 : 0;

    // Verificar si al menos un permiso está activo
    const IS_ANY_PERMISSION_ACTIVE =
        SWVER_CLIENTE || SWVER_MARCA || SWVER_PEDIDO || SWVER_COMENTARIO ||
        SWVER_PRODUCTO || SWVER_CATEGORIA || SWVER_CUPON || SWVER_PERMISO || SWVER_USUARIO;

    if (!IS_ANY_PERMISSION_ACTIVE) {
        // Mostrar SweetAlert con el mensaje de error
        sweetAlert(2, "¡Activa por lo menos un permiso!", false);
        return; // Detener el proceso
    }
    FORM.set('ver_cliente', SWVER_CLIENTE);
    FORM.set('ver_marca', SWVER_MARCA);
    FORM.set('ver_pedido', SWVER_PEDIDO);
    FORM.set('ver_comentario', SWVER_COMENTARIO);
    FORM.set('ver_producto', SWVER_PRODUCTO);
    FORM.set('ver_categoria', SWVER_CATEGORIA);
    FORM.set('ver_cupon', SWVER_CUPON);
    FORM.set('ver_permiso', SWVER_PERMISO);
    FORM.set('ver_usuario', SWVER_USUARIO);

    console.log(FORM);
    // Enviar los datos del formulario al servidor y manejar la respuesta
    const DATA = await fetchData(PERMISOS_API, ACTION, FORM);

    // Verificar si la respuesta del servidor fue satisfactoria
    if (DATA.status) {
        // Ocultar el modal
        SAVE_MODAL.hide();
        // Mostrar mensaje de éxito
        sweetAlert(1, DATA.message, true);
        //Llamos la funcion que reinicializara DataTable y cargara nuevamente la tabla para visualizar los cambios.
        await resetDataTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


// Preparamos el modal para resetear su data y abrirse con el titulo elegido
const openCreate = () => {
    ID_PERMISO.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear permiso';
    SAVE_FORM.reset();
}

// Preparamos el modal para que se cargue la información correspondiente de este registro
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
        NOMBRE_PERMISO.value = ROW.nombre_permiso;
        ID_PERMISO.value = ROW.id_permiso;
        const SCH_VER_CLIENTE = (ROW.ver_cliente === 1) ? 'checked' : '';
        const SCH_VER_MARCA = (ROW.ver_marca === 1) ? 'checked' : '';
        const SCH_VER_PEDIDO = (ROW.ver_pedido === 1) ? 'checked' : '';
        const SCH_VER_COMENTARIO = (ROW.ver_comentario === 1) ? 'checked' : '';
        const SCH_VER_PRODUCTO = (ROW.ver_producto === 1) ? 'checked' : '';
        const SCH_VER_CATEGORIA = (ROW.ver_categoria === 1) ? 'checked' : '';
        const SCH_VER_CUPON = (ROW.ver_cupon === 1) ? 'checked' : '';
        const SCH_VER_PERMISO = (ROW.ver_permiso === 1) ? 'checked' : '';
        const SCH_VER_USUARIO = (ROW.ver_usuario === 1) ? 'checked' : '';

        VER_CLIENTE.checked = SCH_VER_CLIENTE;
        VER_MARCA.checked = SCH_VER_MARCA;
        VER_PEDIDO.checked = SCH_VER_PEDIDO;
        VER_COMENTARIO.checked = SCH_VER_COMENTARIO;
        VER_PRODUCTO.checked = SCH_VER_PRODUCTO;
        VER_CATEGORIA.checked = SCH_VER_CATEGORIA;
        VER_CUPON.checked = SCH_VER_CUPON;
        VER_PERMISO.checked = SCH_VER_PERMISO;
        VER_USUARIO.checked = SCH_VER_USUARIO;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Metodo para eliminar un permiso en caso de que no esté asignado a ningún empleado
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
            //Llamos la funcion que reinicializara DataTable y cargara nuevamente la tabla para visualizar los cambios.
            await resetDataTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

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
        } else {
            sweetAlert(3, DATA.error, true);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

