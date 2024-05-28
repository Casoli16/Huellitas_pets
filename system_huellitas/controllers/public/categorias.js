// API'S UTILIZADAS EN LA PANTALLA
const CATEGORIA_API = 'services/public/categorias.php';

// ELEMENTOS DE LA TABLA
const CONTENEDOR = document.getElementById('contenedorPadre');
// Variable para saber en qué página estamos
const PARAMS = new URLSearchParams(window.location.search);

//Guarda en una variable el parametro obtenido
const MASCOTA = PARAMS.get("mascota");


// Función que se carga cuando se abre la página
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    await fillConteiner(MASCOTA);
})


// Función para cargar las categorias de la página
const fillConteiner = async (animal) => {
    CONTENEDOR.innerHTML = '';
    const FORM = new FormData();
    FORM.append('nombreMascota', animal);
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CONTENEDOR.innerHTML += `
            <div class="col">
                <div class="card border-0 h-100" name="${row.nombre_categoria}">
                    <img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" class="card-img-top" style="max-height: 500px; min-height: 300px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${row.nombre_categoria}</h5>
                        <p class="card-text">${row.descripcion_categoria}</p>
                    </div>
                </div>
            </div>
            `;
        });
        // Añadir el evento de clic a todas las tarjetas después de insertarlas en el DOM
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const categoria = card.getAttribute('name');
                const resultado = decodeAndRemoveSpaces(`../../views/public/productos.html?categoria=${categoria}`);
                console.log(resultado);
                navigateToPage(categoria);
            });
        });

    } else {
        sweetAlert(3, DATA.error, true);
    }
}

// Función para cargar la siguiente pantalla dependiendo de la categoria elegida
const navigateToPage = (categoria) => {
    window.location.href = `../../views/public/productos.html?categoria=${categoria}`;
}

// Método para devolver una cadena sin espacios al darle una URL codificada
const decodeAndRemoveSpaces = (encodedURL) => {
    // Decodificar la URL
    let decodedString = decodeURIComponent(encodedURL);
    // Eliminar los espacios de la cadena decodificada
    let stringWithoutSpaces = decodedString.replace(/\s+/g, ' ');
    return stringWithoutSpaces;
}

// Ejemplo de uso (no utilizar en el código actual, solo como referencia)
// let exampleURL = 'https://example.com/search?query=hola%20mundo';
// let result = decodeAndRemoveSpaces(exampleURL);
// console.log(result); // Salida: 'https://example.com/search?query=holamundo'
