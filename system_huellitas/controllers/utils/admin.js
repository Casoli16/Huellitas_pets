// Controlador de uso general en las paginas web del sitio privador
// Maneja la plantilla del encabezado del documento.

const USER_API = 'services/admin/admins.php'
const PERMISOS_API = 'services/admin/permisos.php'
const MAIN = document.querySelector('main');
//Constante para estableces el elemento del titulo principal.
const MAIN_TITLE = document.getElementById('mainTitle');

const FORM = new FormData(localStorage.getItem('idadmin'));
const DATA = await fetchData(PERMISOS_API, 'readOneAdmin', FORM)

console.log(DATA);
const navbar = `
<nav class="navbar bg-skin-color fixed-top sticky-sm-top">
    <div class="container-fluid ">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="row">
            <div class="col-3">
                <img src="../../resources/img/png/huellitas_logo.png" width="40">
            </div>
            <div class="col">
                <a class="navbar-brand" href="../../views/admin/dashboard.html">Huellitas Pet's</a>
            </div>
        </div>
        <div class="offcanvas offcanvas-start bg-skin-color" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <img src="../../resources/img/png/huellitas_logo.png" width="60px">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Huellitas Pet's</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <div class="row mt-4">
                        <div class="col-2">
                            <img src="../../resources/img/svg/dashoboard.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/dashboard.html">Dashboard</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/admins.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_admin.html">Administradores</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/products.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/menu_productos.html">Productos</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/categories.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_categorias.html">Categorías</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/orders.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_pedidos.html">Pedidos</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/comments.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_comentarios.html">Comentarios</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/brand.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_marcas.html">Marcas</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/voucher.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_cupones.html">Cupones</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/clients.svg" alt="">
                        </div>
                        <div class="col-2 mb-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_clientes.html">Clientes</a>
                            </li>
                        </div>
                    </div>
                    <hr>

                    <div class="row mt-3">
                        <div class="col-2">
                            <img src="../../resources/img/svg/permisos.svg" alt="">
                        </div>
                        <div class="col">
                            <li class="col-2">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/scrud_permisos.html">Permisos</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <img src="../../resources/img/svg/settings.svg" alt="">
                        </div>
                        <div class="col-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/settings.html">Ajustes</a>
                            </li>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-auto">
                            <img src="../../resources/img/svg/close_sesion.svg" alt="">
                        </div>
                        <div class="col-auto">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page"
                                    href="../../views/admin/index.html">Cerrar sesión</a>
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</nav>
`;

document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.endsWith('index.html')) {
        document.getElementById('navbar').innerHTML = navbar;
    }
});