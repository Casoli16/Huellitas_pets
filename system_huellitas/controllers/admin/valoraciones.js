// API'S UTILIZADAS EN LA PANTALLA
const PRODUCTOS_API = 'services/admin/productos.php';
const VALORACIONES_API = 'services/admin/valoraciones.php';

const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// BUSCADOR
const SEARCH_INPUT = document.getElementById('searchInput');

const INFO_MODAL = new bootstrap.Modal('#infoModal'),
    MODAL_TITLE_INFO = document.getElementById('titleModalInfo');

const SAVE_FORM = document.getElementById('saveForm'),
    ID_VALORACION = document.getElementById('idValoracion'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProductoValoracion'),
    NOMBRE_CLIENTE = document.getElementById('nombreClienteValoracion'),
    COMENTARIO_VALORACION = document.getElementById('comentarioValoracion');

// LLAMAMOS AL DIV QUE CONTIENE EL MENSAJE QUE APARECERA CUANDO NO SE ENCUENTREN LOS REGISTROS EN TABLA A BUSCAR
const HIDDEN_ELEMENT = document.getElementById('anyTable');

// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen'),
    IMAGEN_ESTRELLA1 = document.getElementById('imagenE1'),
    IMAGEN_ESTRELLA2 = document.getElementById('imagenE2'),
    IMAGEN_ESTRELLA3 = document.getElementById('imagenE3'),
    IMAGEN_ESTRELLA4 = document.getElementById('imagenE4'),
    IMAGEN_ESTRELLA5 = document.getElementById('imagenE5');

// CUANDO SE CARGUE EL DOCUMENTO
document.addEventListener('DOMContentLoaded', () => {
    //Muestra los registros que hay en la tabla
    fillTable();
    //Carga el menu en las pantalla
    loadTemplate();
})

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
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(VALORACIONES_API, 'updateRow', FORM);
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

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idValoracion', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(VALORACIONES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        INFO_MODAL.show();
        MODAL_TITLE_INFO.textContent = 'Detalless - Comentarios';
        //MODAL_BUTTON.textContent = 'Actualizar '
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        ID_VALORACION.value = ROW.id_valoracion;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        COMENTARIO_VALORACION.value = ROW.comentario_valoracion;
        //Cargamos la imagen del registro seleccionado
        IMAGEN.src = SERVER_URL + 'images/productos/' + ROW.imagen_producto; 

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const fillTable = async (form = null, option = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(VALORACIONES_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            const stwitchChecked = (row.estado_producto === 1) ? 'checked' : '';
            TABLE_BODY.innerHTML += `
            <tr>
                <td class="align-middle">${row.nombre_producto}</td>
                    <td class="align-middle">${row.nombre_cliente} ${row.apellido_cliente}</td>
                    <td class="align-middle">${row.fecha_valoracion}</td>
                    <td class="align-middle">${row.calificacion_valoracion}/5</td>
                    <td class="align-middle"><img src="../../resources/img/png/oculto_categorias.png" alt=""></td>
                    <td class="align-middle">
                        <button type="button" class="btn btn-light" data-bs-toggle="modal"
                        data-bs-target="#infoModal"><img src="../../resources/img/svg/info_icon.svg"
                        width="33px" onclick="openUpdate(${row.id_valoracion})">
                        </button>
                    </td>
                </td>
            </tr>
            `
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}