<?php

require_once ('../../models/data/admin_data.php');

session_start();

$administradores = new adminData();

$result = array('status' => 0, 'message => null', 'dataset'=> null, 'error'=> null, 'exception' => null, 'fileStatus' => null);

if(isset($_SESSION['idAdministrador']) or true){
    switch($_GET['action']){
        case 'searchRows':
            if (!Validator::validateSearch($_POST['search'])){
                $result['error'] = Validator::getSearchError();
            } elseif ($result['dataset'] = $administradores->searchRows()){
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } else{
                $result['error'] = 'No hay coincidencias';
            }
            break;
        case 'createRow':
            $_POST = Validator::validateForm($_POST);
            if(
                !$administradores->setNombreAdmin($_POST['nombreAdmin']) or
                !$administradores->setApellidoAdmin($_POST['apellidoAdmin']) or
                !$administradores->setCorreoAdmin($_POST['correoAdmin']) or
                !$administradores->setAliasAdmin($_POST['aliasAdmin'])or
                !$administradores->setClaveAdmin($_POST['claveAdmin']) or
                !$administradores->setFechaRegistro($_POST['fechaRegistroAdmin']) or
                !$administradores->setImagenAdmin($_POST['imagenAdmin'])
            ) {
                $result['error'] = $administradores->getDataError();
            } elseif ($administradores->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Administrador ingresado correctamente';
            } else{
                $result['error'] = 'Ocurrio un problema al ingresar al administrador';
            }
            break;
        case 'updateRow':
            $_POST = Validator::validateForm($_POST);
            if (
                !$administradores->setIdAdmin($_POST['idAdministrador']) or
                !$administradores->setNombreAdmin($_POST['nombreAdmin']) or
                !$administradores->setApellidoAdmin($_POST['apellidoAdmin']) or
                !$administradores->setCorreoAdmin($_POST['correoAdmin']) or
                !$administradores->setAliasAdmin($_POST['aliasAdmin'])or
                !$administradores->setClaveAdmin($_POST['claveAdmin']) or
                !$administradores->setFechaRegistro($_POST['fechaRegistroAdmin']) or
                !$administradores->setImagenAdmin($_POST['imagenAdmin'])
            ){
                $result['error'] = $administradores->getDataError();
            } elseif ($administradores -> updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Administrador actualizado correctamente';
            } else{
                $result['error'] = 'Ocurrió un problema al actualizar el administrador';
            }
            break;
        case 'readAll':
            if($result['dataset'] = $administradores->readAll()){
                $result['status'] = 1;
                $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
            } else{
                $result['error'] = 'No existen administradores registrados';
            }
            break;
        case 'readOne':
            if (!$administradores->setIdAdmin($_POST['idAdministrador'])) {
                $result['error'] = $administradores->getDataError();
            } elseif ($result['dataset'] = $administradores->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'El administrador no existe';
            }
            break;
        case 'deleteRow':
            if(!$administradores->setIdAdmin($_POST['idAdministrador'])){
                $result['error'] = $administradores->getDataError();
            } elseif ($administradores->deleteRow()){
                $result['status'] = 1;
                $result['message'] = 'Administrador eliminado correctamente';
            } else{
                $result['error'] = 'Ocurrio un problema al eliminar al administrador';
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