const navbar = `
<nav class="navbar navbar-expand-lg bg-beige-color fixed-top shadow">
<div class="container-fluid">
    <a class="navbar-brand" href="../public/home.html">
        <img src="../../resources/img/png/huellitas_logo.png" width="50px">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Perros</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Gatos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">¿Quiénes somos?</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Términos y condiciones</a>
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
            <a class="navbar-brand me-md-5" href="">
                <img src="../../resources/img/png/carrito_naranja.png" width="40px">
            </a>
            <a href="../../views/public/index.html" class="btn btn-orange-color text-light me-md-5">Iniciar sesión</a>
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
                <a href="../public/home.html">
                    <img src="../../resources/img/png/huellitas_logo.png" width="200px">
                </a>
            <div class="row d-flex justify-content-center">
                <div class="col-auto">
                    <img src="../../resources/img/png/facebook.png" width="40px">
                </div>
                <div class="col-auto">
                    <img src="../../resources/img/png/instagram.png" width="40px">
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
                <a class="text-decoration-none text-dark fw-light" href="">Categorías</a>    
            </div>
            <div class="mt-2">
                <a class="text-decoration-none text-dark fw-light" href="">Productos para perros</a>
            </div>
            <div class="mt-2">
                <a class="text-decoration-none text-dark fw-light" href="">Productos para gatos</a>
            </div>
            <div class="mt-2">
                <a class="text-decoration-none text-dark fw-light" href="">Cupones</a>
            </div>
        </div>
        <!-- Tercera columna -->
        <div class="col-sm-6 col-md-2 mt-5">
            <h3 class="fw-semibold">Sobre nosotros</h3>
            <div class="mt-3">
                <a class="text-decoration-none text-dark fw-light" href="">¿Quiénes somos?</a>    
            </div>
            <div class="mt-2">
                <a class="text-decoration-none text-dark fw-light" href="../../views/public/contactanos.html">Contáctanos</a>
            </div>
        </div>
        <!-- Cuarta columna -->
        <div class="col-sm-6 col-md-2 mt-5">
            <h3 class="fw-semibold">Privacidad</h3>
            <div class="mt-3">
                <a class="text-decoration-none text-dark fw-light" href="">Términos y condiciones</a>    
            </div>
        </div>
        <div class="col-sm-6 col-md-3 d-none d-sm-block">
            <img src="../../resources/img/png/cat_public.png" class= "img-fluid">
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