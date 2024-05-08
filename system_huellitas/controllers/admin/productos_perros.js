// API'S UTILIZADAS EN LA PANTALLA
const PRODUCTOS_API = 'services/admin/productos.php';
const CATEGORIAS_API = 'services/admin/categorias.php';
const MARCAS_API = 'services/admin/marcas.php';

const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'),
    FECHA_REGISTRO = document.getElementById('fechaRegistro'),
    CANTIDAD_PRODUCTO = document.getElementById('cantidadProducto'),
    MASCOTA = document.getElementById('mascotaSelect'),
    CATEGORIA = document.getElementById('categoriaSelect'),
    MARCA = document.getElementById('marcaSelect'),
    ESTADO_PRODUCTO = document.getElementById('switchPerros'),
    IMAGEN_PRODUCTO = document.getElementById('imgProduct');

const INFO_MODAL = new bootstrap.Modal('#infoModal'),
    MODAL_TITLE_INFO = document.getElementById('titleModalInfo');
const NOMBRE_TEXT = document.getElementById('nombre');
const DESCRIPCION_TEXT = document.getElementById('descripcion');
const MASCOTA_TEXT = document.getElementById('tipo_mascota');
const CATEGORIA_TEXT = document.getElementById('categoria');
const PRECIO_TEXT = document.getElementById('precio');
const CANTIDAD_TEXT = document.getElementById('cantidad');
const MARCA_TEXT = document.getElementById('marca');
const IMAGEN_INFO = document.getElementById('imagenInfo');


// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen');

// Agregamos el evento change al input de tipo file que selecciona la imagen
IMAGEN_PRODUCTO.addEventListener('change', function (event) {
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

// CUANDO SE CARGUE EL DOCUMENTO
document.addEventListener('DOMContentLoaded', ()  => {
    loadTemplate();
    fillTable();
})

SAVE_FORM.addEventListener('submit', async (event) => {
     // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
     // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // PARA REGISTRAR LA FECHA DEL REGISTRO
    const currentDate = new Date().toISOString().split('T')[0];

    FORM.append('fechaRegistroProducto', currentDate);

    const estadoProducto = ESTADO_PRODUCTO.checked ? 1 : 0;

    FORM.set('estadoProducto', estadoProducto);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTOS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        IMAGEN.src = '../../resources/img/png/rectangulo.png'
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }

});

const openCreate = async () => {
    ID_PRODUCTO.value = '';
    await fillSelect(MARCAS_API, 'readAll', 'marcaSelect');
    await fillSelect(CATEGORIAS_API, 'readAll', 'categoriaSelect');
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear producto';
    SAVE_FORM.reset();
    IMAGEN.src = '../../resources/img/png/rectangulo.png'
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTOS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar producto';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        const switchChecked = (ROW.estado_producto === 1) ? 'checked' : '';
        ID_PRODUCTO.value = ROW.id_producto;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.value = ROW.descripcion_producto;
        PRECIO_PRODUCTO.value = ROW.precio_producto;
        CANTIDAD_PRODUCTO.value = ROW.existencia_producto;
        ESTADO_PRODUCTO.checked = switchChecked;

        //Traemos el valor que tiene el campo mascotas y lo guardamos en una variable.
        const mascota = ROW.mascotas;
        MASCOTA.disabled= true;
        //Llamamos a la funcion preselectOption y le pasamos el id del select y el dato que queremos que compare
        //entre las opciones que ya estan definidas en el select para mostrar esta opcion en el select.
        preselectOption('mascotaSelect', mascota);
        //Muestra el valor de la categoria
        await fillSelect(CATEGORIAS_API, 'readAll', 'categoriaSelect', ROW.id_categoria);
        //Muestra el valor de la marca
        await fillSelect(MARCAS_API, 'readAll', 'marcaSelect', ROW.id_marca);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openInfo = async (id) => {
    const FORM = new FormData();
    FORM.append('idProducto', id);
    const DATA = await fetchData(PRODUCTOS_API, 'readSpecificProductById', FORM);
    if(DATA.status){
        INFO_MODAL.show();
        MODAL_TITLE_INFO.textContent = 'Información del producto';
        const [ROW] = DATA.dataset;
        IMAGEN_INFO.src = SERVER_URL + 'images/productos/' + ROW.imagen_producto;
        NOMBRE_TEXT.textContent = ROW.nombre_producto;
        DESCRIPCION_TEXT.textContent = ROW.descripcion_producto;
        MASCOTA_TEXT.textContent = ROW.mascotas;
        CATEGORIA_TEXT.textContent = ROW.nombre_categoria;
        PRECIO_TEXT.textContent = ROW.precio_producto;
        CANTIDAD_TEXT.textContent = ROW.existencia_producto;
        MARCA_TEXT.textContent = ROW.nombre_marca;
    } else{
        sweetAlert(2, DATA.error, false)
    }
}
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PRODUCTOS_API, 'deleteRow', FORM);
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
const fillTable =  async () => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    const mascota = 'perro';
    const FORM = new FormData();
    FORM.append('mascota', mascota);
    const DATA = await  fetchData(PRODUCTOS_API, 'readSpecificProduct', FORM);
    if(DATA.status){
        DATA.dataset.forEach(row => {
            const stwitchChecked = (row.estado_producto === 1) ? 'checked' : '';
            TABLE_BODY.innerHTML += `
            <tr>
                <td>
                  <img src="${SERVER_URL}images/productos/${row.imagen_producto}" height="70px" width="80px">
                </td>
                <td>${row.nombre_producto}</td>
                <td>${row.fecha_registro_producto}</td>
                <td>${row.nombre_categoria}</td>
                <td>
                   <div class="form-check form-switch">
                       <input class="form-check-input bg-orange-color" type="checkbox" role="switch"
                              id="switch1" name="switch1" ${stwitchChecked} disabled>
                   </div>
                </td>
                <td>
                   <button type="button" class="btn btn-light"><img
                           src="../../resources/img/svg/delete_icon.svg" width="35px" onclick="openDelete(${row.id_producto})"></button>
                   <button type="button" class="btn btn-light" data-bs-toggle="modal"
                           data-bs-target="#editar_producto"><img src="../../resources/img/svg/edit_icon.svg"
                           width="35px" onclick="openUpdate(${row.id_producto})"></button>
                   <button type="button" class="btn btn-light" data-bs-toggle="modal"
                          data-bs-target="#info_producto"><img src="../../resources/img/svg/info_icon.svg"
                   width="33px" onclick="openInfo(${row.id_producto})"></button>
                </td>
            </tr>
            `
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
}