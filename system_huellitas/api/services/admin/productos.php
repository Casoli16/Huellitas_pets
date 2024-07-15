<?php
// Se incluye la clase del modelo.
require_once('../../models/data/productos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();

     // Se instancia la clase correspondiente.
    $productos = new productosData;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

     // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_producto'] == 1) or true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            //Metódo que permite buscar un registro.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $productos->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            //Metódo que permite crear un producto
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$productos->setNombreProducto($_POST['nombreProducto']) or
                    !$productos->setDescripcionProducto($_POST['descripcionProducto']) or
                    !$productos->setPrecioProducto($_POST['precioProducto']) or
                    !$productos->setImagenProducto($_FILES['imagenProducto']) or
                    !$productos->setEstadoProducto($_POST['estadoProducto']) or
                    !$productos->setExistenciaProducto($_POST['existenciaProducto']) or
                    !$productos->setMascotas($_POST['mascotasProducto']) or
                    !$productos->setIdCategoria($_POST['idCategoria']) or
                    !$productos->setIdMarca($_POST['idMarca'])
                ) {
                    $result['error'] = $productos->getDataError();
                } elseif ($productos->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto ingresado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenProducto'], $productos::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al ingresar el producto';
                }
                break;
                //Metódo que permite actualizar un producto
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$productos->setIdProducto($_POST['idProducto']) or
                    !$productos->setFilename() or
                    !$productos->setNombreProducto($_POST['nombreProducto']) or
                    !$productos->setDescripcionProducto($_POST['descripcionProducto']) or
                    !$productos->setPrecioProducto($_POST['precioProducto']) or
                    !$productos->setImagenProducto($_FILES['imagenProducto'], $productos->getFilename()) or
                    !$productos->setEstadoProducto($_POST['estadoProducto']) or
                    !$productos->setExistenciaProducto($_POST['existenciaProducto']) or
                    !$productos->setMascotas($_POST['mascotasProducto']) or
                    !$productos->setIdCategoria($_POST['idCategoria']) or
                    !$productos->setIdMarca($_POST['idMarca'])
                ) {
                    $result['error'] = $productos->getDataError();
                } elseif ($productos->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto actualizado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenProducto'], $productos::RUTA_IMAGEN, $productos->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el producto';
                }
                break;
                //Metódo que permite leer todos los productos registrados en la base de datos
            case 'readAll':
                if ($result['dataset'] = $productos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
                } else {
                    $result['error'] = 'No existen productos registrados';
                }
                break;
                //Metódo que permite leer un producto en específico
            case 'readOne':
                if (!$productos->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
                //Metódo que permite traer el producto más vendido.
            case 'readTopProduct':
                if ($result['dataset'] = $productos->readTopProduct()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petición exitosa';
                } else {
                    $result['error'] = 'Ocurrió un error al mostrar el producto más vendido.';
                }
                break;
                //Metódo que permite leer un producto dependiendo de la mascota que se pase. (Perro o gato)
            case 'readSpecificProduct':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readEspecificProducts()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Aún no hay productos registrados';
                }
                break;
                //Metódo que permite leer un producto en específico por medio de idProducto
            case 'readSpecificProductById':
                if (!$productos->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readEspecificProductsById()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se encuentra la información de este producto';
                }
                break;
                //Metódo que permite eliminar el producto
            case 'deleteRow':
                if (!$productos->setIdProducto($_POST['idProducto']) or !$productos->setFilename()) {
                    $result['error'] = $productos->getDataError();
                } elseif ($productos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($productos::RUTA_IMAGEN, $productos->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el producto';
                }
                break;
            //Metódo que permite leer el top 5 de productos más vendidos por mes, se debe pasar un dato de este tipo [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12], 
            // O sea no un arreglo pero era pa que se entediera perro
            // Esto entrega los siguientes campos: nombre_mes, cantidad_compras
            case 'Top5ProductosPorMes':
                if ($result['dataset'] = $productos->Top5ProductosPorMes()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petición exitosa';
                } else {
                    $result['error'] = 'No tienes ventas, no podemos mostrarte nada.';
                }
                break;
                default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
        $result['Exception'] = Database::getException();
    }
} else {
    print(json_encode('Recurso no disponible'));
}
