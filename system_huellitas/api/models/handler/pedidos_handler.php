<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cupones.
 */
class pedidos_handler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_pedido_p = null;
    protected $nombre_cliente_p = null;
    protected $fecha_registro_P = null;
    protected $estado_pedido_p = null;
    protected $direccion_p = null;
    protected $total_p = null;
    protected $total_unidad_P = null;
    protected $cantidad_p_unidad = null;
    protected $cantidad_p_total = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */

     public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SET lc_time_names = "es_ES"; SELECT *
                FROM pedidos_view
                WHERE cliente LIKE ? OR fecha LIKE ?';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SET lc_time_names = "es_ES"; SELECT *
                FROM pedidos_view';
        return Database::getRows($sql);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM pedidos  WHERE id_pedido = ?;';
        $params = array($this->id_pedido_p);
        return Database::executeRow($sql, $params);
    }

    public  function readOne1()
    {
        $sql = 'SELECT * FROM pedido_view_one_I WHERE Id_pedido = ?;';
        $params = array($this->id_pedido_p);
        return Database::getRows($sql, $params);
    }
    public  function readOne2()
    {
        $sql = 'SELECT * FROM pedido_view_one_II WHERE Id_pedido = ?;';
        $params = array($this->id_pedido_p);
        return Database::getRows($sql, $params);
    }

    
}