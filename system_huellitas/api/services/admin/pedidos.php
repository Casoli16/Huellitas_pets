<?php

require_once ('../../models/data/pedidos_data.php');


if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedidos = new pedidos_data;

    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    if (isset($_SESSION['idAdministrador']) or true) {
        $result['session'] = 1;
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $pedidos->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $pedidos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pedidos registrados';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedidos->setIdPedido($_POST['id_pedido']) or
                    !$pedidos->setEstadoPedido($_POST['estado'])
                ) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido actualizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el pedido';
                }
                break;
            case 'readOne':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readOne1()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'pedido inexistente';
                }
                break;
            case 'readTwo':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readOne2()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'pedido inexistente';
                }
                break;
            case 'deleteRow':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrio un problema al eliminar el pedido';
                }
                break;
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print (json_encode($result));
    }
} else {
    print (json_encode('Recurso no disponible'));
}



