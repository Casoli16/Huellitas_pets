
const LOGIN_FORM = document.getElementById('loginForm');

// document.addEventListener('DOMContentLoaded', async () => {
//     const DATA = await fetchData(USER_API, 'readUsers');
//
//     if(DATA.session) {
//         location.href = 'dashboard.html';
//     } else if (DATA.status) {
//         MAIN_TITLE.textContent =
//     }
// })


LOGIN_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    if (DATA.status) {
        // Marcar que se ha hecho clic en el botón de inicio de sesión
        localStorage.setItem("loginClicked", "true");
        // Redirigir a la página de carga
        window.location.href = '../../views/admin/pantalla_carga.html';
    } else {
        sweetAlert(2, DATA.message, false);
    }
});


// document.getElementById("loginButton").addEventListener("click", function() {
//     // Marcar que se ha hecho clic en el botón de inicio de sesión
//     localStorage.setItem("loginClicked", "true");
//     // Redirigir a la página de la pantalla de carga
//     window.location.href = "../../views/admin/pantalla_carga.html";
// });