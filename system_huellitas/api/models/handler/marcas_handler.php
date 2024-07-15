<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cupones.
 */
class MarcasHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idMarca = null;
    protected $nombreMarca = null;
    protected $imagenMarca = null;

    const RUTA_IMAGEN = '../../images/marcas/';


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */
    // SEARCH
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT nombre_marca, imagen_marca
                FROM marcas
                WHERE nombre_marca LIKE ?
                ORDER BY nombre_marca';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    //    Crear producto
    public function createRow()
    {
        $sql = 'INSERT INTO marcas (nombre_marca, imagen_marca) 
        VALUES (?, ?)';
        $params = array(
            $this->nombreMarca,
            $this->imagenMarca
        );
        return Database::executeRow($sql, $params);
    }

    // READ ALL
    public function readAll()
    {
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca 
                FROM marcas
                ORDER BY nombre_marca';
        return Database::getRows($sql);
    }

    //    Leer un registro de un producto
    public function readOne()
    {
        $sql = 'SELECT * FROM marcas WHERE id_marca = ?';
        $params = array($this->idMarca);
        return Database::getRows($sql, $params);
    }

    //     Leer la imagen del producto
    public function readFilename()
    {
        $sql = 'SELECT imagen_marca
                FROM marcas
                WHERE id_marca = ?';
        $params = array($this->idMarca);
        return Database::getRow($sql, $params);
    }

    //    Actualizar un producto
    public function updateRow()
    {
        $sql = 'UPDATE marcas 
                SET nombre_marca = ?, imagen_marca = ? 
                WHERE id_marca = ?';
        $params = array(
            $this->nombreMarca,
            $this->imagenMarca,
            $this->idMarca
        );
        return Database::executeRow($sql, $params);
    }

    //    Eliminar producto
    public function deleteRow()
    {
        $sql = 'DELETE FROM marcas WHERE id_marca = ?';
        $params = array($this->idMarca);
        return Database::executeRow($sql, $params);
    }


    /// Funciones para reportes

    ///Funcion que devuelve la cantidad de productos por marcas.
    public function productsByMarcas()
    {
        $sql =  'SELECT * FROM cantidad_productos_marcas';
        return Database::getRows($sql);
    }

    //Funcion que devuelve la marca con mas productos
    public function marca_con_mas_productos()
    {
        $sql =  'SELECT * FROM cantidad_productos_marcas ORDER BY cantidad_total_productos DESC LIMIT 1;';
        return Database::getRow($sql);
    }

    //Funcion que devuelve los productos de una marca
    public function productosMarca()
    {
        $sql =  'SELECT * FROM productos_by_marca WHERE idMarca = ?;';
        $params = array($this->idMarca);
        return Database::getRows($sql, $params);
    }

    //Funcion que devuelve la cantidad total de productos de una marca por el idMarca
    public function productsTotalByIdMarca()
    {
        $sql =  'SELECT SUM(cantidad) AS total FROM productos_by_marca WHERE idMarca= ?;';
        $params = array($this->idMarca);
        return Database::getRow($sql, $params);
    }
}
