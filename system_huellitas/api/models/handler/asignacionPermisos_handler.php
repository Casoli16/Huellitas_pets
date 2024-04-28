<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
class asignacionPermisosHandler
{
    protected $idAsignacionPermiso = null;
    protected $idPermiso = null;
    protected  $idAdmin = null;

    //Metodos para realizar las operaciones SCRUD
    public function createRow()
    {
        $sql = 'INSERT INTO asignacion_permisos(id_permiso, id_admin)
                VALUE (?,?)';
        $params = array(
            $this->idPermiso,
            $this->idAdmin);
        return Database::executeRow($sql, $params);
    }

    // READ ALL
    public function readAll()
    {
        $sql = 'SELECT * FROM asignacion_permisos';
        return DATABASE::getRows($sql);
    }

    // READ ONE
    public  function readOne()
    {
        $sql = 'SELECT * FROM admin_permisos_view WHERE id_admin = ?';
        $params = array($this->idAdmin);
        return Database::getRows($sql, $params);
    }

    // UPDATE
    public function updateRow ()
    {
        $sql = 'UPDATE asignacion_permisos
        SET id_admin = ?, id_permiso = ? WHERE id_asignacion_permiso = ?';
        $params = array(
            $this->idAdmin,
            $this->idPermiso,
            $this->idAsignacionPermiso
        );
        return Database::executeRow($sql, $params);
    }

    //DELETE
    public function deleteRow()
    {
        $sql = 'DELETE FROM asignacion_permisos WHERE id_asignacion_permiso = ?';
        $params = array($this->idAdmin);
        return Database::executeRow($sql, $params);
    }
}