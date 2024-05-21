// Controlador de uso general en las paginas web del sitio privador
// Maneja la plantilla del encabezado del documento.

const USER_API = 'services/admin/generalidades.php'

// Permite manenajar los permisos del usuario logueado
const permisos = JSON.parse(localStorage.getItem('dataset'));
const navbar = `
<nav class="navbar bg-skin-color fixed-top ">
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
                    <div class="row mt-2 ${(permisos['ver_usuario']) ? '' : 'd-none'}">
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
                    <div class="row mt-2 ${(permisos['ver_producto']) ? '' : 'd-none'}">
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
                    <div class="row mt-2 ${(permisos['ver_categoria']) ? '' : 'd-none'}">
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
                    <div class="row mt-2 ${(permisos['ver_pedido']) ? '' : 'd-none'}">
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
                    <div class="row mt-2 ${(permisos['ver_comentario']) ? '' : 'd-none'}">
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
                    <div class="row mt-2 ${(permisos['ver_marca']) ? '' : 'd-none'}">
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
                    <div class="row mt-2 ${(permisos['ver_cupon']) ? '' : 'd-none'}">
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
                    <div class="row mt-2 ${(permisos['ver_cliente']) ? '' : 'd-none'}">
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

                    <div class="row mt-3 ${(permisos['ver_permiso']) ? '' : 'd-none'}">
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
                                <a class="nav-link active" aria-current="page" onclick="logOut()">Cerrar sesión</a>
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</nav>
`;

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (DATA.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            document.getElementById('navbar').innerHTML = navbar;

        } else {
            sweetAlert(3, DATA.error, false, 'index.html');
        }
    } else {
        if (location.pathname.endsWith('index.html')) {
            console.log('index.html')
        } else {
            location.href = 'index.html'
        }
    }
}
