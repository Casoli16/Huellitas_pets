
const LOGIN_FORM = document.getElementById('loginForm');


LOGIN_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(USER_API, 'logIn', FORM)
    if (DATA.status) {
        console.log(DATA.idadmin);
        localStorage.setItem("idadmin", DATA.idadmin);
        localStorage.setItem("loginClicked", "true");

        const PERMISOS_API = 'services/admin/permisos.php'
        const FORM2 =new FormData(); 
        FORM2.append('idAdmin', localStorage.getItem('idadmin'));
        const DATA2 = await fetchData(PERMISOS_API, 'readOneAdmin', FORM2)
        console.log(DATA2.dataset);
        sweetAlert(1, DATA.message, true, 'pantalla_carga.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});
