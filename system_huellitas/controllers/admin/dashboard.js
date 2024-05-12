const ADMINISTRADOR_API = 'services/admin/admins.php';
const CATEGORIA_API = 'services/admin/categorias.php';
const CLIENTE_API = 'services/admin/clientes.php'
const PRODUCTOS_API = 'services/admin/productos.php';

const GREETING = document.getElementById('greetings');
const ADMIN_IMAGE = document.getElementById('adminImg');
const ADMIN_NAME = document.getElementById('adminName');
const ADMIN_EMAIL = document.getElementById('emailAdmin');

const CATEGORY_LIST = document.getElementById("category_list");
const NEW_USERS = document.getElementById("newUsers");
const CATEGORY_TOP_PRODUCT = document.getElementById("categoryTopProduct");
const NAME_TOP_PRODUCT = document.getElementById("nameTopProduct");

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
});

const getData = async (form = null) => {
    //Peticion a nuestra api para obtener info del usuario logeado
    const DATA = await fetchData(ADMINISTRADOR_API, 'readProfile');
    //Verifica si la respuesta fue satisfactoria, si no manda un mensaje de error.
    if(DATA.status){
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
    } else{
        sweetAlert(2, DATA.error, true);
    }
}

const categoryList = async () => {
    const DATA = await fetchData(CATEGORIA_API, 'readAll');
    if(DATA.status){
        DATA.dataset.forEach(row=> {
            CATEGORY_LIST.innerHTML += `
                <li class="list-group-item">${row.nombre_categoria}</li>
            `
        })
    } else{
        sweetAlert(3, DATA.error, true);
    }
}

// Accede a la cantidad de nuevos clientes registrados
const newUsers = async () => {
    const DATA = await fetchData(CLIENTE_API, 'newUsers');
    if(DATA.status){
        NEW_USERS.textContent =  DATA.dataset[0].newUsers;
    }else {
        console.log("Fallo algo")
    }
}

const topProduct = async () => {
    const DATA = await fetchData(PRODUCTOS_API, 'readTopProduct');
    if(DATA.status){
        CATEGORY_TOP_PRODUCT.textContent = DATA.dataset[0].nombre_categoria;
        NAME_TOP_PRODUCT.textContent = DATA.dataset[0].nombre_producto;
    }
}