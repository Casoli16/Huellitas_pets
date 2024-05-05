const ADMINISTRADOR_API = 'services/admin/admins.php';

const GREETING = document.getElementById('greetings');
const ADMIN_IMAGE = document.getElementById('adminImg');
const ADMIN_NAME = document.getElementById('adminName');
const ADMIN_EMAIL = document.getElementById('emailAdmin');

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