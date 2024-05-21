<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cupones_data.php');

// Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
if (isset($_GET['action'])) {
    session_start();
    // Se instancia la clase correspondiente.
    $cupones = new CuponesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_cupon'] == 1)) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            //Case para buscar un cupón en base a su nombre o su fecha de ingreso
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
            // Case para crear un cupón, se le pasa 3 parametros, codigo, porcentaje y el estado del cupón, un string, un int y un booleano
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
                    $result['message'] = 'Cupón agregado correctamente';
                } else {
                    $result['error'] = '¡El máximo de porcentaje de un cupón es 80%, modificalo por favor!';
                }
                break;
            // Case para leer todos los registros de los cupones, ordenados del más reciente creado al más antiguo de último 
            case 'readAll':
                if ($result['dataset'] = $cupones->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = ' Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen cupones registrados';
                }
                break;
            // Case para leer la información de un registro en especifico, se verá el código, porcentaje y estado  
            case 'readOne':
                if (!$cupones->setIdCupon($_POST['idCupon'])) {
                    $result['error'] = $cupones->getDataError();
                } elseif ($result['dataset'] = $cupones->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cupón inexistente';
                }
                break;
             // Case para actualizar un cupón, se le pasa 3 parametros, codigo, porcentaje y el estado del cupón, un string, un int y un booleano
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
                    $result['message'] = 'Cupón modificado correctamente';
                } else {
                    $result['error'] = '¡El máximo de porcentaje de un cupón es 80%, modificalo por favor!';
                }
                break;
             // Case para eliminar un cupón, ya sea que tenga relación en alguna tabla o no
            case 'deleteRow':
                if (
                    !$cupones->setIdCupon($_POST['idCupon'])
                ) {
                    $result['error'] = $cupones->getDataError();
                } elseif ($cupones->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cupón eliminado correctamente';
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
} else {
    print(json_encode('Recurso no disponible'));
}
