
const CLIENTE_API = 'services/admin/clientes.php'

// ELEMENTOS DE LA TABLA
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// LLAMAMOS AL DIV QUE CONTIENE EL MENSAJE QUE APARECERA CUANDO NO SE ENCUENTREN LOS REGISTROS EN TABLA A BUSCAR
const HIDDEN_ELEMENT = document.getElementById('anyTable');


document.addEventListener('DOMContentLoaded', () => {
     loadTemplate();
     fillTable();
})

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
                            <td>
                                <img class="rounded-circle" src="${SERVER_URL}images/clientes/${row.imagen_cliente}" height="70px" width="80px">
                            </td>
                            <td>${row.nombre_cliente}</td>
                            <td>${row.apellido_cliente}</td>
                            <td>${row.dui_cliente}</td>
                            <td>${row.correo_cliente}</td>
                            <td>${row.telefono_cliente}</td>
                            <td>${row.estado_cliente}</td>
                            <td>
                                <button type="button" class="btn btn-light" data-bs-toggle="modal"
                                    data-bs-target="#ver_cliente"><img src="../../resources/img/svg/info_icon.svg"
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