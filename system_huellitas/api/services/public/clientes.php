<?php
// Se incluye la clase del modelo.
require_once('../../models/data/clientes_data.php');

// Se incluye la API para leer los productos para el historial
require_once('../../models/data/pedidos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $cliente = new ClientesData();
    // Se instancia la clase correspondiente.
    $pedidos = new PedidosData();
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null, 'name' => null, 'lastName' => null, 'picture' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION['correoCliente'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoCliente'];
                    $result['name'] = $_SESSION['nombreCliente'];
                    $result['lastName'] = $_SESSION['apellidoCliente'];
                    $result['picture'] = $_SESSION['imagenCliente'];
                } else {
                    $result['error'] = 'Correo de usuario indefinido';
                }
                break;
            //Con este metodo lee toda la información del cliente que esta logueado.    
            case 'readProfile':
                $_POST = Validator::validateForm($_POST);
                if ($result['dataset'] = $cliente->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            //Con este metodo lee toda la información del cliente que esta logueado.    
            case 'readHistorial':
                $_POST = Validator::validateForm($_POST);
                if ($result['dataset'] = $cliente->readHistorial()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el historial';
                }
                break;
            case 'readOne':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readOne1()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Pedido inexistente';
                }
                break;
            case 'readTwo':
                if (!$pedidos->setIdPedido($_POST['id_pedido'])) {
                    $result['error'] = $pedidos->getDataError();
                } elseif ($result['dataset'] = $pedidos->readOne2()) {
                    $result['status'] = 1;
                } else {
                $result['error'] = 'Pedido inexistente';
                }
                break;
            //Metódo que permite editar la información del admin que se ha logueado.    
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombreCliente($_POST['nombreCliente']) or
                    !$cliente->setApellidoCliente($_POST['apellidoCliente']) or
                    !$cliente->setFilename() or
                    !$cliente->setDuiCliente($_POST['duiCliente']) or
                    !$cliente->setDireccionCliente($_POST['direccionCliente']) or
                    !$cliente->setFechaNacimiento($_POST['nacimientoCliente']) or
                    !$cliente->setTelefonoCliente($_POST['telefonoCliente']) or
                    !$cliente->setCorreoCliente($_POST['correoCliente']) or
                    !$cliente->setImagenCliente($_FILES['imagenCliente'], $cliente->getFilename())
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil actualizado correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenCliente'], $cliente::RUTA_IMAGEN, $cliente->getFilename());
                    $_SESSION['nombreCliente'] = $_POST['nombreCliente'];
                    $_SESSION['apellidoCliente'] = $_POST['apellidoCliente'];
                    //$_SESSION['imagenCliente'] = $cliente->readFilename();
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el perfil';
                }
                break;
            case 'changePassword':
                    $_POST = Validator::validateForm($_POST);
                    if (!$cliente->checkPassword($_POST['claveActual'])) {
                        $result['error'] = 'Contraseña actual incorrecta';
                    } elseif ($_POST['claveNueva'] != $_POST['ConfirmarClave']) {
                        $result['error'] = 'Confirmación de contraseña diferente';
                    } elseif (!$cliente->setClaveCliente($_POST['claveNueva'])) {
                        $result['error'] = $cliente->getDataError();
                    } elseif ($cliente->changePassword()) {
                        $result['status'] = 1;
                        $result['message'] = 'La constraseña ha sido cambiada exitosamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                    }
            break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else{
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                // Se establece la clave secreta para el reCAPTCHA de acuerdo con la cuenta de Google.
                $secretKey = '6Lei6ukpAAAAANzaaG4VKFOI-kUNwkJk2dtgnVL4';
                // Se establece la dirección IP del servidor.
                $ip = $_SERVER['REMOTE_ADDR'];
                // Se establecen los datos del raCAPTCHA.
                $data = array('secret' => $secretKey, 'response' => $_POST['gRecaptchaResponse'], 'remoteip' => $ip);
                // Se establecen las opciones del reCAPTCHA.
                $options = array(
                    'http' => array('header' => 'Content-type: application/x-www-form-urlencoded\r\n', 'method' => 'POST', 'content' => http_build_query($data)),
                    'ssl' => array('verify_peer' => false, 'verify_peer_name' => false)
                );

                $url = 'https://www.google.com/recaptcha/api/siteverify';
                $context = stream_context_create($options);
                $response = file_get_contents($url, false, $context);
                $captcha = json_decode($response, true);

                if (!$captcha['success']) {
                    $result['recaptcha'] = 1;
                    $result['error'] = 'No eres humano';
                } elseif(!isset($_POST['condicion'])) {
                    $result['error'] = 'Debe marcar la aceptación de términos y condiciones';
                } elseif (
                    !$cliente->setNombreCliente($_POST['nombreCliente']) or
                    !$cliente->setApellidoCliente($_POST['apellidoCliente']) or
                    !$cliente->setCorreoCliente($_POST['correoCliente']) or
                    !$cliente->setDireccionCliente($_POST['direccionCliente']) or
                    !$cliente->setDuiCliente($_POST['duiCliente']) or
                    !$cliente->setFechaNacimiento($_POST['nacimientoCliente']) or
                    !$cliente->setTelefonoCliente($_POST['telefonoCliente']) or
                    !$cliente->setClaveCliente($_POST['claveCliente']) or
                    !$cliente->setImagenCliente($_FILES['imagenCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['claveCliente'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenCliente'], $cliente::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkUser($_POST['correo'], $_POST['clave'])) {
                    $result['error'] = 'Datos incorrectos';
                } elseif ($cliente->checkStatus()) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'La cuenta ha sido desactivada';
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
} else{
    print(json_encode('Recurso no disponible'));
}