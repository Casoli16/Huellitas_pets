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

    /*
    *  Métodos para gestionar la cuenta del cliente.
    */
    public function checkUser($email, $password)
    {
        $sql = 'SELECT id_cliente, correo_cliente, clave_cliente, estado_cliente, nombre_cliente, imagen_cliente, apellido_cliente
                FROM clientes
                WHERE correo_cliente = ?';
        $params = array($email);
        $data = Database::getRow($sql, $params);
        if (password_verify($password, $data['clave_cliente'])) {
            $this->idCliente = $data['id_cliente'];
            $this->correoCliente = $data['correo_cliente'];
            $this->estadoCliente = $data['estado_cliente'];
            $this->nombreCliente = $data['nombre_cliente'];
            $this->imagenCliente = $data['imagen_cliente'];
            $this->apellidoCliente = $data['apellido_cliente'];
            return true;
        } else {
            return false;
        }
    }

    public function readProfile()
    {
        $sql = "SELECT nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, nacimiento_cliente, telefono_cliente, direccion_cliente, estado_cliente, 
        DATE_FORMAT(fecha_registro_cliente, '%d de %M de %Y') AS fecha_registro,
        imagen_cliente
                FROM clientes
                WHERE id_cliente = ?";
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }

    //Metodo para llamar los datos del historial
    public function readHistorial()
    {
        $sql = "SELECT 
                c.nombre_cliente AS cliente,
                DATE_FORMAT(p.fecha_registro_pedido, '%e de %M del %Y') AS fecha,
                SUM(dp.cantidad_detalle_pedido) AS cantidad,
                (SELECT SUM(precio) 
                FROM pedido_view_two_I 
                WHERE id_pedido = p.id_pedido
                ) AS precio_total,
                p.estado_pedido,
                p.id_pedido AS id_pedido
                FROM 
                clientes c
                INNER JOIN 
                pedidos p ON c.id_cliente = p.id_cliente
                INNER JOIN 
                detalles_pedidos dp ON p.id_pedido = dp.id_pedido
                WHERE 
                c.id_cliente = ?
                GROUP BY 
                c.nombre_cliente, p.fecha_registro_pedido, p.estado_pedido, p.id_pedido ORDER BY fecha DESC;";
        $params = array($_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }

    public function checkStatus()
    {
        if ($this->estadoCliente == 'Activo') {
            $_SESSION['idCliente'] = $this->idCliente;
            $_SESSION['correoCliente'] = $this->correoCliente;
            $_SESSION['nombreCliente'] = $this->nombreCliente;
            $_SESSION['imagenCliente'] = $this->imagenCliente;
            $_SESSION['apellidoCliente'] = $this->apellidoCliente;
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->claveCliente, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE clientes
                SET nombre_cliente = ?, apellido_cliente = ?, dui_cliente = ?, correo_cliente =?, telefono_cliente = ?, nacimiento_cliente = ?, direccion_cliente = ?, imagen_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombreCliente, $this->apellidoCliente, $this->duiCliente, $this->correoCliente, $this->telefonoCliente, $this->fechaNacimientoCliente, $this->direccionCliente, $this->imagenCliente, $_SESSION['idCliente']);
        $_SESSION['imagenCliente'] = $this->imagenCliente;
        return Database::executeRow($sql, $params);
    }

    public function editProfilePhone()
    {
        $sql = 'UPDATE clientes
                SET nombre_cliente = ?, apellido_cliente = ?, dui_cliente = ?, correo_cliente =?, telefono_cliente = ?, nacimiento_cliente = ?, direccion_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombreCliente, $this->apellidoCliente, $this->duiCliente, $this->correoCliente, $this->telefonoCliente, $this->fechaNacimientoCliente, $this->direccionCliente, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function changeStatus()
    {
        $sql = 'UPDATE clientes
        SET estado_cliente = ?
        WHERE id_cliente = ?';
        $params = array(
            $this->estadoCliente,
            $this->idCliente
        );
        return Database::executeRow($sql, $params);
    }

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
        $sql = 'INSERT INTO clientes(nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, nacimiento_cliente, direccion_cliente, clave_cliente, imagen_cliente)
                VALUE (?,?,?,?,?,?,?,?,?)';
        $params = array(
            $this->nombreCliente,
            $this->apellidoCliente,
            $this->duiCliente,
            $this->correoCliente,
            $this->telefonoCliente,
            $this->fechaNacimientoCliente,
            $this->direccionCliente,
            $this->claveCliente,
            $this->imagenCliente
        );
        return Database::executeRow($sql, $params);
    }

    public function createRowPhone()
    {
        $sql = 'INSERT INTO clientes(nombre_cliente, apellido_cliente, dui_cliente, correo_cliente, telefono_cliente, nacimiento_cliente, direccion_cliente, clave_cliente, imagen_cliente)
                VALUE (?,?,?,?,?,?,?,?,?)';
        $params = array(
            $this->nombreCliente,
            $this->apellidoCliente,
            $this->duiCliente,
            $this->correoCliente,
            $this->telefonoCliente,
            $this->fechaNacimientoCliente,
            $this->direccionCliente,
            $this->claveCliente,
            $this->imagenCliente
        );
        return Database::executeRow($sql, $params);
    }

    // READ ALL
    public function readAll()
    {
        $sql = 'SELECT * FROM clientes ORDER BY fecha_registro_cliente';
        return Database::getRows($sql);
    }

    // READ CLIENTES MENSUALES REGISTRADOS
    public function readClientesMensuales()
    {
        $sql = 'SELECT * FROM clientes_grafica';
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
                SET nombre_cliente = ?, apellido_cliente = ?, dui_cliente = ?, estado_cliente = ?, telefono_cliente = ?, nacimiento_cliente = ?, direccion_cliente = ?, imagen_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombreCliente, $this->apellidoCliente, $this->duiCliente, $this->estadoCliente, $this->telefonoCliente, $this->fechaNacimientoCliente, $this->direccionCliente, $this->idCliente, $this->imagenCliente);
        return Database::executeRow($sql, $params);
    }

    //DELETE
    public function deleteRow()
    {
        $sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        $params = array($this->idCliente);
        return Database::executeRow($sql, $params);
    }

    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente
                FROM clientes
                WHERE dui_cliente = ? OR correo_cliente = ?';
        $params = array($value, $value);
        return Database::getRow($sql, $params);
    }

    // Nuevos usuario registrados
    public function countNewClients()
    {
        $sql = 'SELECT * FROM nuevos_usuarios';
        return Database::getRows($sql);
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

    public function readFilename()
    {
        $sql = 'SELECT imagen_cliente
                FROM clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }

    // Vista para conocer el TOP 5 de los clientes que más pedidos han hecho
    public function readTop5Pedidos()
    {
        $sql = 'SELECT * FROM top5_clientes_mayores_pedidos;';
        return Database::getRows($sql);
    }

    // Vista para conocer el TOP 5 de los clientes que más productos han comprado
    public function readTop5Productos()
    {
        $sql = 'SELECT * FROM top5_clientes_mayoria_productos;';
        return Database::getRows($sql);
    }

    // Vista para conocer el listado de clientes registrados por mes
    public function clientsList()
    {
        $sql = 'SELECT * FROM listadoclientes;';
        return Database::getRows($sql);
    }
}
