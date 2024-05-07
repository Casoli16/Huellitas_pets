<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cupones.
 */
class CategoriasHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idCategoria = null;
    protected $nombreCategoria = null;
    protected $descripcionCategoria = null;
    protected $imagenCategoria = null;
    
    const RUTA_IMAGEN = '../../images/categorias/';


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */
    // SEARCH
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT *
                FROM categorias
                WHERE nombre_categoria LIKE ?
                ORDER BY nombre_categoria';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    //    Crear producto
    public function createRow(){
        $sql = 'INSERT INTO categorias (nombre_categoria, descripcion_categoria, imagen_categoria) 
        VALUES (?, ?, ?)';
        $params = array(
            $this->nombreCategoria,
            $this->descripcionCategoria,
            $this->imagenCategoria
        );
        return Database::executeRow($sql, $params);
    }

    // READ ALL
    public function readAll()
    {
        $sql = 'SELECT *
                FROM categorias
                ORDER BY nombre_categoria';
        return Database::getRows($sql);
    }

    //    Leer un registro de un producto
    public function readOne(){
        $sql = 'SELECT * FROM categorias WHERE id_categoria = ?';
        $params = array($this->idCategoria);
        return Database::getRows($sql, $params);
    }

    //    Actualizar un producto
    public function updateRow(){
        $sql = 'UPDATE categorias 
                SET nombre_categoria = ?, descripcion_categoria = ?, imagen_categoria = ? 
                WHERE id_categoria = ?';
        $params = array(
            $this->nombreCategoria,
            $this->descripcionCategoria,
            $this->imagenCategoria,
            $this->idCategoria,
        );
        return Database::executeRow($sql, $params);
    }

    //    Eliminar producto
    public function deleteRow(){
        $sql = 'DELETE FROM categorias WHERE id_categoria = ?';
        $params = array($this->idCategoria);
        return Database::executeRow($sql, $params);
    }
}

