<?php

require_once('../../models/data/marcas_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();

    $marcas = new MarcasData;

    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_marca'] == 1)) {
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $marcas->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$marcas->setNombreMarca($_POST['nombreMarca']) or
                    !$marcas->setImagenMarca($_FILES['imagenMarca'])
                ) {
                    $result['error'] = $marcas->getDataError();
                } elseif ($marcas->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Marca creada correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenMarca'], $marcas::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al ingresar la marca';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$marcas->setIdMarca($_POST['idMarca']) or
                    !$marcas->setFilename() or
                    !$marcas->setNombreMarca($_POST['nombreMarca']) or
                    !$marcas->setImagenMarca($_FILES['imagenMarca'], $marcas->getFilename())
                ) {
                    $result['error'] = $marcas->getDataError();
                } elseif ($marcas->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Marca actualizada correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenMarca'], $marcas::RUTA_IMAGEN, $marcas->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar la marca';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $marcas->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
                } else {
                    $result['error'] = 'No existen marcas registradas';
                }
                break;
            case 'readOne':
                if (!$marcas->setIdMarca($_POST['idMarca'])) {
                    $result['error'] = $marcas->getDataError();
                } elseif ($result['dataset'] = $marcas->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Marca inexistente';
                }
                break;
            case 'deleteRow':
                if (
                    !$marcas->setIdMarca($_POST['idMarca']) or
                    !$marcas->setFilename()
                ) {
                    $result['error'] = $marcas->getDataError();
                } elseif ($marcas->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Marca eliminada correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($marcas::RUTA_IMAGEN, $marcas->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la marca, elimina los productos que esten asociada a esta marca';
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
