<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cupones.
 */
class CuponesHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idCupon = null;
    protected $codigoCupon = null;
    protected $porcentajeCupon = null;
    protected $estadoCupon = null;
    protected $fechaCupon = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */

     public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT * FROM cupones_oferta_vista 
                WHERE codigo_cupon LIKE ? OR fecha_ingreso_cupon_formato LIKE ?;';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'CALL agregar_cupon_PA (?, ?, ?);';
        $params = array($this->codigoCupon, $this->porcentajeCupon, $this->estadoCupon);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql2 ='SET lc_time_names = ?;';
        $params = array('es_ES');
        Database::executeRow($sql2, $params);
        $sql = 'SELECT * FROM cupones_oferta_vista';
        return Database::getRows($sql);
    }

    public function updateRow()
    {
        $sql = 'CALL actualizar_cupon_PA (?, ?, ?, ?);';
        $params = array($this->codigoCupon, $this->porcentajeCupon, $this->estadoCupon, $this->idCupon);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM cupones_utilizados WHERE id_cupon = ?;
                DELETE FROM cupones_oferta  WHERE id_cupon = ?;';
        $params = array($this->idCupon, $this->idCupon);
        return Database::executeRow($sql, $params);
    }

    public  function readOne()
    {
        $sql = 'SELECT * FROM cupones_oferta WHERE id_cupon = ?;';
        $params = array($this->idCupon);
        return Database::getRows($sql, $params);
    }

    
}