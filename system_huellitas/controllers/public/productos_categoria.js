
// API'S UTILIZADAS EN LA PANTALLA
const PRODUCTOS_API = 'services/public/productos.php';

// ELEMENTOS DE LA PÁGINA
const CONTENEDOR = document.getElementById('contenedorPadre'),
    TITULO_PAGINA = document.getElementById('titulaso'),
    SELECTMARCA = document.getElementById('selectMarcas'),
    SELECTCATEGORIA = document.getElementById('selectCategorias'),
    ENCABEZADO = document.getElementById('encabezado');
// Variable para saber en qué página estamos
const PARAMS = new URLSearchParams(window.location.search);

//Guarda en una variable el parametro obtenido
const CATEGORIA = PARAMS.get("categoria");
const MASCOTA = PARAMS.get("mascota");


// Función que se carga cuando se abre la página
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    TITULO_PAGINA.innerHTML = `Huellitas pets - productos`;
    fillEncabezado(MASCOTA);
    const FORM = new FormData();
    FORM.append('mascota', MASCOTA);
    FORM.append('mascota', MASCOTA);
    //fuerza a que CATEGORIA sea int
    const CATEGORIA2 = parseInt(CATEGORIA);
    console.log(SELECTCATEGORIA);
    console.log(SELECTMARCA);
    await fillSelectPost(PRODUCTOS_API, 'readCategorias', FORM, 'selectCategorias', CATEGORIA2);
    await fillSelectPost(PRODUCTOS_API, 'readMarcas', FORM, 'selectMarcas');
    await fillConteiner('readProductsByCategoria', CATEGORIA2);
});

// Función para cargar el los productos en base a la categoría o marca seleccionada
const recargarConteiner = async (action) => {
    if (action == 'readProductsByCategoria' && SELECTCATEGORIA.value != 0) {
        await fillConteiner(action, SELECTCATEGORIA.value);
    }
    else {
        await fillConteiner(action, SELECTMARCA.value);
    }
};

// Función para cargar las categorías de la página
const fillConteiner = async (action, id) => {
    CONTENEDOR.innerHTML = '';
    const FORM = new FormData();
    FORM.append('condition', id);
    FORM.append('mascota', MASCOTA);
    const DATA = await fetchData(PRODUCTOS_API, action, FORM);

    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CONTENEDOR.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="p-sm-3 card rounded-4 shadow mb-3">
                    <div class="justify-content-center">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" width="250px" height="250px" alt="...">
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
                        <div class="container-title py-md-3 py-2">   
                            <p class="fw-bold">${row.nombre_producto}</p>
                            <p class="fw-light">Existencias actuales ${row.existencias}</p>
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
};

// Función para renderizar las estrellas de la puntuación
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

// Función para cargar el encabezado de la página
const fillEncabezado = (mascota) => {
    if (mascota == 'Perros' || mascota == 'Perro') {
        ENCABEZADO.innerHTML = `
                <div class="col-auto">
                    <img src="../../resources/img/png/dog_products.png" width="90px">
                </div>
                <div class="col-auto">
                    <h1 class="p-3 text-start">
                        Perros
                    </h1>
                </div>
    `;
    }
    else {
        ENCABEZADO.innerHTML = `
                <div class="col-auto">
                    <img src="../../resources/img/png/cat_products.png" width="90px">
                </div>
                <div class="col-auto">
                    <h1 class="p-3 text-start">
                        Gatos
                    </h1>
                </div>
    `;
    }
}


// Función para cargar la siguiente pantalla dependiendo de la categoria elegida
const navigateToPage = (idProducto) => {
    window.location.href = `../../views/public/producto.html?producto=${idProducto}&categoria=${CATEGORIA}&mascota=${MASCOTA}`;
};
