const ADMINISTRADOR_API = 'services/admin/admins.php';

const ADMIN_IMAGE = document.getElementById('imagen');

const SAVE_FORM = document.getElementById('saveForm'),
    IMAGEN_ADMIN = document.getElementById('imgAdmin'),
    ADMIN_NAME = document.getElementById('adminName'),
    ADMIN_APELLIDO = document.getElementById('adminApellido'),
    ADMIN_EMAIL = document.getElementById('AdminEmail'),
    ADMIN_ALIAS = document.getElementById('AdminAlias'),
    ADMIN_PASSWORD = document.getElementById('AdminPassword'),
    ADMIN_ID = document.getElementById('idAdministrador');

const GREETING = document.getElementById('greetings');


document.addEventListener('DOMContentLoaded', async () => {
    //Carga el menu en las pantalla
    loadTemplate();
    //Obtenemos los datos del usuario logeado
    getData();
});

// Agregamos el evento change al input de tipo file que selecciona la imagen
IMAGEN_ADMIN.addEventListener('change', function (event) {
    // Verifica si hay una imagen seleccionada
    if (event.target.files && event.target.files[0]) {
        // con el objeto FileReader lee de forma asincrona el archivo seleccionado
        const reader = new FileReader();
        // Luego de haber leido la imagen seleccionada se nos devuele un objeto de tipo blob
        // Con el metodo createObjectUrl de fileReader crea una url temporal para la imagen  
        reader.onload = function (event) {
            // finalmente la url creada se le asigna al atributo src de la etiqueta img
            ADMIN_IMAGE.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
});

const getData = async (form = null) => {
    //Peticion a nuestra api para obtener info del usuario logeado
    const DATA = await fetchData(ADMINISTRADOR_API, 'readProfile');
    //Verifica si la respuesta fue satisfactoria, si no manda un mensaje de error.
    if(DATA.status){
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
        //Manda el ID del usuario.
        ADMIN_ID.value = DATA.dataset.id_admin;
    } else{
        sweetAlert(2, DATA.error, true);
    }
}

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    //Peticion a nuestra api para obtener info del usuario logeado
    const ID = await fetchData(ADMINISTRADOR_API, 'readProfile');

    //Obtiene el nombre del usuario logueado.
    let idAdministrador = ID.dataset.id_admin;
    
    // Se verifica la acción a realizar.
    (idAdministrador) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);

    // PARA REGISTRAR LA FECHA DEL REGISTRO
    const currentDate = new Date().toISOString().split('T')[0];

    FORM.append('fechaRegistroAdmin', currentDate);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ADMINISTRADOR_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    console.log(DATA)
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        console.log(DATA.message)
    } else {
        sweetAlert(2, DATA.error, false);
        console.log(DATA.message)
    }
});