<?php
// Se incluye la clase del modelo.
require_once('../../models/data/productos_data.php');
// Se incluye la clase de modelo de valoraciones.
require_once('../../models/data/valoraciones_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();

    // Se instancia la clase correspondiente.
    $productos = new productosData;
    // Se agrega la clase de valoraciones
    $valoraciones = new ValoracionesData;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            // Método que permite leer marcas de productos.
            case 'readMarcas':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneMarcas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            // Método que permite leer categorías de productos.
            case 'readCategorias':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneCategorias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            // Método que permite leer los productos en base a una marca.
            case 'readProductsByMarca':
                if (!$productos->setMarca($_POST['condition']) or
                    !$productos->setMascotas($_POST['mascota'])
                    ) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneMarca()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            // Método que permite leer los productos en base a una categoría.
            case 'readProductsByCategoria':
                if (!$productos->setCategoria($_POST['condition'])or
                    !$productos->setMascotas($_POST['mascota'])
                ) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            // Método que permite leer un producto dependiendo de la mascota que se pase. (Perro o gato)
            case 'readSpecificProduct':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readEspecificProducts()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Aún no hay productos registrados';
                }
                break;
            case 'readCuponDisponible':
                if (!$productos->setCodigo($_POST['cupon']) or
                    !$productos->setIdCliente($_SESSION['idCliente'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneCupon()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cupón no disponible o no encontrado';
                    $result['status'] = 2;
                }
                break;
            case 'readOneProduct':
                if (!$productos->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneProduct()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            //Metódo que permite editar la información del admin que se ha logueado.    
            case 'createValoracion':
                $_POST = Validator::validateForm($_POST);
                // Verificar si el cliente ha comprado el producto antes de permitir la valoración
                if (!$valoraciones->setIdCliente($_SESSION['idCliente']) || !$valoraciones->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = 'Datos inválidos';
                } elseif ($valoraciones->readCountValoracion() == 0) {
                    $result['error'] = 'No puedes valorar este producto porque no lo has comprado';
                } elseif (
                    !$valoraciones->setCalificaionValoracion($_POST['calificacionValoracion']) ||
                    !$valoraciones->setComentarioValoracion($_POST['comentarioValoracion'])
                ) {
                    $result['error'] = $valoraciones->getDataError();
                } elseif ($valoraciones->createValoracion()) {
                    $result['status'] = 1;
                    $result['message'] = 'Valoración agregada';
                } else {
                    $result['error'] = 'Ocurrió un problema al guardar la valoración';
                }
                break;
            case 'readComentarios':
                if (!$valoraciones->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $valoraciones->getDataError();
                } elseif ($result['dataset'] = $valoraciones->readComentarios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Este producto no ha sido comentado';
                }
                break;
            case 'searchProducts':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $productos->searchProducts()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible';
                break;
        }
    } else {
        switch ($_GET['action']) {
            // Método que permite leer marcas de productos.
            case 'readMarcas':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneMarcas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            // Método que permite leer categorías de productos.
            case 'readCategorias':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneCategorias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
             // Método que permite leer los productos en base a una marca.
             case 'readProductsByMarca':
                if (!$productos->setMarca($_POST['condition']) or
                    !$productos->setMascotas($_POST['mascota'])
                    ) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneMarca()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            // Método que permite leer los productos en base a una categoría.
            case 'readProductsByCategoria':
                if (!$productos->setCategoria($_POST['condition'])or
                    !$productos->setMascotas($_POST['mascota'])
                ) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
            // Método que permite leer un producto dependiendo de la mascota que se pase. (Perro o gato)
            case 'readSpecificProduct':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readEspecificProducts()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Aún no hay productos registrados';
                }
                break;
            case 'readOneProduct':
                if (!$productos->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneProduct()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            case 'readComentarios':
                if (!$valoraciones->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $valoraciones->getDataError();
                } elseif ($result['dataset'] = $valoraciones->readComentarios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Este producto no ha sido comentado';
                }
                break;
            case 'searchProducts':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $productos->searchProducts()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible';
                break;
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}