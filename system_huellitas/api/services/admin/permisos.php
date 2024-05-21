<?php
// Se incluye la clase del modelo.
require_once('../../models/data/permisos_data.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $permisos = new PermisosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) && (($_SESSION['permisos']['ver_permiso'] == 1) || ($_SESSION['permisos']['ver_usuario'] == 1))) {
        $result['session'] = 1;
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
                    !$permisos->setVerUsuario($_POST['ver_usuario']) or
                    !$permisos->setVerCliente($_POST['ver_cliente']) or
                    !$permisos->setVerMarca($_POST['ver_marca']) or
                    !$permisos->setVerPedido($_POST['ver_pedido']) or
                    !$permisos->setVerComentario($_POST['ver_comentario']) or
                    !$permisos->setVerProducto($_POST['ver_producto']) or
                    !$permisos->setVerCategoria($_POST['ver_categoria']) or
                    !$permisos->setVerCupon($_POST['ver_cupon']) or
                    !$permisos->setVerPermiso($_POST['ver_permiso'])
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
            case 'readOneAdmin':
                if (!$permisos->setIdAdmin($_POST['idAdmin'])) {
                    $result['error'] = $permisos->getDataError();
                } elseif ($result['dataset'] = $permisos->readOneAdmin()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Este administrador no tiene permisos asignados';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$permisos->setIdPermiso($_POST['idPermiso']) or
                    !$permisos->setNombrePermiso($_POST['NombrePermiso']) or
                    !$permisos->setVerUsuario($_POST['ver_usuario']) or
                    !$permisos->setVerCliente($_POST['ver_cliente']) or
                    !$permisos->setVerMarca($_POST['ver_marca']) or
                    !$permisos->setVerPedido($_POST['ver_pedido']) or
                    !$permisos->setVerComentario($_POST['ver_comentario']) or
                    !$permisos->setVerProducto($_POST['ver_producto']) or
                    !$permisos->setVerCategoria($_POST['ver_categoria']) or
                    !$permisos->setVerCupon($_POST['ver_cupon']) or
                    !$permisos->setVerPermiso($_POST['ver_permiso'])
                ) {
                    $result['error'] = $permisos->getDataError();
                } elseif ($permisos->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el permiso';
                }
                break;
            case 'deleteRow':
                if (
                    !$permisos->setIdPermiso($_POST['idPermiso'])
                ) {
                    $result['error'] = 'Por favor asegurate de eliminar este permiso de los administradores que lo tengan asignado';
                } elseif ($permisos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Permiso eliminado correctamente';
                } else {
                    $result['error'] = 'Por favor asegurate de eliminar este permiso de los administradores que lo tengan asignado';
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
} else {
    print(json_encode('Recurso no disponible'));
}
