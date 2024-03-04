document.getElementById("loginButton").addEventListener("click", function() {
    // Marcar que se ha hecho clic en el botón de inicio de sesión
    localStorage.setItem("loginClicked", "true");
    // Redirigir a la página de la pantalla de carga
    window.location.href = "../../views/admin/pantalla_carga.html";
});
