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
    protected $nombreCliente = null;
    protected $fechaRegistro = null;
    protected $estadoPedido = null;
    protected $direccion = null;
    protected $total = null;
    protected $totalUnidad = null;
    protected $cantidadUnidad = null;
    protected $cantidadTotal = null;
    protected $imagenUnidad = null;
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
                fecha_registro_pedido AS dia,
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


}