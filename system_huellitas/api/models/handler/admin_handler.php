<?php

// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

//Clase para manejar el comportamiento de los datos de la tabla administradores.
class AdminHandler
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

    const RUTA_IMAGEN = '../../images/admins/';

    //Metodos para realizar las operaciones SCRUD

    // SEARCH
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT *
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

    //Manejo de la cuenta del admin.

    // CHECK USER - Valida las credenciales del usuario en el inicio de sesion.
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_admin, alias_admin, clave_admin
                FROM administradores
                WHERE alias_admin = ?';
        $params = array($username);
        $data = Database::getRow($sql, $params);
        //Verificamos que la contraseña $password coincida con la contraseña hasheada en la base de datos.
        if(password_verify($password, $data['clave_admin'])){
            // Si coincide entonces se le asigna el id_admin de la base al idAdministrador y lo mismo ocurre con el alias_admin, devolviendo un true
            $_SESSION['idAdministrador'] = $data['id_admin'];
            $_SESSION['aliasAdmin'] = $data['alias_admin'];
            return true;
        } else{
            return false;
        }
    }

    // CHECK PASSWORD - Valida que la contraseña del usuario coincida con la de la base de datos.

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_admin
                FROM administradores
                WHERE id_admin = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['clave_admin'])){
            return true;
        } else{
            return false;
        }
    }

    // UPDATE PASSWORD

    public function updatePassword()
    {
        $sql = 'UPDATE administradores
                SET clave_admin = ?
                WHERE id_admin = ?';
        $params = array($this->claveAdmin, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    // READ PROFILE

    public function readProfile()
    {
        $sql = 'SELECT id_admin, nombre_admin, apellido_admin, correo_admin, alias_admin, clave_admin, fecha_registro_admin, imagen_admin
                FROM administradores
                WHERE id_admin = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    // READ PROFILE
    public function editProfile()
    {
        $sql = 'UPDATE administradores
                SET nombre_admin = ?, apellido_admin = ?, correo_admin = ?, alias_admin = ?, clave_admin = ?, fecha_registro_admin = ?, imagen_admin = ?
                WHERE id_Admin = ?';
        $params = array(
            $this->nombreAdmin,
            $this->apellidoAdmin,
            $this->correoAdmin,
            $this->aliasAdmin,
            $this->claveAdmin,
            $this->fechaRegistroAdmin,
            $this->imagenAdmin,
            $_SESSION['idAdministrador']
        );
        return Database::executeRow($sql, $params);
    }
}