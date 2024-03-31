<?php

// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

//Clase para manejar el comportamiento de los datos de la tabla administradores.
class adminHandler
{
    // Declaracion de atributos para el manejo de datos de la tabla
    protected $idAdministrador = null;
    protected $nombreAdmin = null;
    protected  $apellidoAdmin = null;
    protected  $correoAdmin = null;
    protected  $aliasAdmin = null;
    protected  $claveAdmin = null;
    protected $fechaRegistroAdmin = null;
    protected $imagenAdmin = null;

    //Metodos para realizar las operaciones SCRUD

    // SEARCH
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT nombre_admin, correo_admin
                FROM administradores
                WHERE nombre_admin LIKE ? OR correo_admin LIKE ?
                ORDER BY nombre_admin';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // CREATE
    public function createRow()
    {
        $sql = 'INSERT INTO administradores(nombre_admin, apellido_admin, correo_admin, alias_admin, clave_admin, fecha_registro_admin, imagen_admin)
                VALUE (?,?,?,?,?,?,?)';
        $params = array(
            $this->nombreAdmin,
            $this->apellidoAdmin,
            $this->correoAdmin,
            $this->aliasAdmin,
            $this->claveAdmin,
            $this->fechaRegistroAdmin,
            $this->imagenAdmin);
        return Database::executeRow($sql, $params);
    }

    // READ ALL
    public function readAll()
    {
        $sql = 'SELECT * FROM administradores ORDER BY fecha_registro_admin';
        return DATABASE::getRows($sql);
    }

    // READ ONE
    public  function readOne()
    {
        $sql = 'SELECT * FROM administradores WHERE id_admin = ?';
        $params = array($this->idAdministrador);
        return Database::getRows($sql, $params);
    }

    // UPDATE
    public function updateRow ()
    {
        $sql = 'UPDATE administradores
        SET nombre_admin = ?, apellido_admin = ?, correo_admin = ?, alias_admin = ?, clave_admin = ?, fecha_registro_admin = ?, imagen_admin = ?
        WHERE id_admin = ?';
        $params = array(
          $this->nombreAdmin,
          $this->apellidoAdmin,
          $this->correoAdmin,
          $this->aliasAdmin,
          $this->claveAdmin,
          $this->fechaRegistroAdmin,
          $this->imagenAdmin,
          $this->idAdministrador
        );
        return Database::executeRow($sql, $params);
    }

    //DELETE
    public function deleteRow()
    {
        $sql = 'DELETE FROM administradores WHERE id_admin = ?';
        $params = array($this->idAdministrador);
        return Database::executeRow($sql, $params);
    }
}