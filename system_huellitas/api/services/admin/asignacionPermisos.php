<?php

//Importamos la ruta de nuestro Data.
require_once('../../models/data/asignacionPermisos_data.php');

if (isset($_GET['action'])) {
    session_start();

    //Creamos la instancia de asignacionPermisosData
    $asignacionPermisos = new AsignacionPermisosData();

    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    //Verifica si ya hay una sesión iniciada y si cuenta con los permisos para ver este servicio.
    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_usuario'] == 1)) {
        switch ($_GET['action']) {
            //Metódo que permite asignar los permisos a un admin, para ello se necesita pasar el idPermiso y idAdministrador
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$asignacionPermisos->setIdPermiso($_POST['idPermiso']) or
                    !$asignacionPermisos->setIdAdmin($_POST['idAdministrador'])
                ) {
                    $result['error'] = $asignacionPermisos->getDataError();
                } elseif ($asignacionPermisos->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso asignado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al asignar el permiso';
                }
                break;
            //Metódo que permite actualizar los permisos que se le han asignado a un admin    
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$asignacionPermisos->setIdAsignacionPermiso($_POST['idAsignacionPermiso']) or
                    !$asignacionPermisos->setIdPermiso($_POST['idPermiso']) or
                    !$asignacionPermisos->setIdAdmin($_POST['idAdministrador'])
                ) {
                    $result['error'] = $asignacionPermisos->getDataError();
                } elseif ($asignacionPermisos->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso actualizado actualizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el permiso';
                }
                break;
                //Metódo que permite leer todos los registros que se encuentran en la base de datos.
            case 'readAll':
                if ($result['dataset'] = $asignacionPermisos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
                } else {
                    $result['error'] = 'No existen asignaciones de permisos';
                }
                break;
                //Metódo que permite leer los permisos que tenga un admin, pasandole el idAdministrador
            case 'readOneByAdminId':
                if (!$asignacionPermisos->setIdAdmin($_POST['idAdministrador'])) {
                    $result['error'] = $asignacionPermisos->getDataError();
                } elseif ($result['dataset'] = $asignacionPermisos->readOneByAdminId()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Este usuario aún no tiene permisos asignados';
                }
                break;
                //Metódo que permite leer los permisos asignados pasando el idAsignacionPermiso
            case 'readOneByPermisoId':
                if (!$asignacionPermisos->setIdAsignacionPermiso($_POST['idAsignacionPermiso'])) {
                    $result['error'] = $asignacionPermisos->getDataError();
                } elseif ($result['dataset'] = $asignacionPermisos->readOneByPermisoId()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Este usuario aún no tiene permisos';
                }
                break;
                //Metódo que permite eliminar un permiso asignado, para ello solo se necesita que se pase el idAsignacionPermiso
            case 'deleteRow':
                if (!$asignacionPermisos->setIdAdmin($_POST['idAsignacionPermiso'])) {
                    $result['error'] = $asignacionPermisos->getDataError();
                } elseif ($asignacionPermisos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso asignado eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el permiso asignado';
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
