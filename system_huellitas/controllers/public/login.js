// Constante para establecer el formulario de iniciar sesión.
const LOGIN_FORM = document.getElementById('loginCliente');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
});

// Método del evento para cuando se envía el formulario de iniciar sesión.
LOGIN_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    if (DATA.status) {
        console.log(DATA.status)
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
})