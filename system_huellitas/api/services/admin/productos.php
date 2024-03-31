<?php

require_once('../../models/data/productos_data.php');

session_start();

$productos = new productosData;

$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

if(isset($_SESSION['idAdministrador']) or true){
    switch($_GET['action']){
        case 'searchRows':
            if (!Validator::validateSearch($_POST['search'])){
                $result['error'] = Validator::getSearchError();
            } elseif ($result['dataset'] = $productos->searchRows()){
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } else{
                $result['error'] = 'No hay coincidencias';
            }
            break;
        case 'createRow':
            $_POST = Validator::validateForm($_POST);
            if(
                !$productos->setNombreProducto($_POST['nombreProducto']) or
                !$productos->setDescripcionProducto($_POST['descripcionProducto']) or
                !$productos->setPrecioProducto($_POST['precioProducto']) or
                !$productos->setImagenProducto($_POST['imagenProducto'])or
                !$productos->setEstadoProducto($_POST['estadoProducto']) or
                !$productos->setExistenciaProducto($_POST['existenciaProducto']) or
                !$productos->setFechaRegistro($_POST['fechaRegistroProducto']) or
                !$productos->setMascotas($_POST['mascotas']) or
                !$productos->setIdCategoria($_POST['idCategoria']) or
                !$productos->setIdMarca($_POST['idMarca'])
            ) {
                $result['error'] = $productos->getDataError();
            } elseif ($productos->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Producto ingresado correctamente';
            } else{
                $result['error'] = 'Ocurrio un problema al ingresar el producto';
            }
            break;
        case 'updateRow':
            $_POST = Validator::validateForm($_POST);
            if (
                !$productos->setIdProducto($_POST['idProducto']) or
                !$productos->setNombreProducto($_POST['nombreProducto']) or
                !$productos->setDescripcionProducto($_POST['descripcionProducto']) or
                !$productos->setPrecioProducto($_POST['precioProducto']) or
                !$productos->setImagenProducto($_POST['imagenProducto'])or
                !$productos->setEstadoProducto($_POST['estadoProducto']) or
                !$productos->setExistenciaProducto($_POST['existenciaProducto']) or
                !$productos->setFechaRegistro($_POST['fechaRegistroProducto']) or
                !$productos->setMascotas($_POST['mascotas']) or
                !$productos->setIdCategoria($_POST['idCategoria']) or
                !$productos->setIdMarca($_POST['idMarca'])
            ){
                $result['error'] = $productos->getDataError();
            } elseif ($productos -> updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Producto actualizado correctamente';
            } else{
                $result['error'] = 'Ocurrió un problema al actualizar el producto';
            }
            break;
        case 'readAll':
            if($result['dataset'] = $productos->readAll()){
               $result['status'] = 1;
               $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
            } else{
                $result['error'] = 'No existen productos registrados';
            }
            break;
        case 'readOne':
            if (!$productos->setIdProducto($_POST['idProducto'])) {
                $result['error'] = $productos->getDataError();
            } elseif ($result['dataset'] = $productos->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Producto inexistente';
            }
            break;
        case 'deleteRow':
            if(!$productos->setIdProducto($_POST['idProducto'])){
                $result['error'] = $productos->getDataError();
            } elseif ($productos->deleteRow()){
                $result['status'] = 1;
                $result['message'] = 'Producto eliminado correctamente';
            } else{
                $result['error'] = 'Ocurrio un problema al eliminar el producto';
            }
            break;
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));    $result['Exception'] = Database::getException();
}