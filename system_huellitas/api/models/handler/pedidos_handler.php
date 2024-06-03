<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cupones.
 */
class PedidosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idPedido = null;
    protected $idDetalle = null;
    protected $idProducto = null;
    protected $cliente = null;

    protected $precio = null;

    protected $producto = null;

    protected $cantidad = null;
    protected $idCupon = null;
    protected $estadoPedido = null;
    protected  $monthNumber = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT *
            FROM pedidos_view
            WHERE cliente LIKE ? OR fecha LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $ssql = 'SET lc_time_names = "es_ES";';
        $sql ='SELECT *
            FROM pedidos_view;';
        return Database::getRows($sql);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM valoraciones  WHERE id_detalle_pedido = ?; 
                DELETE FROM detalles_pedidos  WHERE id_detalle_pedido = ?;
                DELETE FROM pedidos  WHERE id_pedido = ?;';
        $params = array(
            $this->idDetalle,
            $this->idDetalle,
            $this->idPedido
        );
        return Database::executeRow($sql, $params);
    }

    public function deleteRow2()
    {
        $sql = 'DELETE FROM valoraciones  WHERE id_detalle_pedido = ?; 
                DELETE FROM detalles_pedidos  WHERE id_detalle_pedido = ?;';
       $params = array(
        $this->idDetalle,
        $this->idDetalle
    );
        return Database::executeRow($sql, $params);
    }

    //Selecciona todas las ventas de un mes en especifico
    public function readSellingByMonth()
    {
        $sql = 'SELECT 
                DATE_FORMAT(p.fecha_registro_pedido, "%d de %M del %Y") AS dia,
                SUM(cantidad_detalle_pedido * precio_detalle_pedido) AS venta_del_dia
                FROM pedidos p
                JOIN detalles_pedidos dp ON p.id_pedido = dp.id_pedido
                WHERE MONTH(fecha_registro_pedido) = ?
                GROUP BY DAY(fecha_registro_pedido)
                ORDER BY dia;';
        $params = array($this->monthNumber);
        return Database::getRows($sql, $params);
    }

    public function readOne1()
    {
        $sql = 'SELECT * FROM pedido_view_one_I WHERE Id_pedido = ?;';
        $params = array($this->idPedido);
        return Database::getRows($sql, $params);
    }

    public function readOne3()
    {
        $sql = 'SELECT estado_pedido FROM pedidos WHERE Id_pedido = ?;';
        $params = array($this->idPedido);
        return Database::getRows($sql, $params);
    }
    public function readOne2()
    {
        $sql = 'SELECT * FROM pedido_view_two_II WHERE id_pedido = ?;';
        $params = array($this->idPedido);
        return Database::getRows($sql, $params);
    }
    public function updateRow()
    {
        $sql = 'UPDATE pedidos SET estado_pedido = ? WHERE id_pedido = ?';
        $params = array(
            $this->estadoPedido,
            $this->idPedido
        );
        return Database::executeRow($sql, $params);
    }




    //METODOS A UTILIZARSE EN EL SITIO PUBLICO


    // Método para verificar si existe un pedido en proceso con el fin de iniciar o continuar una compra.
    public function getOrder()
    {
        $this->estadoPedido = 'Pendiente';
        $sql = 'SELECT id_pedido
                FROM pedidos
                WHERE estado_pedido = ? AND id_cliente = ?';
        $params = array($this->estadoPedido, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['id_pedido'];
            return true;
        } else {
            return false;
        }
    }

    // Método para iniciar un pedido en proceso.
    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            $sql = 'INSERT INTO pedidos(direccion_pedido, id_cliente)
                    VALUES((SELECT direccion_cliente FROM clientes WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente']);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'CALL crear_detalle_pedido (?,?,?,?,?);';
        $params = array($_SESSION['idPedido'], $this->cantidad, $this->producto, $this->idCupon, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readDetail()
    {
        $sql = 'SELECT id_detalle_pedido, nombre_producto, detalles_pedidos.precio_detalle_pedido, detalles_pedidos.cantidad_detalle_pedido
                FROM detalles_pedidos
                INNER JOIN pedidos USING(id_pedido)
                INNER JOIN productos USING(id_producto)
                WHERE id_pedido = ?';
        $params = array($_SESSION['idPedido']);
        return Database::getRows($sql, $params);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estadoPedido = 'Finalizado';
        $sql = 'UPDATE pedidos
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estadoPedido, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE detalles_pedidos
                SET cantidad_detalle_pedido = ?
                WHERE id_detalle_pedido = ? AND id_pedido = ?';
        $params = array($this->cantidad, $this->idDetalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM detalles_pedidos
                WHERE id_detalle_pedido = ? AND id_pedido = ?';
        $params = array($this->idDetalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }
}