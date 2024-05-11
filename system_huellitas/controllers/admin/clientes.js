
const CLIENTE_API = 'services/admin/clientes.php'

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// LLAMAMOS AL DIV QUE CONTIENE EL MENSAJE QUE APARECERA CUANDO NO SE ENCUENTREN LOS REGISTROS EN TABLA A BUSCAR
const HIDDEN_ELEMENT = document.getElementById('anyTable');

const INFO_MODAL = new bootstrap.Modal ('#seeModal'),
    TITLE_MODAL = document.getElementById("modalTitle");

const SEARCH_INPUT = document.getElementById("searchInput");

const FORM = document.getElementById("seeForm"),
    IMG_CLIENTE = document.getElementById("imgCliente"),
    NOMBRE_CLIENTE = document.getElementById("nombreCliente"),
    APELLIDO_CLIENTE = document.getElementById("apellidoCliente"),
    TELEFONO_CLIENTE = document.getElementById("telCliente"),
    DIRECCION_CLIENTE = document.getElementById("direccionCliente"),
    ESTADO_CLIENTE = document.getElementById("estadoCliente"),
    CORREO_CLIENTE = document.getElementById("emailCliente"),
    DUI_CLIENTE = document.getElementById("duiCliente"),
    FECHA_NACIMIENTO = document.getElementById("nacimientoCliente"),
    FECHA_REGISTRO = document.getElementById("fechaRegistroCliente");

document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    fillTable();
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
        console.log(FORM)
        // En caso que no este vacio, entonces cargara la tabla pero le pasamos el valor que se escribio en el input y se mandara a la funcion FillTable()
        fillTable(FORM);
    }
}

const seeInfo = async (id) => {
    const form = new FormData();
    form.append('idCliente', id)
    const DATA = await fetchData(CLIENTE_API, 'readOne', form);
    if(DATA.status){
        INFO_MODAL.show();
        TITLE_MODAL.textContent = 'Información del cliente';
        const [ROW] = DATA.dataset;
        IMG_CLIENTE.src = SERVER_URL + 'images/clientes/' + ROW.imagen_cliente;
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        CORREO_CLIENTE.value = ROW.correo_cliente;
        DUI_CLIENTE.value = ROW.dui_cliente;
        TELEFONO_CLIENTE.value = ROW.telefono_cliente;
        FECHA_NACIMIENTO.value = ROW.nacimiento_cliente;
        DIRECCION_CLIENTE.value = ROW.direccion_cliente;
        FECHA_REGISTRO.value = ROW.fecha_registro_cliente;
        ESTADO_CLIENTE.value = ROW.estado_cliente;
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