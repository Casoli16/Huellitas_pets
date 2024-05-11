<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

//Clase para manejar el comportamiento de los datos de la tabla clientes.
class ClientesHandler
{
    // Declaracion de atributos para el manejo de datos de la tabla
    protected $idCliente = null;
    protected $nombreCliente = null;
    protected $apellidoCliente = null;
    protected $correoCliente = null;
    protected $duiCliente = null;
    protected $telefonoCliente = null;
    protected $fechaNacimientoCliente = null;
    protected $direccionCliente = null;
    protected $claveCliente = null;
    protected $estadoCliente = null;
    protected $fechaRegistroCliente = null;
    protected $imagenCliente = null;

    const RUTA_IMAGEN = '../../images/clientes/';

    //Metodos para realizar las operaciones SCRUD

    // SEARCH
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT *
                FROM clientes
                WHERE nombre_cliente LIKE ? OR apellido_cliente LIKE ?
                ORDER BY nombre_cliente';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // CREATE
    public function createRow()
    {
        $sql = 'INSERT INTO clientes(nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, nacimiento_cliente, direccion_cliente, clave_cliente, estado_cliente, fecha_registro_cliente, imagen_cliente)
                VALUE (?,?,?,?,?,?,?,?,?,?,?)';
        $params = array(
            $this->nombreCliente,
            $this->apellidoCliente,
            $this->duiCliente,
            $this->correoCliente,
            $this->telefonoCliente,
            $this->fechaNacimientoCliente,
            $this->direccionCliente,
            $this->claveCliente,
            $this->estadoCliente,
            $this->fechaRegistroCliente,
            $this->imagenCliente);
        return Database::executeRow($sql, $params);
    }

    // READ ALL
    public function readAll()
    {
        $sql = 'SELECT * FROM clientes ORDER BY fecha_registro_cliente';
        return Database::getRows($sql);
    }

    // READ ONE
    public function readOne()
    {
        $sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
        $params = array($this->idCliente);
        return Database::getRows($sql, $params);
    }

    // UPDATE
    public function updateRow()
    {
        $sql = 'UPDATE clientes
        SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_cliente = ?, telefono_cliente = ?, nacimiento_cliente = ?, direccion_cliente = ?, clave_cliente = ?, estado_cliente = ?, fecha_registro_cliente = ?, imagen_cliente = ?
        WHERE id_cliente = ?';
        $params = array(
            $this->nombreCliente,
            $this->apellidoCliente,
            $this->correoCliente,
            $this->duiCliente,
            $this->telefonoCliente,
            $this->fechaNacimientoCliente,
            $this->direccionCliente,
            $this->claveCliente,
            $this->claveCliente,
            $this->estadoCliente,
            $this->fechaRegistroCliente,
            $this->imagenCliente,
            $this->idCliente
        );
        return Database::executeRow($sql, $params);
    }

    //DELETE
    public function deleteRow()
    {
        $sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        $params = array($this->idCliente);
        return Database::executeRow($sql, $params);
    }

    //Manejo de la cuenta del cliente.

    // CHECK USER - Valida las credenciales del usuario en el inicio de sesion.
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_cliente, correo_cliente, clave_cliente
                FROM clientes
                WHERE correo_cliente = ?';
        $params = array($username);
        $data = Database::getRow($sql, $params);
        //Verificamos que la contraseña $password coincida con la contraseña hasheada en la base de datos.
        if (password_verify($password, $data['clave_cliente'])) {
            // Si coincide entonces se le asigna el id_cliente de la base al idCliente y lo mismo ocurre con el correo_cliente, devolviendo un true
            $_SESSION['idCliente'] = $data['id_cliente'];
            $_SESSION['correoCliente'] = $data['correo_cliente'];
            return true;
        } else {
            return false;
        }
    }

    // CHECK PASSWORD - Valida que la contraseña del usuario coincida con la de la base de datos.

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_cliente
                FROM clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['clave_cliente'])) {
            return true;
        } else {
            return false;
        }
    }

    // UPDATE PASSWORD

    public function updatePassword()
    {
        $sql = 'UPDATE clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->claveCliente, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    // READ PROFILE

    public function readProfile()
    {
        $sql = 'SELECT nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, nacimiento_cliente, direccion_cliente, clave_cliente, estado_cliente, fecha_registro_cliente, imagen_cliente
                FROM clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }
}