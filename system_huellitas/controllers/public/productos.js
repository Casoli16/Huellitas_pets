const PRODUCTOS_API = 'services/public/productos.php';

// ELEMENTOS DE LA PÁGINA
const CONTENEDOR = document.getElementById('contenedorinformacion'),
    TITULO_PAGINA = document.getElementById('titulo');

// Variable para saber en qué página estamos
const PARAMS = new URLSearchParams(window.location.search);
//Guarda en una variable el parametro obtenido
const CATEGORIA = PARAMS.get("categoria");
const MASCOTA = PARAMS.get("mascota");
const IDPRODUCTO = PARAMS.get("producto");

// Función que se carga cuando se abre la página
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    fillConteiner(IDPRODUCTO);

});

// Función para cargar la información del producto
const fillConteiner = async (id) => {
    CONTENEDOR.innerHTML = '';
    const FORM = new FormData();
    FORM.append('idProducto', id);
    const DATA = await fetchData(PRODUCTOS_API, 'readOneProduct', FORM);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TITULO_PAGINA.innerHTML = `Huellitas pets - ${row.nombre_producto}`;
            CONTENEDOR.innerHTML += `
            <div class="row">
                        <div class="col-sm-12 col-md-12 col-lg-3 px-2 align-items-center mb-6">
                            <img class="img-fluid" alt="${row.nombre_producto}" src="${SERVER_URL}images/productos/${row.imagen_producto}">
                        </div>
                        <div class="div-sm-12 col-md-12 col-lg-9 py-3">
                            <!--Aqui esta la información del producto, nombre, marca, precio, descripcion, sección-->
                            <h2 class="fw-bold">${row.nombre_producto}</h2>
                            <p class="fs-6 fw-light">${row.nombre_marca}</p>
                            <h2 class="fw-bold py-2">$${row.precio_producto}</h2>
                            <p class="fs-5 fw-semibold mb-2">Descripción</p>
                            <p class="fs-6">${row.descripcion_producto}</p>
                            <div class="bg-orange-color text-light col-12 col-md-3 text-center rounded-3 p-1">
                                ${row.nombre_categoria}</div>
                        </div>
                        <!--Aqui estan los divs para ajustar el contenido y que siempre permanezaca con 7 espacios a la derecha en lg-->
                        <div class="col-lg-2 col-sm-0 col-md-0"></div>
                        <div class="col-lg-2 col-sm-0 col-md-0"></div>
                        <div class="col-lg-2 col-sm-0 col-md-0"></div>
                        <div class="col-lg-1 col-sm-0 col-md-0"></div>
                        <!--Aqui va la cantidad de unidades que comprará de este producto-->
                        <div class="row d-flex align-items-center justify-content-end gy-2">
                            <div class="col-sm-12 col-md-4 col-lg-2 align-items-end">
                                <div class="contador d-flex justify-content-between rounded-5 shadow">
                                    <button class="btn mas text-red-color fw-bolder" onclick="restar()">-</button>
                                    <input type="number" value="1" id="cantidad" min="1" max="${row.existencia_producto}"
                                        class="form-control text-center sin-barra bg-white">
                                    <button class="btn menos text-red-color fw-bolder" onclick="sumar(${row.existencia_producto})">+</button>
                                </div>
                            </div>
                            <!--Boton para añadir el producto al carrito-->
                            <div class="col-sm-12 col-md-8 col-lg-3 px-2 align-items-start ">
                                <button class="buton d-flex">
                                    <a href="../public/carrito_1.html"
                                        class="btn btn-orange-color text-light me-md-5 d-flex align-items-center py-2 btn-small rounded-3">

                                        <div class="col-auto d-none d-sm-block">
                                            <img src="../../resources/img/svg/carro_redondo.svg" width="40px">
                                        </div>
                                        <div class="col-auto">
                                            Añadir al carrito
                                        </div>
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-8 col-lg-12 mt-3">
                            <div class="row align-items-center">
                                <!-- Agrega la clase align-items-center para alinear verticalmente -->
                                <div class="col-1 text-end d-none d-sm-block d-md-block">
                                    <!-- Utiliza las clases d-none y d-sm-block para ocultar la imagen en pantallas pequeñas -->
                                    <img src="../../resources/img/png/icono_codigo.png" class="imgcodigo img-fluid">
                                </div>
                                <div class="col-11 text-start">
                                    <p class="font-smallest fw-semibold mb-0">
                                        ¿Tienes un cupón de descuento?
                                    </p>
                                    <span class="fst-normal text-black">Podrás añadirlo en la parte de abajo</span>
                                    <!-- Usa un span para el texto secundario -->
                                </div>
                            </div>
                        </div>
                        <div class="col-12 py-3 ">
                            <div class="row align-items-start">
                                <div class="col-lg-7 col-md-7 col-sm-7">
                                    <div class="mb-3">
                                        <input type="text" placeholder="Escribe el código de tu cupón" name="text"
                                            class="input form-control">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-5 col-sm-5 text-start d-flex">
                                    <button class="buttonn">
                                        <img src="../../resources/img/png/enviar_codigo.png" class="img-fluid"
                                            style="max-width: 35px;">
                                        <!-- Ajusta el tamaño máximo del icono -->
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </div>
            `;
        });
    } else {
        sweetAlert(3, DATA.error, true);
    }
};

const sumar = (existencia) => {
    let cantidad = parseInt(document.getElementById('cantidad').value);
    if (cantidad < existencia) {
        cantidad++;
        document.getElementById('cantidad').value = cantidad;
    }
};

const restar = () => {
    let cantidad = parseInt(document.getElementById('cantidad').value);
    if (cantidad > 1) {
        cantidad--;
        document.getElementById('cantidad').value = cantidad;
    }
}

const volver = () => {
    window.location.href = `../../views/public/productos_categoria.html?categoria=${CATEGORIA}&mascota=${MASCOTA}`;
};
/*
// Código de Francisco para las estrellas
const stars = document.querySelectorAll('.star');

stars.forEach(function(star, producto){
    star.addEventListener('click', function(){
        for (let i=0; i<=producto; i++){
            stars[i].classList.add('checked');
        }  
        for (let i=producto+1; i<stars.length; i++){
            stars[i].classList.remove('checked');
        }        
    })
})
*/ 