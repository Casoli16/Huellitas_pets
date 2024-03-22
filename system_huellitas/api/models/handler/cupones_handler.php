<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cupones.
 */
class cupones_handler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_cupon = null;
    protected $codigo_cupon = null;
    protected $porcentaje_cupon = null;
    protected $estado_cupon = null;
    protected $fecha_cupon = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */

     public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_cupon, codigo_cupon, porcentaje_cupon, estado_cupon, fecha_ingreso_cupon 
                FROM cupones_oferta
                WHERE codigo_cupon LIKE ? OR fecha_ingreso_cupon LIKE ?
                ORDER BY fecha_ingreso_cupon DESC';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'CALL agregar_cupon_PA (?, ?, ?);';
        $params = array($this->codigo_cupon, $this->porcentaje_cupon, $this->estado_cupon);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_cupon, codigo_cupon, porcentaje_cupon, estado_cupon, fecha_ingreso_cupon 
                FROM cupones_oferta
                ORDER BY fecha_ingreso_cupon DESC';
        return Database::getRows($sql);
    }

    public function updateRow()
    {
        $sql = 'CALL actualizar_cupon_PA (?, ?, ?, ?);';
        $params = array($this->codigo_cupon, $this->porcentaje_cupon, $this->estado_cupon, $this->id_cupon);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM cupones_oferta  WHERE id_cupon = ?;';
        $params = array($this->id_cupon);
        return Database::executeRow($sql, $params);
    }
    
}