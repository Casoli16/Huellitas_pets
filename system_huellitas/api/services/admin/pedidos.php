<?php

require_once('../../models/data/pedidos_data.php');


if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedidos = new PedidosData();

    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);


    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_pedido'] == 1)) {
        $result['session'] = 1;
        switch ($_GET['action']) {
            //Case para buscar un pedido en base a su nombre
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
            // Case para leer todos los registros de los pedidos, ordenados del más reciente agregadp al más antiguo de último 
            case 'readAll':
                if ($result['dataset'] = $pedidos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pedidos registrados';
                }
                break;
            // Case para actualizar el estado del pedido de un usuario, puede ser, Pendiente, Completado o Cancelado, este endpoint espera 2 parametros, el estado y el id del pedido a actualizar
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
            // Case para ver la información general de un pedido especiico, nombre del cliente
            // dirección, total y etc, estos datos son 1 solo por pedido.
            case 'readOne':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readOne1()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Pedido inexistente';
                }
                break;
            // Case para la gráfica, se le pasa un número del 1 al 12 y devuelve un dato con las ventas de ese mes
            case 'readSellingByMonth':
                if (!$pedidos->setMonth($_POST['month'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readSellingByMonth()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se encuentran ventas en el mes seleccionado o no tienes permiso para ver este apartado';
                }
                break;
            // Case para ver cada producto de un pedido especifico, un pedido puede tener muchos productos entonces en base
            // a las respuestas de readOne en el js se se observa cuántos productos tiene el pedido y en base a eso se manda a llamar readTwo
            // la cantiadad de veces que readOne indique.
            case 'readTwo':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readOne2()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Pedido inexistente';
                }
                break;
            // Case para ver el estado de un pedido en especifico
            case 'readThree':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readOne3()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se encuentra un valor en el estado';
                }
                break;
            // Case para borrar un registro entero con sus pedido, este case solo se debe activar si solo existe 1 producto
            // en el pedido, si se tiene más de un producto, se recomienda deleteRow2 
            case 'deleteRow':
                if (
                    !$pedidos->setIdPedido($_POST['id_pedido']) or
                    !$pedidos->setIdDetallePedido($_POST['id_detalle_pedido'])
                ) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pedido eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el pedido';
                }
                break;
            // Case para eliminar un producto de un pedido especifico.
            case 'deleteRow2':
                if (!$pedidos->setIdDetallePedido($_POST['id_detalle_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->deleteRow2()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente del pedido';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el producto';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
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
