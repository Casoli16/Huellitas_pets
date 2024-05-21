// Cuando se carga el documento muestra el menu
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
})

const navigateToPage = (mascota) => {
    window.location.href = `../../views/admin/scrud_productos.html?mascota=${mascota}`;
}