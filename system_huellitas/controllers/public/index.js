const MARCAS_API = 'services/public/marcas.php';
// API'S UTILIZADAS EN LA PANTALLA
const PRODUCTOS_API = 'services/public/productos.php';

const CONTENEDOR = document.getElementById('contenedorPadre');

// Contenedor principal del carrusel
const CAROUSEL_INNER = document.querySelector('.carousel-inner');

document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate()
        .then(readMarcas)
        .then(fillProducts);
})

//Funcion que permite pasar un parametro a la pagina a la se redirecciona.
const goToCategories = (mascota) => {
    window.location.href = `../../views/public/categorias.html?mascota=${mascota}`
}

//Muestra
const readMarcas = async () => {
    const DATA = await fetchData(MARCAS_API, 'readAll');

    if (DATA.status) {
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

const renderStars = (puntuacion) => {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= parseInt(puntuacion)) {
            starsHTML += ' <img src="../../resources/img/png/start_on.png" width="14px" height="14px"> ';
        } else {
            starsHTML += ' <img src="../../resources/img/png/start_off.png" width="14px" height="14px"> ';
        }
    }
    console.log(starsHTML);
    return starsHTML;
};

//Función que permite mostrar los productos 
const fillProducts = async () => {
    const DATA = await fetchData(PRODUCTOS_API, 'readAllProducts');
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CONTENEDOR.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="p-sm-3 card rounded-4 shadow mb-3">
                    <div class="justify-content-center text-center">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" width="200px" height="200px" alt="...">
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-6">
                                <h5 class="card-title fw-bold">$${row.precio_producto}</h5>
                            </div>
                            <div class="col-6" id="estrellas_${row.id_producto}">
                                
                            </div>
                        </div>
                        <p class="card-text small fw-light mb-0 mt-1">${row.Marca}</p>
                        <div class="container-title">   
                            <p class="fw-bold">${row.nombre_producto}</p>
                        </div>
                        <div class="row d-flex justify-content-center align-items-center">
                            <div class="col-md-9 col-sm-12">
                                <div class="text-start">
                                    <button onclick="navigateToPage(${row.id_producto})" class="btn btn-orange-color text-white fs-6" id="Ver_producto_perros">
                                        Ver producto
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-12 text-center py-2">
                                    <button onclick="navigateToPage(${row.id_producto})" class="btn bg-white rounded">
                                        <img src="../../resources/img/png/carrito_naranja.png" width="30px">
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `

            const estrellas = renderStars(row.puntuacion_producto);
            const idEstrellas = document.getElementById(`estrellas_${row.id_producto}`)
            idEstrellas.innerHTML = estrellas;
            ;
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
}

//Función que permite ir a la pantalla de productos y pasa un id producto.
const navigateToPage = (idProducto) => {
    window.location.href = `../../views/public/producto.html?producto=${idProducto}`;
};

