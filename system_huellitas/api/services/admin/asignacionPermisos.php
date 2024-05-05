<?php

require_once ('../../models/data/asignacionPermisos_data.php');

session_start();

$asignacionPermisos = new AsignacionPermisosData();

$result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

if(isset($_SESSION['idAdministrador'])){
    switch($_GET['action']){
        case 'createRow':
            $_POST = Validator::validateForm($_POST);
            if(
                !$asignacionPermisos->setIdPermiso($_POST['idPermiso']) or
                !$asignacionPermisos->setIdAdmin($_POST['idAdministrador'])
            ) {
                $result['error'] = $asignacionPermisos->getDataError();
            } elseif ($asignacionPermisos->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Asignación de permiso ingresado correctamente';
            } else{
                $result['error'] = 'Ocurrio un problema al asignar el permiso';
            }
            break;
        case 'updateRow':
            $_POST = Validator::validateForm($_POST);
            if (
                !$asignacionPermisos->setIdAsignacionPermiso($_POST['idAsignacionPermiso']) or
                !$asignacionPermisos->setIdPermiso($_POST['idPermiso']) or
                !$asignacionPermisos->setIdAdmin($_POST['idAdministrador'])
            ){
                $result['error'] = $asignacionPermisos->getDataError();
            } elseif ($asignacionPermisos -> updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Permiso actualizado actualizado correctamente';
            } else{
                $result['error'] = 'Ocurrió un problema al actualizar el permiso';
            }
            break;
        case 'readAll':
            if($result['dataset'] = $asignacionPermisos->readAll()){
                $result['status'] = 1;
                $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
            } else{
                $result['error'] = 'No existen asignaciones de permisos';
            }
            break;
        case 'readOneByAdminId':
            if (!$asignacionPermisos->setIdAdmin($_POST['idAdministrador'])) {
                $result['error'] = $asignacionPermisos->getDataError();
            } elseif ($result['dataset'] = $asignacionPermisos->readOneByAdminId()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Este usuario aún no tiene permisos';
            }
            break;
        case 'readOneByPermisoId':
            if (!$asignacionPermisos->setIdAsignacionPermiso($_POST['idAsignacionPermiso'])) {
                $result['error'] = $asignacionPermisos->getDataError();
            } elseif ($result['dataset'] = $asignacionPermisos->readOneByPermisoId()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Este usuario aún no tiene permisos';
            }
            break;
        case 'deleteRow':
            if(!$asignacionPermisos->setIdAdmin($_POST['idAsignacionPermiso'])){
                $result['error'] = $asignacionPermisos->getDataError();
            } elseif ($asignacionPermisos->deleteRow()){
                $result['status'] = 1;
                $result['message'] = 'Permiso asignado eliminado correctamente';
            } else{
                $result['error'] = 'Ocurrio un problema al eliminar el permiso asignado';
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