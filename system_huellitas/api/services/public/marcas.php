<?php

// Se incluye la clase del modelo.
require_once('../../models/data/marcas_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();
    // Se instancia la clase correspondiente.
    $marca = new MarcasData();

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET['action']) {
            // Case para leer todas las marcas registradas
        case 'readAll':
            if ($result['dataset'] = $marca->readAll()) {
                $result['status'] = 1;
                $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
            } else {
                $result['error'] = 'No existen marcas registradas';
            }
            break;
        default:
            $result['error'] = 'Acción no disponible';
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
    $result['Exception'] = Database::getException();
} else {
    print(json_encode('Recurso no disponible'));
}
