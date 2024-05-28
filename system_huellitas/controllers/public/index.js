const MARCAS_API = 'services/public/marcas.php';

// Contenedor principal del carrusel
const CAROUSEL_INNER = document.querySelector('.carousel-inner');

document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate().then(readMarcas);
})

//Funcion que permite pasar un parametro a la pagina a la se redirecciona.
const goToCategories = (mascota) => {
    window.location.href = `../../views/public/categorias.html?mascota=${mascota}`
}

//Muestra
const readMarcas = async () => {
    const DATA = await fetchData(MARCAS_API, 'readAll');

    if(DATA.status){
        const IMAGES = DATA.dataset;

        // Dividir las imágenes en grupos de cuatro
        for (let i = 0; i < IMAGES.length; i += 4) {
            const group = IMAGES.slice(i, i + 4);

            // Crear una diapositiva para cada grupo de cuatro imágenes
            const slide = document.createElement('div');
            slide.classList.add('carousel-item');
            if (i === 0) {
                slide.classList.add('active');
            }

            // Crear un contenedor de fila para las imágenes
            const row = document.createElement('div');
            row.classList.add('row');
            row.classList.add('justify-content-center');
            row.classList.add('gy-4')
            row.classList.add('gx-5')

            // Agrega cada imagen al contenedor de fila
            group.forEach(image => {
                const col = document.createElement('div');
                col.classList.add('col-auto');
                col.innerHTML = `
                    <img src="${SERVER_URL}images/marcas/${image.imagen_marca}" class="rounded-circle" width="200px" height="200px">
                `;
                row.appendChild(col);
            });

            // Agregar el contenedor de fila a la diapositiva
            slide.appendChild(row);

            // Agregar la diapositiva al carrusel
            CAROUSEL_INNER.appendChild(slide);
            CAROUSEL_INNER.classList.add('p-5')
        }

        // Inicializar el carrusel de Bootstrap
        const CAROUSEL = new bootstrap.Carousel(document.querySelector('.carousel'), {
            interval: 100
        });
    }
};


