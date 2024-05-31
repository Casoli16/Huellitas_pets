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
    if (isset($_SESSION['idCliente']) or true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
                //Metódo que permite leer marcas de productos.
            case 'readMarcas':
                if (!$productos->setMascotas($_POST['mascota'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneMarcas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
                //Metódo que permite leer categorias de productos.
                case 'readCategorias':
                    if (!$productos->setMascotas($_POST['mascota'])) {
                        $result['error'] = $productos->getDataError();
                    } elseif ($result['dataset'] = $productos->readOneCategorias()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Producto inexistente';
                    }
                    break;
                //Metódo que permite leer los productos en base a una marca.
                case 'readProductsByMarca':
                    if (!$productos->setMarca($_POST['condition'])) {
                        $result['error'] = $productos->getDataError();
                    } elseif ($result['dataset'] = $productos->readOneMarca()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Producto inexistente';
                    }
                    break;
                    //Metódo que permite leer los productos en base a una categoria.
                case 'readProductsByCategoria':
                    if (!$productos->setCategoria($_POST['condition'])) {
                        $result['error'] = $productos->getDataError();
                    } elseif ($result['dataset'] = $productos->readOneCategoria()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Producto inexistente';
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
            case 'readOneProduct':
                if (!$productos->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $productos->getDataError();
                } elseif ($result['dataset'] = $productos->readOneProduct()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
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
