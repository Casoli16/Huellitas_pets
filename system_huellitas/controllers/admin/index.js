
const LOGIN_FORM = document.getElementById('login');

LOGIN_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(USER_API, 'logIn', FORM)
    if (DATA.status){

    }
})
document.getElementById("loginButton").addEventListener("click", function() {
    // Marcar que se ha hecho clic en el botón de inicio de sesión
    localStorage.setItem("loginClicked", "true");
    // Redirigir a la página de la pantalla de carga
    window.location.href = "../../views/admin/pantalla_carga.html";
});
