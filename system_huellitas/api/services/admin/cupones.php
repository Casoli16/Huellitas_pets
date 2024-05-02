<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cupones_data.php');

    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    if (isset($_GET['action'])) {
    session_start();
    // Se instancia la clase correspondiente.
    $cupones = new cupones_data;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) or true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $cupones->searchRows()) {  
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cupones->setCodigoCupon($_POST['codigoCupon']) or
                    !$cupones->setPorcentajeCupon($_POST['porcentajeCupon']) or
                    !$cupones->setestado_cupon($_POST['estadoCupon'])
                ) {
                    $result['error'] = $cupones->getDataError();
                } elseif ($cupones->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cupon agregado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la categoría';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $cupones->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen cupones registrados';
                }
                break;
            case 'readOne':
                if (!$cupones->setIdCupon($_POST['idCupon'])) {
                    $result['error'] = $cupones->getDataError();
                } elseif ($result['dataset'] = $cupones->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'cupon inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cupones->setIdCupon($_POST['idCupon']) or
                    !$cupones->setCodigoCupon($_POST['codigoCupon']) or
                    !$cupones->setPorcentajeCupon($_POST['porcentajeCupon']) or
                    !$cupones->setestado_cupon($_POST['estadoCupon'])
                ) {
                    $result['error'] = $cupones->getDataError();
                } elseif ($cupones->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cupon modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el cupon';
                }
                break;
            case 'deleteRow':
                if (
                    !$cupones->setIdCupon($_POST['idCupon'])
                ) {
                    $result['error'] =$cupones->getDataError();
                } elseif ($cupones->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cupon eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el cupón';
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
}else {
    print(json_encode('Recurso no disponible'));
}
