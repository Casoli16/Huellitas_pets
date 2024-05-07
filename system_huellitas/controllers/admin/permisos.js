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
    (ID_PERMISO.value) ? action = 'updateRow' : action = 'createRow';

    // Obtener los datos del formulario
    const FORM = new FormData(SAVE_FORM);

    console.log(FORM);

    const swver_cliente = VER_CLIENTE.checked ? '1' : '0';
    const swver_marca = VER_MARCA.checked ? '1' : '0';
    const swver_pedido = VER_PEDIDO.checked ? '1' : '0';
    const swver_comentario = VER_COMENTARIO.checked ? '1' : '0';
    const swver_producto = VER_PRODUCTO.checked ? '1' : '0';
    const swver_categoria = VER_CATEGORIA.checked ? '1' : '0';
    const swver_cupon = VER_CUPON.checked ? '1' : '0';
    const swver_permiso = VER_PERMISO.checked ? '1' : '0';
    const swver_usuario = VER_USUARIO.checked ? '1' : '0';

    FORM.set('ver_cliente', swver_cliente);
    FORM.set('ver_marca', swver_marca);
    FORM.set('ver_pedido', swver_pedido);
    FORM.set('ver_comentario', swver_comentario);
    FORM.set('ver_producto', swver_producto);
    FORM.set('ver_categoria', swver_categoria);
    FORM.set('ver_cupon', swver_cupon);
    FORM.set('ver_permiso', swver_permiso);
    FORM.set('ver_usuario', swver_usuario);

    console.log(FORM);
    // Enviar los datos del formulario al servidor y manejar la respuesta
    const DATA = await fetchData(PERMISOS_API, action, FORM);

    console.log(DATA);
    // Verificar si la respuesta del servidor fue satisfactoria
    if (DATA.status) {
        console.log('Si pase');
        // Ocultar el modal
        SAVE_MODAL.hide();
        // Mostrar mensaje de éxito
        sweetAlert(1, DATA.message, true);
        // Volver a llenar la tabla para mostrar los cambios
        fillTable();
    } else {
        // Mostrar mensaje de error
        console.log(DATA.error);
        sweetAlert(2, DATA.error, false);
    }
});



const openCreate = () => {
    ID_PERMISO.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear permsio';
    SAVE_FORM.reset();
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
        NOMBRE_PERMISO.value = ROW.nombre_permiso;
        ID_PERMISO.value = ROW.id_permiso;
        const sch_ver_cliente = (ROW.ver_cliente === 1) ? 'checked' : '';
        const sch_ver_marca = (ROW.ver_marca === 1) ? 'checked' : '';
        const sch_ver_pedido = (ROW.ver_pedido === 1) ? 'checked' : '';
        const sch_ver_comentario = (ROW.ver_comentario === 1) ? 'checked' : '';
        const sch_ver_producto = (ROW.ver_producto === 1) ? 'checked' : '';
        const sch_ver_categoria = (ROW.ver_categoria === 1) ? 'checked' : '';
        const sch_ver_cupon = (ROW.ver_cupon === 1) ? 'checked' : '';
        const sch_ver_permiso = (ROW.ver_permiso === 1) ? 'checked' : '';
        const sch_ver_usuario = (ROW.ver_usuario === 1) ? 'checked' : '';

        VER_CLIENTE.checked = sch_ver_cliente;
        VER_MARCA.checked = sch_ver_marca;
        VER_PEDIDO.checked = sch_ver_pedido;
        VER_COMENTARIO.checked = sch_ver_comentario;
        VER_PRODUCTO.checked = sch_ver_producto;
        VER_CATEGORIA.checked = sch_ver_categoria;
        VER_CUPON.checked = sch_ver_cupon;
        VER_PERMISO.checked = sch_ver_permiso;
        VER_USUARIO.checked = sch_ver_usuario;
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

