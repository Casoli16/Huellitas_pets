// API'S UTILIZADAS EN LA PANTALLA
const PRODUCTOS_API = 'services/admin/productos.php';
const CATEGORIAS_API = 'services/admin/categorias.php';
const MARCAS_API = 'services/admin/marcas.php';

//Obtenemos los parametros de la mascota que se selecciono en la pantalla menu_productos.html
const PARAMS = new URLSearchParams(window.location.search);

//Guarda en una variable el parametro obtenido
const MENU = PARAMS.get("mascota");

//Obtiene el id de la tabla
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

//Obtiene el id del boostrap asi como el titulo
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const EXISTENCIAS = document.getElementById('existencias');

//Obtiene todos los input del formulario
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'),
    CANTIDAD_PRODUCTO = document.getElementById('cantidadProducto'),
    ESTADO_PRODUCTO = document.getElementById('switchPerros'),
    IMAGEN_PRODUCTO = document.getElementById('imgProduct'),
    AGREGAR_EXISTENCIAS = document.getElementById('agregarCant');

const INFO_MODAL = new bootstrap.Modal('#infoModal'),
    MODAL_TITLE_INFO = document.getElementById('titleModalInfo');

//Obtiene los input donde se mostrara la info del producto
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

//Obtiene el id del select para elegir el tipo de mascota
const OPTION_PET = document.getElementById('selectMenu');

//Contiene el id donde se pondra el titulo de la pantalla asi como su imagen
const TITLO = document.getElementById('titulo');
const IMAGEN_PAGINA = document.getElementById('imagenMascota');

//Obtiene el id de la tabla
const PAGINATION_TABLE = document.getElementById('paginationTable');
//Declaramos una variable que permitira guardar la paginacion de la tabla
let PAGINATION;

//Guarda lo que se seleccione en el select la mascota
let OPTION;

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
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    //Guarda lo escrito en nuestro select
    OPTION_PET.value = MENU;
    selectedOption()
})

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
const resetDataTable = async (form = null, option = null) => {
    //Revisamos si ya existe una instancia de DataTable ya creada, si es asi se elimina
    if (PAGINATION) {
        PAGINATION.destroy();
    }
    // Espera a que se ejecute completamente la funcion antes de seguir (fillTable llena la tabla con los datos actualizados)
    await fillTable(form, option);
    //Espera a que se ejecute completamente la funcion antes de seguir.
    await initializeDataTable();
};

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    //Obtiene las existencias creadas
    const CANTIDAD = CANTIDAD_PRODUCTO.value;

    //Obtiene las existencias agregadas
    const NUEVA_CANT = AGREGAR_EXISTENCIAS.value;

    //Convertirmos las existencias a int, ya que estan como string.
    const CONVER_CANT1= parseInt(CANTIDAD);
    const CONVER_CANT2 = parseInt(NUEVA_CANT)

    //Sumamos a las existencias, las nuevas existencias agregadas.
    const SUM = CONVER_CANT1 + CONVER_CANT2;

    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);

    const estadoProducto = ESTADO_PRODUCTO.checked ? 1 : 0;

    //Dependiendo de la accion asi se mandaran las existencias
    // Si se crea un producto por primera vez, entonces solo se manda lo que se escriba en el input de existencias
    if(action === 'createRow'){
        FORM.append('existenciaProducto', CANTIDAD)
    //Pero si la accion es update entonces se suma a la existencias, las nuevas que se vayan agregar.
    } else {
        FORM.append('existenciaProducto', SUM.toString());
    }

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
        await selectedOption();
    } else {
        sweetAlert(2, DATA.error, false);
    }

});

const openCreate = async () => {
    CANTIDAD_PRODUCTO.disabled =  false;
    EXISTENCIAS.classList.add('d-none');
    ID_PRODUCTO.value = '';
    await fillSelect(MARCAS_API, 'readAll', 'marcaSelect');
    await fillSelect(CATEGORIAS_API, 'readAll', 'categoriaSelect');
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear producto';
    SAVE_FORM.reset();
    IMAGEN.src = '../../resources/img/png/rectangulo.png'
}

const openUpdate = async (id) => {
    EXISTENCIAS.classList.remove('d-none');
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

        CANTIDAD_PRODUCTO.disabled = true;
        //Cargamos la imagen del registro seleccionado
        IMAGEN.src = SERVER_URL + 'images/productos/' + ROW.imagen_producto;

        //Traemos el valor que tiene el campo mascotas y lo guardamos en una variable.
        const mascota = ROW.mascotas;
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
    if (DATA.status) {
        INFO_MODAL.show();
        MODAL_TITLE_INFO.textContent = 'Información del producto';
        const [ROW] = DATA.dataset;
        IMAGEN_INFO.src = SERVER_URL + 'images/productos/' + ROW.imagen_producto;
        NOMBRE_TEXT.textContent = ROW.nombre_producto;
        DESCRIPCION_TEXT.textContent = ROW.descripcion_producto;
        MASCOTA_TEXT.textContent = ROW.mascotas;
        CATEGORIA_TEXT.textContent = ROW.nombre_categoria;
        PRECIO_TEXT.textContent = '$' + ROW.precio_producto;
        CANTIDAD_TEXT.textContent = ROW.existencia_producto;
        MARCA_TEXT.textContent = ROW.nombre_marca;
    } else {
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
            await selectedOption();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const selectedOption = async () => {
    const optionSelected = OPTION_PET.value;
    if (optionSelected === 'Perros') {
        OPTION = optionSelected;
        TITLO.textContent = 'Perros'
        IMAGEN_PAGINA.src = '../../resources/img/svg/dogs.svg';
        await resetDataTable(null, OPTION)
    } else {
        OPTION = optionSelected;
        TITLO.textContent = 'Gatos'
        IMAGEN_PAGINA.src = '../../resources/img/svg/cats.svg';
        await resetDataTable(null, OPTION)
    }
}

const fillTable = async (form = null, option = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';

    let mascota;

    form = new FormData();
    if (option === 'Perros') {
        mascota = 'Perro';
    } else {
        mascota = 'Gato';
    }
    form.append('mascota', mascota)

    const DATA = await fetchData(PRODUCTOS_API, 'readSpecificProduct', form);
    if (DATA.status) {
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
                       <input class="form-check-input" type="checkbox" role="switch"
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
                    <button type="button" class="btn btn-light" onclick="openReportWithParams(${row.id_producto})">
                        <img src="../../resources/img/png/reportesIcons.png" width="35px">
                    </button>
                </td>
            </tr>
            `
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(3, DATA.error, true);
    }
}

/*
*   Función para abrir un reporte parametrizado de productos de una categoría.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openReportWithParams = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/comentariosPorProducto.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idProducto', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}