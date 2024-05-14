<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla autorizaciones.
 */
class AutorizacionesHandler
{
    /*
     *  Declaración de atributos para controlar el id del usuario que esta en la sesion
     */
    protected $idAdmin = null;

    /*
     *  Métodos para realizar la lectura de permisos unicamente por seguridad
     *
     */

    public function readOneAdmin()
    {
        $sql = 'SELECT * FROM vista_permisos_administrador WHERE id_admin =?;';
        $params = array($this->idAdmin);
        return Database::getRow($sql, $params);
    }

}