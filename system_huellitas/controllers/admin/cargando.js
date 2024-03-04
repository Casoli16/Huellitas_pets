document.addEventListener("DOMContentLoaded", function() {
    // Verificar si se ha marcado que se ha hecho clic en el botón de inicio de sesión
    var loginClicked = localStorage.getItem("loginClicked");
    if (loginClicked === "true") {
        // Esperar un tiempo antes de redirigir al dashboard
        setTimeout(function() {
            window.location.href = "../../views/admin/dashboard.html";
        }, 3000); // 3000 milisegundos = 3 segundos
    } else {
        // Si no se ha hecho clic en el botón de inicio de sesión, redirigir a otra página (por ejemplo, la página de inicio de sesión)
        window.location.href = "../../views/admin/index_admin.html";
    }
});
