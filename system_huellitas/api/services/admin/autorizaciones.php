<?php
// Se incluye la clase del modelo.
require_once('../../models/data/autorizaciones_data.php');

if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $autorizacion = new AutorizacionesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readOneAdmin':
                if (!$autorizacion->setIdAdmin($_POST['idAdmin'])) {
                    $result['error'] = $autorizacion->getDataError();
                } elseif ($result['dataset'] = $autorizacion->readOneAdmin()) {
                    $result['status'] = 1;
                    // Guardar los permisos en un arreglo dentro de la clase autorizaciones_data
                    $_SESSION['permisos'] = $result['dataset'];
                } else {
                    $result['error'] = 'Este administrador no tiene permiso asignado';
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
