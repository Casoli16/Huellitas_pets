<?php

require_once('../../models/data/productos_data.php');

session_start();

$productos = new productosData;

$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

if(isset($_SESSION['idAdministrador']) or true){
    switch($_GET['action']){
        case 'readAll':
            if($result['dataset'] = $productos->readAll()){
               $result['status'] = 1;
               $result['message'] = 'Exisrten' . count($result['dataset']) . 'registros'; 
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
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));    $result['Exception'] = Database::getException();
}