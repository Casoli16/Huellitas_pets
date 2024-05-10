const ADMINISTRADOR_API = 'services/admin/admins.php';

const GREETING = document.getElementById('greetings');
const ADMIN_IMAGE = document.getElementById('adminImg');
const ADMIN_NAME = document.getElementById('adminName');
const ADMIN_APELLIDO = document.getElementById('adminApellido');
const ADMIN_EMAIL = document.getElementById('AdminEmail');
const ADMIN_ALIAS = document.getElementById('AdminAlias');
const ADMIN_PASSWORD = document.getElementById('AdminPassword');

document.addEventListener('DOMContentLoaded', async () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Obtenemos los datos del usuario logeado
    getData();
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
        //Manda el nombre del usuario.
        ADMIN_NAME.value = DATA.dataset.nombre_admin;
        //Manda el apellido del usuario.
        ADMIN_APELLIDO.value = DATA.dataset.apellido_admin;
        //Manda la imagen del usuario.
        ADMIN_IMAGE.src = SERVER_URL + 'images/admins/' + DATA.dataset.imagen_admin;   
        //Manda el correo del usuario.
        ADMIN_EMAIL.value = DATA.dataset.correo_admin;
        //Manda el alias del usuario.
        ADMIN_ALIAS.value = DATA.dataset.alias_admin;
        //Manda la contrasenia del usuario.
        ADMIN_PASSWORD.value = '********';
    } else{
        sweetAlert(2, DATA.error, true);
    }
}