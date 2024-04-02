<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla permisos.
 */
class permisos_handler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_permiso = null;
    protected $nombre_permiso = null;
    protected $agac_usuario_permiso = null;
    protected $eliminar_usuario_permiso = null;
    protected $agac_producto_permiso = null;
    protected $eliminar_producto_permiso = null;
    protected $borrar_comentario_permiso = null;
    protected $agac_categoria_permiso = null;
    protected $eliminar_categoria_permiso = null;
    protected $gestionar_cupon_permiso = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     *
     */

     public function searchRows()
    {
    $value = '%' . Validator::getSearchValue() . '%';
    $sql = 'SELECT id_permiso, nombre_permiso 
            FROM permisos
            WHERE nombre_permiso LIKE ? 
            ORDER BY SUBSTRING(nombre_permiso, 1, 1), nombre_permiso;';
    $params = array($value);
    return Database::getRows($sql, $params);
    }

 
     public function createRow()
     {  
         $sql = 'INSERT INTO permisos(nombre_permiso, agregar_actualizar_usuario, 
         eliminar_usuario, agregar_actualizar_producto, eliminar_producto, borrar_comentario,
         agregar_actualizar_categoria, borrar_categoria, gestionar_cupon) VALUE (?,?,?,?,?,?,?,?,?);';
         $params = array($this->nombre_permiso, $this->agac_usuario_permiso, $this->eliminar_usuario_permiso, $this->agac_producto_permiso, $this->eliminar_producto_permiso,
        $this->borrar_comentario_permiso, $this-> agac_categoria_permiso, $this->eliminar_categoria_permiso, $this->gestionar_cupon_permiso );
         return Database::executeRow($sql, $params);
     }
 

    public function readAll()
    {
        $sql = 'SELECT id_permiso, nombre_permiso 
        FROM permisos
        ORDER BY SUBSTRING(nombre_permiso, 1, 1), nombre_permiso;';
        return Database::getRows($sql);
    }

    public function updateRow()
    {
        $sql = 'UPDATE permisos SET nombre_permiso = ?, agregar_actualizar_usuario = ?, 
        eliminar_usuario = ?, agregar_actualizar_producto = ?, eliminar_producto = ?, borrar_comentario = ?,
        agregar_actualizar_categoria = ?, borrar_categoria = ?, gestionar_cupon = ? WHERE id_permiso = ?;';
        $params = array($this->nombre_permiso, $this->agac_usuario_permiso, $this->eliminar_usuario_permiso, $this->agac_producto_permiso, $this->eliminar_producto_permiso,
       $this->borrar_comentario_permiso, $this-> agac_categoria_permiso, $this->eliminar_categoria_permiso, $this->gestionar_cupon_permiso, $this->id_permiso );
        return Database::executeRow($sql, $params);
    }
    public  function readOne()
    {
        $sql = 'SELECT * FROM permisos WHERE id_permiso = ?';
        $params = array($this->id_permiso);
        return Database::getRows($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM permisos  WHERE id_permiso = ?;';
        $params = array($this->id_permiso);
        return Database::executeRow($sql, $params);
    }
    
}