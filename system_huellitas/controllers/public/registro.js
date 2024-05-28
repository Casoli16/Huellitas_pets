const SIGNUP_FORM = document.getElementById('registro_cliente'),
       IMAGEN_CLIENTE = document.getElementById('imagenCliente');

const IMAGEN = document.getElementById('imagen');

// Llamada a la función para establecer la mascara del campo teléfono.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('telefono_cliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
});
// Llamada a la función para establecer la mascara del campo DUI.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('dui_cliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener("DOMContentLoaded", async()=>{
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // LLamada a la función para asignar el token del reCAPTCHA al formulario.
    reCAPTCHA();
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
    // Se asigna la fecha como valor máximo en el campo del formulario.
    document.getElementById('fecha_nacimiento_cliente').max = DATE;
} )

// Método del evento para cuando se envía el formulario de registrar cliente.
SIGNUP_FORM.addEventListener("submit", async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar un cliente.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if(DATA.status){
        sweetAlert(1, DATA.message, true, 'login.html');
    } else if(DATA.recaptcha){
        sweetAlert(2, DATA.message, false);
    } else{
        sweetAlert(2, DATA.error, false)
        // Se genera un nuevo token cuando ocurre un problema.
        reCAPTCHA();
    }
})

/*
*   Función para obtener un token del reCAPTCHA y asignarlo al formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const reCAPTCHA = () => {
    // Método para generar el token del reCAPTCHA.
    grecaptcha.ready(() => {
        // Constante para establecer la llave pública del reCAPTCHA.
        const PUBLIC_KEY = '6Lei6ukpAAAAAMPZ16eVEUcYgV8tw9chT6noaxm7';
        // Se obtiene un token para la página web mediante la llave pública.
        grecaptcha.execute(PUBLIC_KEY, {action: 'homepage'}).then((token) => {
            // Se asigna el valor del token al campo oculto del formulario
            document.getElementById('gRecaptchaResponse').value = token;
        });
    })
}
IMAGEN_CLIENTE.addEventListener('change', function (event) {
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