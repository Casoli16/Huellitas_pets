<?php
require_once('../../helpers/emailConnexion.php');
require_once('../../helpers/validator.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

    switch ($_GET['action']) {
            //Metodo que permite enviar un correo de contacto al equipo de Huellitas Pets
        case 'sendContactUs':
            $_POST = Validator::validateForm($_POST);
            if (Email::sendMail($_POST['correoCliente'], 'Formulario de soporte - Huellitas Pets', $_POST['nombreCliente'], $_POST['mensajeCorreo'])) {
                $result['status'] = 1;
                $result['message'] = '¡' . $_POST['nombreCliente'] . ' tu correo ha sido enviado al equipo de Huellitas Pets!';
            } else {
                $result['error'] = 'Ocurrió un problema al envíar tu correo electrónico';
            }
            break;
        default:
            $result['error'] = 'Acción no disponible';
    }
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
