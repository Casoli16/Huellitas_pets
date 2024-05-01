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
    protected $id_admin = null;
    protected $agac_usuario_permiso = null;
    protected $eliminar_usuario_permiso = null;
    protected $agac_producto_permiso = null;
    protected $eliminar_producto_permiso = null;
    protected $borrar_comentario_permiso = null;
    protected $agac_categoria_permiso = null;
    protected $eliminar_categoria_permiso = null;
    protected $gestionar_cupon_permiso = null;
    protected $ver_usuario = null;
    protected $ver_producto = null;
    protected $ver_comentario = null;
    protected $ver_categoria = null;
    protected $ver_cupon = null;
    protected $eliminar_cliente_permiso = null;
    protected $ver_cliente = null;
    protected $agac_marca_permiso = null;
    protected $eliminar_marca_permiso = null;
    protected $ver_marca = null;
    protected $estado_pedido_permiso = null;
    protected $eliminar_pedido_permiso = null;
    protected $ver_pedido = null;
    protected $agac_permiso_permiso = null;
    protected $eliminar_permiso_permiso = null;
    protected $ver_permiso = null;



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
         $sql = 'INSERT INTO nombre_permiso, agregar_actualizar_usuario, ver_usuario, eliminar_usuario, borrar_cliente, ver_cliente, agregar_actualizar_marca, borrar_marca, 
         ver_marca, estado_pedido, borrar_pedido, ver_pedido, ocultar_comentario, ver_comentario, agregar_actualizar_producto, ver_producto, eliminar_producto, agregar_actualizar_categoria, ver_categoria, 
         borrar_categoria, ver_cupon, gestionar_cupon, agregar_actualizar_permiso, borrar_permiso, ver_permiso) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
         $params = array(
         $this->nombre_permiso,
         $this->agac_usuario_permiso,
         $this->ver_usuario,
         $this->eliminar_usuario_permiso,
         $this->eliminar_cliente_permiso,
         $this->ver_cliente,
         $this->agac_marca_permiso,
         $this->eliminar_marca_permiso,
         $this->ver_marca,
         $this->estado_pedido_permiso,
         $this->eliminar_pedido_permiso,
         $this->ver_pedido,
         $this->borrar_comentario_permiso,
         $this->ver_comentario,
         $this->agac_producto_permiso,
         $this->ver_producto,
         $this->eliminar_producto_permiso,
         $this->agac_categoria_permiso,
         $this->ver_categoria,
         $this->eliminar_categoria_permiso,
         $this->ver_cupon,
         $this->gestionar_cupon_permiso,
         $this->agac_permiso_permiso,
         $this->eliminar_permiso_permiso,
         $this->ver_permiso);
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
        $sql = 'UPDATE permisos SET 
        nombre_permiso = ?, 
        agregar_actualizar_usuario = ?, 
        ver_usuario = ?, 
        eliminar_usuario = ?, 
        borrar_cliente = ?, 
        ver_cliente = ?, 
        agregar_actualizar_marca = ?, 
        borrar_marca = ?, 
        ver_marca = ?, 
        estado_pedido = ?, 
        borrar_pedido = ?, 
        ver_pedido = ?, 
        ocultar_comentario = ?, 
        ver_comentario = ?, 
        agregar_actualizar_producto = ?, 
        ver_producto = ?, 
        eliminar_producto = ?, 
        agregar_actualizar_categoria = ?, 
        ver_categoria = ?, 
        borrar_categoria = ?, 
        ver_cupon = ?, 
        gestionar_cupon = ?, 
        agregar_actualizar_permiso = ?, 
        borrar_permiso = ?, 
        ver_permiso = ? 
    WHERE id_permiso = ?';
        $params = array(
         $this->nombre_permiso,
         $this->agac_usuario_permiso,
         $this->ver_usuario,
         $this->eliminar_usuario_permiso,
         $this->eliminar_cliente_permiso,
         $this->ver_cliente,
         $this->agac_marca_permiso,
         $this->eliminar_marca_permiso,
         $this->ver_marca,
         $this->estado_pedido_permiso,
         $this->eliminar_pedido_permiso,
         $this->ver_pedido,
         $this->borrar_comentario_permiso,
         $this->ver_comentario,
         $this->agac_producto_permiso,
         $this->ver_producto,
         $this->eliminar_producto_permiso,
         $this->agac_categoria_permiso,
         $this->ver_categoria,
         $this->eliminar_categoria_permiso,
         $this->ver_cupon,
         $this->gestionar_cupon_permiso,
         $this->agac_permiso_permiso,
         $this->eliminar_permiso_permiso,
         $this->ver_permiso,
         $this->id_permiso);
        return Database::executeRow($sql, $params);
    }
    public  function readOne()
    {
        $sql = 'SELECT * FROM permisos WHERE id_permiso = ?';
        $params = array($this->id_permiso);
        return Database::getRows($sql, $params);
    }

    public  function readOneAdmin()
    {
        $sql = 'SELECT * FROM vista_permisos_administrador WHERE id_admin =?;';
        $params = array($this->id_admin);
        return Database::getRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM permisos  WHERE id_permiso = ?;';
        $params = array($this->id_permiso);
        return Database::executeRow($sql, $params);
    }
    
}