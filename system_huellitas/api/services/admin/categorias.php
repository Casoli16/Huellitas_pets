<?php
// Se incluye la clase del modelo.
require_once('../../models/data/categorias_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    session_start();
 // Se instancia la clase correspondiente.
    $categorias = new CategoriasData;

     // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);

     // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) && ($_SESSION['permisos']['ver_categoria'] == 1)) {
         // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            //Metódo que permite buscar un registro.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $categorias->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
                //Metódo que permite crear una categoría.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categorias->setNombreCategoria($_POST['nombreCategoria']) or
                    !$categorias->setDescripcionCategoria($_POST['descripcionCategoria']) or
                    !$categorias->setImagenCategoria($_FILES['imagenCategoria'])
                ) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($categorias->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría creada correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenCategoria'], $categorias::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la categoría';
                }
                break;
                //Metódo que permite actualizar una categoría
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categorias->setIdCategoria($_POST['idCategoria']) or
                    !$categorias->setFileName() or
                    !$categorias->setNombreCategoria($_POST['nombreCategoria']) or
                    !$categorias->setDescripcionCategoria($_POST['descripcionCategoria']) or
                    !$categorias->setImagenCategoria($_FILES['imagenCategoria'], $categorias->getFilename())
                ) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($categorias->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría actualizada correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenCategoria'], $categorias::RUTA_IMAGEN, $categorias->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar la categoría';
                }
                break;
                //Metódo que permite leer todos los registros que se encuentran en la base de datos
            case 'readAll':
                if ($result['dataset'] = $categorias->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen' . count($result['dataset']) . 'registros';
                } else {
                    $result['error'] = 'No existen categorías registradas';
                }
                break;
                //Metódo que permite leer una categoría en especifíco
            case 'readOne':
                if (!$categorias->setIdCategoria($_POST['idCategoria'])) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($result['dataset'] = $categorias->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Categoría inexistente';
                }
                break;
                //Metódo que permite eliminar una categoría por medio del idCategoria.
            case 'deleteRow':
                if (!$categorias->setIdCategoria($_POST['idCategoria'])) {
                    $result['error'] = $categorias->getDataError();
                } elseif ($categorias->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la categoría, elimina los productos que están asociados a esta categoría';
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
