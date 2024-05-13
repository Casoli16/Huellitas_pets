<?php
require_once ('../../models/data/categorias_data.php');
require_once ('../../models/data/clientes_data.php');
require_once ('../../models/data/productos_data.php');
require_once ('../../models/data/admin_data.php');
require_once ('../../models/data/pedidos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();

    $categorias = new CategoriasData();
    $clientes = new ClientesData();
    $productos = new productosData();
    $pedidos = new pedidos_data();
    $administradores = new AdminData();

    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    if (isset($_SESSION['idAdministrador'])) {
        switch ($_GET['action']) {
            case 'readAll':
                if ($result['dataset'] = $categorias->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
                } else {
                    $result['error'] = 'No existen categorías registrados';
                }
                break;
            case 'newUsers':
                if ($result['dataset'] = $clientes->countNewClients()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros nuevos';
                } else {
                    $result['error'] = 'No existen registro nuevos de clientes';
                }
                break;
            case 'readTopProduct':
                if ($result['dataset'] = $productos->readTopProduct()) {
                    $result['status'] = 1;
                    $result['message'] = 'Petición exitosa';
                } else {
                    $result['error'] = 'Ocurrió un error al mostrar el producto más vendido.';
                }
                break;
            case 'readSellingByMonth':
                if (!$pedidos->setMonth($_POST['month'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readSellingByMonth()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No se encuentran ventas en el mes seleccionado o no tienes permiso para ver este apartado';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $administradores->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print (json_encode($result));
        $result['Exception'] = Database::getException();
    }
} else {
    print (json_encode('Recurso no disponible'));
}
