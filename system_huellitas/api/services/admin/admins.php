<?php
// Se incluye la clase del modelo.
require_once ('../../models/data/admin_data.php');
require_once ('../../models/data/permisos_data.php');
require_once ('../../models/data/asignacionPermisos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();
    // Se instancia la clase correspondiente.
    $administradores = new AdminData();
    $permisos = new PermisosData;
    $asignacionPermisos = new AsignacionPermisosData;

    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);

    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_usuario'] == 1)) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $administradores->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administradores->setNombreAdmin($_POST['nombreAdmin']) or
                    !$administradores->setApellidoAdmin($_POST['apellidoAdmin']) or
                    !$administradores->setCorreoAdmin($_POST['correoAdmin']) or
                    !$administradores->setAliasAdmin($_POST['aliasAdmin']) or
                    !$administradores->setClaveAdmin($_POST['claveAdmin']) or
                    !$administradores->setImagenAdmin($_FILES['imagenAdmin'])
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($_POST['claveAdmin'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($administradores->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador ingresado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenAdmin'], $administradores::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrio un problema al ingresar al administrador';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administradores->setIdAdmin($_POST['idAdministrador']) or
                    !$administradores->setFilename() or
                    !$administradores->setNombreAdmin($_POST['nombreAdmin']) or
                    !$administradores->setApellidoAdmin($_POST['apellidoAdmin']) or
                    !$administradores->setCorreoAdmin($_POST['correoAdmin']) or
                    !$administradores->setImagenAdmin($_FILES['imagenAdmin'], $administradores->getFilename())
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($administradores->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador actualizado correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenAdmin'], $administradores::RUTA_IMAGEN, $administradores->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el administrador';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $administradores->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen administradores registrados';
                }
                break;
            case 'readOne':
                if (!$administradores->setIdAdmin($_POST['idAdministrador'])) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($result['dataset'] = $administradores->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'El administrador no existe';
                }
                break;
            case 'deleteRow':
                if (!isset($_POST['idAdministrador'])) {
                    $result['error'] = 'ID de administrador no proporcionado';
                } elseif (
                    !$administradores->setIdAdmin($_POST['idAdministrador']) or
                    !$administradores->setFilename()
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($_POST['idAdministrador'] != $_SESSION['idAdministrador']) {
                    if ($administradores->deleteRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Administrador eliminado correctamente';
                        // Se asigna el estado del archivo después de eliminar.
                        $result['fileStatus'] = Validator::deleteFile($administradores::RUTA_IMAGEN, $administradores->getFilename());
                    } else {
                        $result['error'] = 'Ocurrio un problema al eliminar al administrador';
                    }
                } else {
                    $result['error'] = '¡Por la integridad del sistema no puedes eliminar tu propia cuenta!';
                }
                break;
            // Manejo de datos de la cuenta del admin
            case 'getUser':
                if (isset($_SESSION['aliasAdmin'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['aliasAdmin'];
                } else {
                    $result['error'] = 'Alias de administrador no encontrado';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión elimininada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $administradores->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administradores->setNombreAdmin($_POST['nombreAdmin']) or
                    !$administradores->setIdAdmin($_POST['idAdministrador']) or
                    !$administradores->setFilename() or
                    !$administradores->setApellidoAdmin($_POST['apellidoAdmin']) or
                    !$administradores->setCorreoAdmin($_POST['correoAdmin']) or
                    !$administradores->setAliasAdmin($_POST['aliasAdmin']) or
                    !$administradores->setFechaRegistro($_POST['fechaRegistroAdmin']) or
                    !$administradores->setImagenAdmin($_FILES['imagenAdmin'], $administradores->getFilename())
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($administradores->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil actualizado correctamente';
                    $_SESSION['aliasAdmin'] = $_POST['aliasAdmin'];
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenAdmin'], $administradores::RUTA_IMAGEN, $administradores->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar el perfil';
                }
                break;
            case 'updatePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$administradores->checkPassword($_POST['claveActual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['claveNueva'] != $_POST['ConfirmarClave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$administradores->setClaveAdmin($_POST['claveNueva'])) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($administradores->updatePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        switch ($_GET['action']) {
            case 'readUsers':
                if ($administradores->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar';
                }
                break;
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administradores->setNombreAdmin($_POST['nombreAdmin']) or
                    !$administradores->setApellidoAdmin($_POST['apellidoAdmin']) or
                    !$administradores->setCorreoAdmin($_POST['correoAdmin']) or
                    !$administradores->setAliasAdmin($_POST['aliasAdmin']) or
                    !$administradores->setClaveAdmin($_POST['claveAdmin']) or
                    !$administradores->setImagenAdmin($_FILES['imagenAdmin'])
                ) {
                    $result['error'] = $administradores->getDataError();
                } elseif ($_POST['claveAdmin'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($administradores->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador registrado exitosamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenAdmin'], $administradores::RUTA_IMAGEN);

                    $permisos->setNombrePermiso('Administrador por defecto');
                    $permisos->setVerUsuario(1);
                    $permisos->setVerCliente(1);
                    $permisos->setVerMarca(1);
                    $permisos->setVerPedido(1);
                    $permisos->setVerComentario(1);
                    $permisos->setVerProducto(1);
                    $permisos->setVerCategoria(1);
                    $permisos->setVerCupon(1);
                    $permisos->setVerPermiso(1);
                    $permisos->createRow();

                    $asignacionPermisos->setIdAdmin(1);
                    $asignacionPermisos->setIdPermiso(1);
                    $asignacionPermisos->createRow();
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el administrador';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($administradores->checkUser($_POST['nameLogin'], $_POST['passwordLogin'])) {
                    $result['status'] = 1;
                    $result['idadmin'] = $_SESSION['idAdministrador'];
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
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
    print (json_encode($result));
} else {
    print (json_encode('Recurso no disponible'));
}
