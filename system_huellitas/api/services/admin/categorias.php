<?php

require_once('../../models/data/categorias_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
session_start();

$categorias = new CategoriasData;

$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

if(isset($_SESSION['idAdministrador']) or true){
    switch($_GET['action']){
        case 'searchRows':
            if (!Validator::validateSearch($_POST['search'])){
                $result['error'] = Validator::getSearchError();
            } elseif ($result['dataset'] = $categorias->searchRows()){
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } else{
                $result['error'] = 'No hay coincidencias';
            }
            break;
        case 'createRow':
            $_POST = Validator::validateForm($_POST);
            if(
                !$categorias->setNombreCategoria($_POST['nombreCategoria']) or
                !$categorias->setDescripcionCategoria($_POST['descripcionCategoria']) or
                !$categorias->setImagenCategoria($_FILES['imagenCategoria'])
            ) {
                $result['error'] = $categorias->getDataError();
            } elseif ($categorias->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Marca ingresado correctamente';
                $result['fileStatus'] = Validator::saveFile($_FILES['imagenCategoria'], $categorias::RUTA_IMAGEN, $categorias->getFilename());
            } else{
                $result['error'] = 'Ocurrio un problema al ingresar el producto';
            }
            break;
        case 'updateRow':
            $_POST = Validator::validateForm($_POST);
            if (
                !$categorias->setIdCategoria($_POST['idCategoria']) or
                !$categorias->setNombreCategoria($_POST['nombreCategoria']) or
                !$categorias->setDescripcionCategoria($_POST['descripcionCategoria']) or
                !$categorias->setImagenCategoria($_FILES['imagenCategoria'])
            ){
                $result['error'] = $categorias->getDataError();
            } elseif ($categorias -> updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Marca actualizado correctamente';
                $result['fileStatus'] = Validator::saveFile($_FILES['imagenCategoria'], $categorias::RUTA_IMAGEN, $categorias->getFilename());
            } else{
                $result['error'] = 'Ocurrió un problema al actualizar el producto';
            }
            break;
        case 'readAll':
            if($result['dataset'] = $categorias->readAll()){
                $result['status'] = 1;
                $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
            } else{
                $result['error'] = 'No existen marcas registrados';
            }
            break;
        case 'readOne':
            if (!$categorias->setIdCategoria($_POST['idCategoria'])) {
                $result['error'] = $categorias->getDataError();
            } elseif ($result['dataset'] = $categorias->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Categoria inexistente';
            }
            break;
        case 'deleteRow':
            if(!$categorias->setIdCategoria($_POST['idCategoria'])){
                $result['error'] = $categorias->getDataError();
            } elseif ($categorias->deleteRow()){
                $result['status'] = 1;
                $result['message'] = 'Marca eliminado correctamente';
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
} else {
    print(json_encode('Recurso no disponible'));
}
