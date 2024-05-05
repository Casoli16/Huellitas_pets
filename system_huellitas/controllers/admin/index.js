const LOGIN_FORM = document.getElementById('loginForm');
const SIGNUP_FORM = document.getElementById('signUpForm'),
        IMAGEN_ADMIN = document.getElementById('imgAdmin');

// Obtenemos el id de la etiqueta img que mostrara la imagen que hemos seleccionado en nuestro input
const IMAGEN = document.getElementById('imagen');

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
            IMAGEN.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Hi')
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Petición para consultar los usuarios registrados.
    const DATA = await fetchData(USER_API, 'readUsers');
    // Se comprueba si existe una sesión, de lo contrario se sigue con el flujo normal.
    if(DATA.session) {
        location.href = 'dashboard.html'
    } else if (DATA.status) {
        LOGIN_FORM.classList.remove('d-none');
        sweetAlert(4, DATA.message, true);
    } else {
        SIGNUP_FORM.classList.remove('d-none');
        sweetAlert(4, DATA.error, true);
    }
});

SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    const FORM = new FormData(SIGNUP_FORM);
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    if(DATA.status){
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

LOGIN_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(USER_API, 'logIn', FORM)
    if (DATA.status) {
        localStorage.setItem("idadmin", DATA.idadmin);
        localStorage.setItem("loginClicked", "true");

        const PERMISOS_API = 'services/admin/permisos.php'
        const FORM2 = new FormData();
        FORM2.append('idAdmin', localStorage.getItem('idadmin'));
        const DATA2 = await fetchData(PERMISOS_API, 'readOneAdmin', FORM2)
        localStorage.setItem('dataset', JSON.stringify(DATA2.dataset));
        console.log(localStorage.getItem('dataset'));
        sweetAlert(1, DATA.message, true, 'pantalla_carga.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});