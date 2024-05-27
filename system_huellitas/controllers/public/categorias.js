// Variable para saber en qué página estamos
const PARAMS = new URLSearchParams(window.location.search);

//Guarda en una variable el parametro obtenido
const MASCOTA = PARAMS.get("mascota");




document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    console.log(MASCOTA);
})

const navigateToPage = (categoria) => {
    window.location.href = `../../views/public/categorias?mascota=${categoria}`;
}