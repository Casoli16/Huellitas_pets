const CLIENTES_API = 'services/public/clientes.php';

const CLIENTE_IMAGE = document.getElementById('imagen');

const SAVE_FORM = document.getElementById('saveForm'),
    CLIENTE_NAME = document.getElementById('nombreCliente'),
    CLIENTE_APELLIDO = document.getElementById('apellidoCliente'),
    CLIENTE_TELEFONO = document.getElementById('telefonoCliente'),
    CLIENTE_DIRECCION = document.getElementById('direccionCliente'),
    CLIENTE_DUI = document.getElementById('duiCliente'),
    CLIENTE_CORREO = document.getElementById('correoCliente'),
    CLIENTE_NACIMIENTO = document.getElementById('nacimientoCliente'),
    IMAGEN_CLIENTE = document.getElementById('imgCliente');

// Llamada a la función para establecer la mascara del campo teléfono.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('telefonoCliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
});
// Llamada a la función para establecer la mascara del campo DUI.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('duiCliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async () =>{
    loadTemplate()
        .then(getData);
    // Constante tipo objeto para obtener la fecha y hora actual.
    const TODAY = new Date();
    // Se declara e inicializa una variable para guardar el día en formato de 2 dígitos.
    let day = ('0' + TODAY.getDate()).slice(-2);
    // Se declara e inicializa una variable para guardar el mes en formato de 2 dígitos.
    let month = ('0' + (TODAY.getMonth() + 1)).slice(-2);
    // Se declara e inicializa una variable para guardar el año con la mayoría de edad.
    let year = TODAY.getFullYear() - 18;
    // Se declara e inicializa una variable para establecer el formato de la fecha.
    const DATE = `${year}-${month}-${day}`;
    CLIENTE_NACIMIENTO.max = DATE;
})

const getData = async (form = null) => {
    //Peticion a nuestra api para obtener info del usuario logeado
    const DATA = await fetchData(CLIENTES_API, 'readProfile');
    //Verifica si la respuesta fue satisfactoria, si no manda un mensaje de error.
    if (DATA.status) {
        const ROW = DATA.dataset;
        //Manda el nombre del usuario.
        CLIENTE_NAME.value = ROW.nombre_cliente;
        //Manda el apellido del usuario.
        CLIENTE_APELLIDO.value = ROW.apellido_cliente;
        //Manda el teléfono del usuario.
        CLIENTE_TELEFONO.value = ROW.telefono_cliente;
        //Manda la direccion del usuario.
        CLIENTE_DIRECCION.value = ROW.direccion_cliente;
        CLIENTE_CORREO.value = ROW.correo_cliente;
        let parts = ROW.nacimiento_cliente.split('-');
        let formattedDate = `${parts[0]}-${parts[1]}-${parts[2]}`
        CLIENTE_NACIMIENTO.value = formattedDate;
        //Manda el DUI del usuario.
        CLIENTE_DUI.value = ROW.dui_cliente;
        //Manda la imagen del usuario.
        CLIENTE_IMAGE.src = SERVER_URL + 'images/clientes/' + ROW.imagen_cliente;
    } else {
        sweetAlert(2, DATA.error, true);
    }
}

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTES_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(1, 'Tus cambios se verán afectados cuando vuelvas a ingresar sesión', false, 'perfil.html');
    } else {
        sweetAlert(2, DATA.error, false);
        console.log(DATA.message)
    }
});

// Agregamos el evento change al input de tipo file que selecciona la imagen
IMAGEN_CLIENTE.addEventListener('change', function (event) {
    // Verifica si hay una imagen seleccionada
    if (event.target.files && event.target.files[0]) {
        // con el objeto FileReader lee de forma asincrona el archivo seleccionado
        const reader = new FileReader();
        // Luego de haber leido la imagen seleccionada se nos devuele un objeto de tipo blob
        // Con el metodo createObjectUrl de fileReader crea una url temporal para la imagen  
        reader.onload = function (event) {
            // finalmente la url creada se le asigna al atributo src de la etiqueta img
            CLIENTE_IMAGE.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
});