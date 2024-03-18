const navbar = `
<nav class="navbar navbar-expand-lg bg-beige-color fixed-top shadow">
    <div class="container-fluid">
        <a class="navbar-brand" href="../public/index.html">
            <img src="../../resources/img/png/huellitas_logo.png" width="50px">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/categorias_perro.html">Perros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/categorias_gatos.html">Gatos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/sobre_nosotros.html">¿Quiénes somos?</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/terminos_condiciones.html">Términos y condiciones</a>
                </li>
            </ul>
            <form class="d-flex me-md-5" role="search">
                <div class="search-input position-relative">
                    <input type="search" class="search form-control bg-beige-color ps-5" placeholder="Productos...">
                    <img src="../../resources/img/svg/search_public.svg"
                        class="position-absolute top-50 translate-middle-y search-icon" width="25px" height="25px">
                </div>
            </form>
            <div class="py-md-0 py-4">
                <a class="position-relative me-md-5 me-4" href="../../views/public/carrito_1.html">
                    <img src="../../resources/img/png/carrito_naranja.png" width="40px">
                    <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-orange-color">0</span>
                </a>
                <a href="../../views/public/login.html" class="btn btn-orange-color text-light me-md-5">Iniciar
                    sesión</a>
            </div>
        </div>
    </div>
</nav>
`;

document.addEventListener('DOMContentLoaded', () => {
document.getElementById('navbar').innerHTML = navbar;
});

const footer = `
<footer class="navbar sticky-bottom bg-yellow-color">
    <div class="container-fluid p-4 ">
        <div class="row mx-auto gx-4">
            <!-- Primera columna -->
            <div class="col-sm-6 col-md-3 text-center">
                <a href="../public/index.html">
                    <img src="../../resources/img/png/huellitas_logo.png" width="200px">
                </a>
                <div class="row d-flex justify-content-center">
                    <div class="col-auto">
                    <a href="https://www.facebook.com/?locale=es_LA target="_blank""><img src="../../resources/img/png/facebook.png" width="40px"></a>
                    </div>
                    <div class="col-auto">
                    <a href="https://www.instagram.com/huellitas_pets2024/" target="_blank"><img src="../../resources/img/png/instagram.png" width="40px"></a>
                    </div>
                </div>
                <div class="mt-3">
                    <p>huellitas_pet’s@gmail.com</p>
                    <p>+503 22319102</p>
                </div>
            </div>
            <!-- Segunda columna -->
            <div class="col-sm-6 col-md-2 mt-5">
                <h3 class="fw-semibold">Servicios</h3>
                <div class="mt-3">
                    <a class="text-decoration-none text-dark fw-light" href="../../views/public/categorias_perro.html">Categorías</a>
                </div>
                <div class="mt-2">
                    <a class="text-decoration-none text-dark fw-light" href="../../views/public/productos_perros_comida.html">Productos para perros</a>
                </div>
                <div class="mt-2">
                    <a class="text-decoration-none text-dark fw-light" href="../../views/public/productos_gatos_comida.html">Productos para gatos</a>
                </div>
                <div class="mt-2">
                    <a class="text-decoration-none text-dark fw-light">Cupones</a>
                </div>
            </div>
            <!-- Tercera columna -->
            <div class="col-sm-6 col-md-2 mt-5">
                <h3 class="fw-semibold">Sobre nosotros</h3>
                <div class="mt-3">
                    <a class="text-decoration-none text-dark fw-light" href="../../views/public/sobre_nosotros.html">¿Quiénes somos?</a>
                </div>
                <div class="mt-2">
                    <a class="text-decoration-none text-dark fw-light"
                        href="../../views/public/contactanos.html">Contáctanos</a>
                </div>
            </div>
            <!-- Cuarta columna -->
            <div class="col-sm-6 col-md-2 mt-5">
                <h3 class="fw-semibold">Privacidad</h3>
                <div class="mt-3">
                    <a class="text-decoration-none text-dark fw-light" href="../../views/public/terminos_condiciones.html">Términos y condiciones</a>
                </div>
            </div>
            <div class="col-sm-6 col-md-3 d-none d-sm-block">
                <img src="../../resources/img/png/cat_public.png" class="img-fluid">
            </div>
            <div class="text-center mt-5 mt-md-0">
                <p>© Copyrigth Huellitas pet’s 2024</p>
            </div>
        </div>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
document.getElementById('footer').innerHTML = footer;
});

const navbar_perfil=`
<nav class="navbar navbar-expand-lg bg-beige-color fixed-top shadow">
    <div class="container-fluid">
        <a class="navbar-brand" href="../public/index.html">
            <img src="../../resources/img/png/huellitas_logo.png" width="50px">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/categorias_perro.html">Perros</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/categorias_gatos.html">Gatos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/sobre_nosotros.html">¿Quiénes somos?</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="../../views/public/terminos_condiciones.html">Términos y condiciones</a>
                </li>
            </ul>
            <form class="d-flex me-md-5" role="search">
                <div class="search-input position-relative">
                    <input type="search" class="search form-control bg-beige-color ps-5" placeholder="Productos...">
                    <img src="../../resources/img/svg/search_public.svg"
                        class="position-absolute top-50 translate-middle-y search-icon" width="25px" height="25px">
                </div>
            </form>
            <div class="py-md-0 py-4">
                <a class="position-relative me-md-5 me-4" href="../../views/public/carrito_1.html">
                    <img src="../../resources/img/png/carrito_naranja.png" width="40px">
                    <span
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-orange-color">0</span>
                </a>
            </div>
            <div class="row">
                <div class="col-3">
                    <a href="../../views/public/login.html" class=" me-md-5"><img src="../../resources/img/svg/img_perfil_navbar.svg" alt=""></a>
                </div>
                <div class="col-6">
                    <div class="dropdown me-md-5">
                        <a class="nav-link dropdown-toggle me-md-3 py-3" href="#" data-bs-toggle="dropdown" aria-expanded="false">Juan</a>
                        <ul class="dropdown-menu nav_colores_perfil">
                            <li><a class="dropdown-item nav_bto_perfil" href="../../views/public/perfil.html">Perfil</a></li>
                            <li><a class="dropdown-item nav_bto_perfil" href="../../views/public/historial_compras.html" onclick="logOut()">Historial de compra</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item nav_bto_perfil" href="../../views/public/login.html" onclick="logOut()">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
`

document.addEventListener('DOMContentLoaded', () => {
document.getElementById('navbar_perfil').innerHTML = navbar_perfil;
});

/*
// Función para cambiar el navbar al navbar original
function restaurarNavbarOriginal() {
    document.getElementById('navbar').innerHTML = navbar;
    // Guardar el estado del menú en el almacenamiento local
    localStorage.setItem('menuState', 'original');
}

// Función para cambiar el navbar al navbar de perfil
function cambiarNavbarPerfil() {
    document.getElementById('navbar').innerHTML = navbar_perfil;
    // Guardar el estado del menú en el almacenamiento local
    localStorage.setItem('menuState', 'perfil');
}

// Verificar y cargar el estado del menú al cargar la página
window.addEventListener('load', function() {
    const menuState = localStorage.getItem('menuState');
    if (menuState === 'original' ) {
        cambiarNavbarPerfil();
    } else if (menuState === 'perfil') {
        restaurarNavbarOriginal();
    }
});*/