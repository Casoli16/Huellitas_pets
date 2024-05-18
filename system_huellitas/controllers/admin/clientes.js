
const CLIENTE_API = 'services/admin/clientes.php'

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

const INFO_MODAL = new bootstrap.Modal ('#seeModal'),
    TITLE_MODAL = document.getElementById("modalTitle");

const FORM_UPDATE = document.getElementById("seeForm"),
    IMG_CLIENTE = document.getElementById("imgCliente"),
    ID_CLIENTE = document.getElementById("idCliente"),
    NOMBRE_CLIENTE = document.getElementById("nombreCliente"),
    APELLIDO_CLIENTE = document.getElementById("apellidoCliente"),
    TELEFONO_CLIENTE = document.getElementById("telCliente"),
    DIRECCION_CLIENTE = document.getElementById("direccionCliente"),
    ESTADO_CLIENTE = document.getElementById("estadoCliente"),
    CORREO_CLIENTE = document.getElementById("emailCliente"),
    DUI_CLIENTE = document.getElementById("duiCliente"),
    FECHA_NACIMIENTO = document.getElementById("nacimientoCliente"),
    FECHA_REGISTRO = document.getElementById("fechaRegistroCliente");

//Obtiene el id de la tabla
const PAGINATION_TABLE = document.getElementById('paginationTable');
//Declaramos una variable que permitira guardar la paginacion de la tabla
let PAGINATION;

document.addEventListener('DOMContentLoaded', () => {
    loadTemplate()
    //Espera a que fillTable termine de ejecutarse, para luego llamar a la funcion initializeDataTable;
    fillTable().then(initializeDataTable);
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
FORM_UPDATE.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(FORM_UPDATE);
    const DATA = await fetchData(CLIENTE_API, 'updateRow', FORM);
    if(DATA.status){
        INFO_MODAL.hide();
        sweetAlert(1, DATA.message, true);
        await resetDataTable()
    }else {
        sweetAlert(2, DATA.error, false);
    }
})

const seeInfo = async (id) => {
    FORM_UPDATE.reset();
    const form = new FormData();
    form.append('idCliente', id)
    const DATA = await fetchData(CLIENTE_API, 'readOne', form);
    if(DATA.status){
        INFO_MODAL.show();
        TITLE_MODAL.textContent = 'Información del cliente';
        const [ROW] = DATA.dataset;
        IMG_CLIENTE.src = SERVER_URL + 'images/clientes/' + ROW.imagen_cliente;
        ID_CLIENTE.value = ROW.id_cliente;
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        CORREO_CLIENTE.value = ROW.correo_cliente;
        DUI_CLIENTE.value = ROW.dui_cliente;
        TELEFONO_CLIENTE.value = ROW.telefono_cliente;
        FECHA_NACIMIENTO.value = ROW.nacimiento_cliente;
        DIRECCION_CLIENTE.value = ROW.direccion_cliente;
        FECHA_REGISTRO.value = ROW.fecha_registro_cliente;
        const estado = ROW.estado_cliente;

        preselectOption('estadoCliente', estado);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Evalua si viene con un paramentro, de ser asi entonces sera un searchRows pero si viene vacio entonces sera un readAll
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(CLIENTE_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img class="rounded-circle" src="${SERVER_URL}images/clientes/${row.imagen_cliente}" height="70px" width="80px"></td>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.apellido_cliente}</td>
                    <td>${row.dui_cliente}</td>
                    <td>${row.correo_cliente}</td>
                    <td>${row.telefono_cliente}</td>
                    <td>${row.estado_cliente}</td>
                    <td>
                        <button type="button" class="btn btn-light" onclick="seeInfo(${row.id_cliente})"><img src="../../resources/img/svg/info_icon.svg"
                        width="35px"></button>
                    </td>           
                </tr>
            `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(3, DATA.error, true);
    }
}