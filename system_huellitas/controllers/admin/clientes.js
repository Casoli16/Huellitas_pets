
const CLIENTE_API = 'services/admin/clientes.php'

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound'),
    CONTAINER_GRAPHICS = document.getElementById('ContenedorG'),
    BTN1_GRAPHICS = document.getElementById('btn1G'),
    BTN2_GRAPHICS = document.getElementById('btn2G'),
    BTN3_GRAPHICS = document.getElementById('btn3G');

const INFO_MODAL = new bootstrap.Modal('#seeModal'),
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

//Incicia cuando el documento se recarga
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate()
    //Espera a que fillTable termine de ejecutarse, para luego llamar a la funcion initializeDataTable;
    fillTable().then(initializeDataTable);

    //Función que permite darle click al boton de ver los graficos 1
BTN1_GRAPHICS.addEventListener('click', async () => {
    BTN1_GRAPHICS.classList.add('active');
    BTN2_GRAPHICS.classList.remove('active');
    BTN3_GRAPHICS.classList.remove('active');
    CONTAINER_GRAPHICS.classList.remove('d-none');
    
    const DATA = await fetchData(CLIENTE_API, 'readTop5Pedidos', null);
    if (DATA.status) {
        let clientes = [];
        let pedidos = [];
        DATA.dataset.forEach(row => {
            clientes.push(row.nombre_completo);
            pedidos.push(row.cantidad_pedidos);
        });
        console.log(clientes, pedidos);
        console.log('Llegue hasta aqui');
        pieGraph('myChart', clientes, pedidos, 'Total de pedidos', `Top 5 clientes con mayores pedidos completados`);
        console.log('Llegue después de pieGraph');
    } else {
        sweetAlert(2, DATA.error, false);
    }
        
});

//Función que permite darle click al boton de ver los graficos 2
BTN2_GRAPHICS.addEventListener('click', async () => {
    BTN3_GRAPHICS.classList.remove('active');
    BTN2_GRAPHICS.classList.add('active');
    BTN1_GRAPHICS.classList.remove('active');
    CONTAINER_GRAPHICS.classList.remove('d-none');
    
    const DATA = await fetchData(CLIENTE_API, 'readTop5Productos', null);
    if (DATA.status) {
        let clientes = [];
        let producto = [];
        DATA.dataset.forEach(row => {
            clientes.push(row.nombre_completo);
            producto.push(row.cantidad_productos);
        });
        console.log(clientes, producto);
        console.log('Llegue hasta aqui');
        pieGraph('myChart', clientes, producto, 'Total de productos', `Top 5 clientes con más productos comprados`);
        console.log('Llegue después de pieGraph');
    } else {
        sweetAlert(2, DATA.error, false);
    }
        
});

//Función que permite darle click al boton de ver los graficos 3
BTN3_GRAPHICS.addEventListener('click', async () => {
    BTN3_GRAPHICS.classList.add('active');
    BTN2_GRAPHICS.classList.remove('active');
    BTN1_GRAPHICS.classList.remove('active');
    CONTAINER_GRAPHICS.classList.remove('d-none');
    
    const DATA = await fetchData(CLIENTE_API, 'readClientesMensuales', null);
    if (DATA.status) {
        let mes = [];
        let registros = [];
        DATA.dataset.forEach(row => {
            mes.push(row.Mes);
            registros.push(row.total_clientes);
        });
        console.log(registros);
        console.log('Llegue hasta aqui');
        linearScale('myChart', mes, registros, 'Total clientes registrados', `Total clientes registrados en 2024`);
        console.log('Llegue después de pieGraph'); 
    } else {
        sweetAlert(2, DATA.error, false);
    }
        
});

BTN1_GRAPHICS.addEventListener('dblclick', () => {
    CONTAINER_GRAPHICS.classList.add('d-none');
});

BTN2_GRAPHICS.addEventListener('dblclick', () => {
    CONTAINER_GRAPHICS.classList.add('d-none');

});

BTN3_GRAPHICS.addEventListener('dblclick', () => {
    CONTAINER_GRAPHICS.classList.add('d-none');

});


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

//Función que permite actualizar el estado del cliente
FORM_UPDATE.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(FORM_UPDATE);
    const DATA = await fetchData(CLIENTE_API, 'updateRow', FORM);
    if (DATA.status) {
        INFO_MODAL.hide();
        sweetAlert(1, DATA.message, true);
        await resetDataTable()
    } else {
        sweetAlert(2, DATA.error, false);
    }
})

//Función que permiste ver la información del cliente
const seeInfo = async (id) => {
    FORM_UPDATE.reset();
    const form = new FormData();
    form.append('idCliente', id)
    const DATA = await fetchData(CLIENTE_API, 'readOne', form);
    if (DATA.status) {
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


//Función que llena la tabla de datos.
const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Evalua si viene con un paramentro, de ser asi entonces sera un searchRows pero si viene vacio entonces sera un readAll
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(CLIENTE_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            let textColor = 'black';

            if (row.estado_cliente === 'Activo') {
                textColor = 'success';
            } else {
                textColor = 'danger';
            }

            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img class="rounded-circle" src="${SERVER_URL}images/clientes/${row.imagen_cliente}" height="70px" width="80px"></td>
                    <td>${row.nombre_cliente}</td>
                    <td>${row.apellido_cliente}</td>
                    <td>${row.dui_cliente}</td>
                    <td>${row.correo_cliente}</td>
                    <td>${row.telefono_cliente}</td>
                    <td class="text-${textColor} fw-semibold">${row.estado_cliente}</td>
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

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/clientes.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}