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


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */
    public function createRow()
    {
        $sql = 'CALL agregar_cupon_PA (?, ?, ?);';
        $params = array($this->codigo_cupon, $this->porcentaje_cupon, $this->estado_cupon);
        return Database::executeRow($sql, $params);
    }
}
