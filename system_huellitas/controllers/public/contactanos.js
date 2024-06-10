// API'S UTILIZADAS EN LA PANTALLA
const EMAIL_API = 'services/public/email.php';

//Elemento del html a utitlizar.
const FORM_CONTACT = document.getElementById('formContactanos');
const LOADING = document.getElementById('cargaContainer');
//Se ejecuta cada vez que se cargué la pantalla.
document.addEventListener("DOMContentLoaded", () => {
    loadTemplate();
})

//Metodo que se ejecuta cuando se haga clic en el botón para envíar el forms.
FORM_CONTACT.addEventListener("submit", async (event) => {
    event.preventDefault();
    setLoading(true);
    const FORM = new FormData(FORM_CONTACT);
    //Envíamos la petición al servidor.
    const DATA = await fetchData(EMAIL_API, 'sendContactUs', FORM)
    setLoading(false);
    LOADING.classList.remove('d-none')
    if (DATA.status) {
        LOADING.classList.add('d-none');
        sweetAlert(1, DATA.message, true)
        FORM_CONTACT.reset();
    } else {
        sweetAlert(2, DATA.error, true);
    }
});

//Función que muestra el ícono de carga de pantalla.
function setLoading(show) {
    if (show) {
        LOADING.classList.remove('d-none');
    } else {
        LOADING.classList.add('d-none');
    }
}