<?php
// Se incluye la clase del modelo.
require_once('../../models/data/clientes_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();
    // Se instancia la clase correspondiente.
    $clientes = new ClientesData();

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_cliente'] == 1)) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            //Metódo que permite buscar un registro de entre todos los que hay en la base de datos.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $clientes->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
                //Metódo que permite agregar un cliente.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$clientes->setNombreCliente($_POST['nombreCliente']) or
                    !$clientes->setApellidoCliente($_POST['apellidoCliente']) or
                    !$clientes->setDuiCliente($_POST['duiCliente']) or
                    !$clientes->setCorreoCliente($_POST['correoCliente']) or
                    !$clientes->setTelefonoCliente($_POST['telefonoCliente']) or
                    !$clientes->setFechaNacimiento($_POST['fechaNacimiento']) or
                    !$clientes->setDireccionCliente($_POST['direccionCliente']) or
                    !$clientes->setClaveCliente($_POST['claveCliente']) or
                    !$clientes->setEstadoCliente($_POST['estadoCliente']) or
                    !$clientes->setImagenCliente($_FILES['imagenCliente'])
                ) {
                    $result['error'] = $clientes->getDataError();
                } elseif ($_POST['claveCliente'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($clientes->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente creado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenCliente'], $clientes::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al ingresar al cliente';
                }
                break;
                //Metódo que permite actualizar un registro de cliente
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$clientes->setIdCliente($_POST['idCliente']) or
                    !$clientes->setEstadoCliente($_POST['estadoCliente'])
                ) {
                    $result['error'] = $clientes->getDataError();
                } elseif ($clientes->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado actualizado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el estado';
                }
                break;
                //Metódo que permite leer todos los clientes que se encuentran en la base de datos
            case 'readAll':
                if ($result['dataset'] = $clientes->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen clientes registrados';
                }
                break;
                //Metódo que permite observar la cantidad de nuevos clientes.
            case 'newUsers':
                if ($result['dataset'] = $clientes->countNewClients()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros nuevos';
                } else {
                    $result['error'] = 'No existen registro nuevos de clientes';
                }
                break;
                //Metódo que permite ver un leer un cliente en específico
            case 'readOne':
                if (!$clientes->setIdCliente($_POST['idCliente'])) {
                    $result['error'] = $clientes->getDataError();
                } elseif ($result['dataset'] = $clientes->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'El cliente no existe';
                }
                break;
                //Metódo que permite eliminar un registro en clientes
            case 'deleteRow':
                if (!$clientes->setIdCliente($_POST['idCliente'])) {
                    $result['error'] = $clientes->getDataError();
                } elseif ($clientes->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'cliente eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar al cliente';
                }
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
