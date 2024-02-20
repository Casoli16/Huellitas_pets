const navbar = `
    <nav class="navbar bg-skin-color fixed-top">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-start bg-skin-color" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <img src="../../resources/img/png/huellitas_logo.png" width="60px">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Huellitas Pet's</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <form class="d-flex mt-3" role="search">
                        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
                        <button class="btn btn-orange-color text-light" type="submit">Buscar</button>
                    </form>
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <div class="row mt-4">
                            <div class="col-2">
                                <img src="../../resources/img/svg/dashoboard.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/admins.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Administradores</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/products.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Productos</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/categories.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Categorías</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/orders.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Pedidos</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/comments.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Comentarios</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/brand.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Marcas</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/voucher.svg" alt="">
                            </div>
                            <div class="col-2 mb-3">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Cupones</a>
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
                                    <a class="nav-link active" aria-current="page" href="#">Permisos</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-2">
                                <img src="../../resources/img/svg/settings.svg" alt="">
                            </div>
                            <div class="col-2">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Ajustes</a>
                                </li>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-auto">
                                <img src="../../resources/img/svg/close_sesion.svg" alt="">
                            </div>
                            <div class="col-auto">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Cerrar sesión</a>
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
    document.getElementById('navbar').innerHTML = navbar;
});