<?php
// Se incluye la clase del modelo.
require_once('../../models/data/permisos_data.php');

    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $permisos = new permisos_data;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) or true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $permisos->searchRows()) {  
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permisos->setNombrePermiso($_POST['NombrePermiso']) or
                    !$permisos->setAgacUsuarioPermiso($_POST['AgacUsuarioPermiso']) or
                    !$permisos->setEliminarUsuarioPermiso($_POST['EliminarUsuarioPermiso']) or
                    !$permisos->setAgacProductoPermiso($_POST['AgacProductoPermiso']) or
                    !$permisos->setEliminarProductoPermiso($_POST['EliminarProductoPermiso']) or
                    !$permisos->setBorrarComentarioPermiso($_POST['BorrarComentarioPermiso']) or
                    !$permisos->setAgacCategoriaPermiso($_POST['AgacCategoriaPermiso']) or
                    !$permisos->setEliminarCategoriaPermiso($_POST['EliminarCategoriaPermiso']) or
                    !$permisos->setGestionarCuponPermiso($_POST['GestionarCuponPermiso'])
                ) {
                    $result['error'] = $permisos->getDataError();
                } elseif ($permisos->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso agregado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el permiso';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $permisos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen permisos registrados';
                }
                break;
            case 'readOne':
                if (!$permisos->setIdPermiso($_POST['idPermiso'])) {
                    $result['error'] = $permisos->getDataError();
                } elseif ($result['dataset'] = $permisos->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Permiso inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permisos->setIdPermiso($_POST['IdPermiso']) or
                    !$permisos->setNombrePermiso($_POST['NombrePermiso']) or
                    !$permisos->setAgacUsuarioPermiso($_POST['AgacUsuarioPermiso']) or
                    !$permisos->setEliminarUsuarioPermiso($_POST['EliminarUsuarioPermiso']) or
                    !$permisos->setAgacProductoPermiso($_POST['AgacProductoPermiso']) or
                    !$permisos->setEliminarProductoPermiso($_POST['EliminarProductoPermiso']) or
                    !$permisos->setBorrarComentarioPermiso($_POST['BorrarComentarioPermiso']) or
                    !$permisos->setAgacCategoriaPermiso($_POST['AgacCategoriaPermiso']) or
                    !$permisos->setEliminarCategoriaPermiso($_POST['EliminarCategoriaPermiso']) or
                    !$permisos->setGestionarCuponPermiso($_POST['GestionarCuponPermiso'])
                ) {
                    $result['error'] = $permisos->getDataError();
                } elseif ($permisos->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el permiso';
                }
                break;
            case 'deleteRow':
                if (
                    !$permisos->setIdPermiso($_POST['idPermiso'])
                ) {
                    $result['error'] =$permisos->getDataError();
                } elseif ($permisos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el permiso';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
}
