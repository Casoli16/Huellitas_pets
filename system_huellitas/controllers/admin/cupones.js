// API'S UTILIZADAS EN LA PANTALLA
const CUPONES_API = 'services/admin/cupones.php';

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

//MODAL PARA CREAR/ACTUALIZAR REGISTROS
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CUPON = document.getElementById('idCupon'),
    ESTADO_CUPON = document.getElementById('estadoCupon'),
    NOMBRE_CUPON = document.getElementById('codigoCupon'),
    PORCENTAJE_CUPON = document.getElementById('porcentajeCupon')

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
    (ID_CUPON.value) ? action = 'updateRow' : action = 'createRow';
    
    // Obtener los datos del formulario
    const FORM = new FormData(SAVE_FORM);
    
    // Modificar el valor del checkbox 'estadoCupon' antes de enviarlo
    const estadoCupon = ESTADO_CUPON.checked ? '1' : '0';
    FORM.set('estadoCupon', estadoCupon);
    
    // Enviar los datos del formulario al servidor y manejar la respuesta
    const DATA = await fetchData(CUPONES_API, action, FORM);
    
    console.log(DATA);
    // Verificar si la respuesta del servidor fue satisfactoria
    if (DATA.status) {
        // Ocultar el modal
        SAVE_MODAL.hide();
        // Mostrar mensaje de éxito
        sweetAlert(1, DATA.message, true);
        //Llamos la funcion que reinicializara DataTable y cargara nuevamente la tabla para visualizar los cambios.
        await resetDataTable();
    } else {
        // Mostrar mensaje de error
        console.log(DATA.error);
        sweetAlert(2, DATA.error, false);
    }
});



const openCreate = () => {
    ID_CUPON.value = '';
    SAVE_MODAL.show()
    MODAL_TITLE.textContent = 'Crear cupón';
    SAVE_FORM.reset();
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCupon', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CUPONES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar cupón';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const [ROW] = DATA.dataset;
        const switchChecked = (ROW.estado_cupon === 1) ? 'checked' : '';
        ID_CUPON.value = ROW.id_cupon;
        NOMBRE_CUPON.value = ROW.codigo_cupon;
        PORCENTAJE_CUPON.value = ROW.porcentaje_cupon;
        ESTADO_CUPON.checked = switchChecked;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el cupón de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        console.log(id);
        FORM.append('idCupon', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CUPONES_API, 'deleteRow', FORM);
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
        const DATA = await fetchData(CUPONES_API, action, form);
        console.log(DATA);
        if (DATA.status) {
            DATA.dataset.forEach(row => {
                const switchChecked = (row.estado_cupon === 1) ? 'checked' : '';
                TABLE_BODY.innerHTML += `
                <tr>
                <td>${row.codigo_cupon}</td>
                <td>${row.fecha_ingreso_cupon_formato}</td>
                <td>${row.porcentaje_cupon}</td>
                <td>
                    <div class="form-switch">
                        <input class="form-check-input" type="checkbox" role="switch"
                            id="flexSwitchCheckChecked" ${switchChecked} disabled>
                    </div> 
                </td>  
                <td>
                    <button type="button" class="btn btn-light" onclick="openDelete(${row.id_cupon})">
                        <img src="../../resources/img/svg/delete_icon.svg" width="35px">
                    </button>
                    <button type="button" class="btn btn-light" onclick="openUpdate(${row.id_cupon})">
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

