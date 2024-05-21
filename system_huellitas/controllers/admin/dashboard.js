const GENERALIDADES_API = 'services/admin/generalidades.php';

const GREETING = document.getElementById('greetings');
const ADMIN_IMAGE = document.getElementById('adminImg');
const ADMIN_NAME = document.getElementById('adminName');
const ADMIN_EMAIL = document.getElementById('emailAdmin');

const CATEGORY_LIST = document.getElementById("category_list");
const NO_CATEGORY_LIST = document.getElementById("withoutCategory");
const NEW_USERS = document.getElementById("newUsers");
const CATEGORY_TOP_PRODUCT = document.getElementById("categoryTopProduct");
const NAME_TOP_PRODUCT = document.getElementById("nameTopProduct");
const NO_PRODUCT = document.getElementById("withoutProducts");

const MONTH = document.getElementById("selectMenu");

const GRAPH = document.getElementById("myChart");
const NO_GRAPH = document.getElementById("noGraph");

const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

// LLAMAMOS AL DIV QUE CONTIENE EL MENSAJE QUE APARECERA CUANDO NO SE ENCUENTREN LOS REGISTROS EN TABLA A BUSCAR
const HIDDEN_ELEMENT = document.getElementById('anyTable');
const SEARCH_FORM = document.getElementById('searchDashboard');

const BUTTON_CATEGORY = document.getElementById('btnCategory');

//Permite obtener los permisos con los que cuenta este usuario.
const PERMISOS = JSON.parse(localStorage.getItem('dataset'));

document.addEventListener('DOMContentLoaded', async () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Obtenemos los datos del usuario logeado
    getData();
    //Carga la lista de categorias
    categoryList();
    //Carga la cantidad de usuarios nuevos
    newUsers();
    //Carga el producto mas vendido
    topProduct();
    //Carga la función de la gráfica
    selectedOption();
    //Función que permite saber los permisos del user
    permissions();
});


//Nos permite mostrar el search para buscar productos o mostrar el botón que permite irse a categorías
const permissions = async () => {
    if (PERMISOS['ver_categoria']) {
        BUTTON_CATEGORY.classList.remove('d-none');
    } else {
        BUTTON_CATEGORY.classList.add('d-none');
    }

    if (PERMISOS['ver_producto']) {
        SEARCH_FORM.classList.remove('d-none');
    } else {
        BUTTON_CATEGORY.classList.add('d-none');
    }
}


//Obtiene los datos del admin registrado
const getData = async (form = null) => {
    //Peticion a nuestra api para obtener info del usuario logeado
    const DATA = await fetchData(GENERALIDADES_API, 'readProfile');
    //Verifica si la respuesta fue satisfactoria, si no manda un mensaje de error.
    if (DATA.status) {
        //Obtiene el nombre del usuario logueado.
        let name = DATA.dataset.nombre_admin;
        //Obtiene el primer nombre del usuario
        let splitName = name.split(' ')[0];
        //Manda el nombre al html
        GREETING.textContent = '¡Buenas tardes ' + splitName + '!';
        //Manda el nombre completo del usuario.
        ADMIN_NAME.textContent = DATA.dataset.nombre_admin + ' ' + DATA.dataset.apellido_admin;
        //Manda la imagen del usuario.
        ADMIN_IMAGE.src = SERVER_URL + 'images/admins/' + DATA.dataset.imagen_admin;
        //Manda el correo del usuario.
        ADMIN_EMAIL.textContent = DATA.dataset.correo_admin;
    } else {
        sweetAlert(2, DATA.error, true);
    }
}

//Nos muestra las categorías que existen
const categoryList = async () => {
    const DATA = await fetchData(GENERALIDADES_API, 'readAll');
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CATEGORY_LIST.innerHTML += `
                <li class="list-group-item">${row.nombre_categoria}</li>
            `
        })
    } else {
        NO_CATEGORY_LIST.classList.remove('d-none')
    }
}

// Accede a la cantidad de nuevos clientes registrados
const newUsers = async () => {
    const DATA = await fetchData(GENERALIDADES_API, 'newUsers');
    if (DATA.status) {
        NEW_USERS.textContent = DATA.dataset[0].newUsers;
    } else {
        console.log("Fallo algo")
    }
}

//Muestra el producto más vendido
const topProduct = async () => {
    const DATA = await fetchData(GENERALIDADES_API, 'readTopProduct');
    if (DATA.status) {
        CATEGORY_TOP_PRODUCT.textContent = DATA.dataset[0].nombre_categoria;
        NAME_TOP_PRODUCT.textContent = DATA.dataset[0].nombre_producto;
    } else {
        NO_PRODUCT.classList.remove('d-none');
    }
}


/*
*   Función asíncrona para mostrar un gráfico de barras con la cantidad de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

const selectedOption = async () => {
    const month = MONTH.value;
    switch (month) {
        case 'Enero':
            graficoBarrasVentas(1);
            break;
        case 'Febrero':
            graficoBarrasVentas(2);
            break;
        case 'Marzo':
            graficoBarrasVentas(3);
            break;
        case 'Abril':
            graficoBarrasVentas(4);
            break;
        case 'Mayo':
            graficoBarrasVentas(5);
            break;
        case 'Junio':
            graficoBarrasVentas(6);
            break;
        case 'Julio':
            graficoBarrasVentas(7);
            break;
        case 'Agosto':
            graficoBarrasVentas(8);
            break;
        case 'Septiembre':
            graficoBarrasVentas(9);
            break;
        case 'Octubre':
            graficoBarrasVentas(10);
            break;
        case 'Noviembre':
            graficoBarrasVentas(11);
            break;
        case 'Diciembre':
            graficoBarrasVentas(12);
            break;
        default:
            console.log('Selecciona un mes del año');
    }
}

let previousChart = null; // Declare a variable to store the previous chart instance

const graficoBarrasVentas = async (number) => {
    const FORM = new FormData();
    FORM.append('month', number)
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(GENERALIDADES_API, 'readSellingByMonth', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {

        NO_GRAPH.classList.add('d-none');
        GRAPH.classList.remove('d-none');
        // Se declaran los arreglos para guardar los datos a graficar.
        let dia = [];
        let venta = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            dia.push(row.dia);
            venta.push(row.venta_del_dia);
        });

        barGraph('myChart', dia, venta, 'Total vendido en el día $', `Venta de Huellitas Pets en el mes de ${MONTH.value}`);
    } else {
        NO_GRAPH.classList.remove('d-none');
        GRAPH.classList.add('d-none');
    }
}

SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});


const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    const DATA = await fetchData(GENERALIDADES_API, 'searchRows', form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
            <tr onclick="window.location.href = '../../views/admin/scrud_productos.html'">
                <td>
                  <img src="${SERVER_URL}images/productos/${row.imagen_producto}" height="70px" width="80px">
                </td>
                <td>${row.nombre_producto}</td>
            </tr>
            `
        });
        ROWS_FOUND.textContent = DATA.message;
        HIDDEN_ELEMENT.style.display = 'none';
    } else {
        HIDDEN_ELEMENT.innerHTML = `
        <div class="container text-center">
            <p class="p-3 bg-beige-color">No existen resultados</p>
        </div>`
        // Muestra el codigo injectado
        HIDDEN_ELEMENT.style.display = 'block'

        setTimeout(() => {
            HIDDEN_ELEMENT.style.display = 'none';
        }, 1500);
    }
}
