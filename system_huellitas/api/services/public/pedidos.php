<?php
require_once('../../models/data/pedidos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedidos = new PedidosData();
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null, 'dataset' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
                // Acción para agregar un producto al carrito de compras.
            case 'createDetail':
                $_POST = Validator::validateForm($_POST);
                if (!$pedidos->startOrder()) {
                    $result['error'] = 'Ocurrió un problema al iniciar el pedido';
                } elseif (
                    !$pedidos->setProducto($_POST['idProducto']) or
                    !$pedidos->setCantidad($_POST['cantidadProducto']) or
                    !$pedidos->setIdCupon($_POST['idCupon'])
                ) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->createDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                } else{
                    $result['error'] = 'Tu pedido excede las existencias actuales';
                }
                break;
                // Acción para obtener los productos agregados en el carrito de compras.
            case 'readDetail':
                if (!$pedidos->getOrder()) {
                    $result['error'] = 'No ha agregado productos al carrito';
                } elseif ($result['dataset'] = $pedidos->readDetail()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen productos en el carrito';
                }
                break;
            // Acción para obtener todo el pedido pendiente.
            case 'readFinishDetail':
                if (!$pedidos->setIdPedido($_POST['idPedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readFinishDetail()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existe el pedido';
                }
                break;
                //Permite contar la cantidad de productos que se lleva en el carrito
            case 'countCart':
                if ($result['dataset'] = $pedidos->countCart()) {
                    $result['status'] = 1;
                    $result['message'] = 'Si hay productos agregados a tu carrito';
                } else {
                    $result['error'] = 'Ocurrió un problema';
                }
                break;
                // Acción para actualizar la cantidad de un producto en el carrito de compras.
            case 'updateDetail':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedidos->setIdDetalle($_POST['idDetalle']) or
                    !$pedidos->setCantidad($_POST['cantidadProducto'])
                ) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->updateDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cantidad modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la cantidad';
                }
                break;
            // Acción para actualizar la dirección de envío del pedido.
            case 'updateAddress':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedidos->setDireccion($_POST['direccion'])
                ) {
                    $result['error'] = $pedidos->getDataError();
                } else if ($pedidos->updateAddress()) {
                    $result['status'] = 1;
                    $result['message'] = 'Dirección actualizada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar tú dirección';
                }
                break;
                // Acción para remover un producto del carrito de compras.
            case 'deleteDetail':
                if (!$pedidos->setIdDetalle($_POST['idDetalle'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($pedidos->deleteDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto removido correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al remover el producto';
                }
                break;
                // Acción para finalizar el carrito de compras.
            case 'finishOrder':
                if ($pedidos->finishOrder()) {
                    //Eliminamos el idPedido que se encontraba activo.
                    unset($_SESSION['idPedido']);
                    $result['status'] = 1;
                    $result['message'] = 'Pedido finalizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al finalizar el pedido';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando un cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            // Acción para agregar un producto al carrito de compras, se referirá al login desde el web porque este case siempré dará error.
            case 'createDetail':
                $result['error'] = 'Debe iniciar sesión para agregar el producto al carrito';
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
