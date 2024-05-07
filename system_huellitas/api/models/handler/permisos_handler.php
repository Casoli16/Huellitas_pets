<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
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
    protected $ver_usuario = null;
    protected $ver_cliente = null;
    protected $ver_marca = null;
    protected $ver_pedido = null;
    protected $ver_comentario = null;
    protected $ver_producto = null;
    protected $ver_categoria = null;
    protected $ver_cupon = null;
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
        $sql = 'INSERT INTO permisos (nombre_permiso, ver_usuario, ver_cliente, ver_marca, ver_pedido, ver_comentario, ver_producto, ver_categoria, ver_cupon, ver_permiso) VALUES (?,?,?,?,?,?,?,?,?,?);';
        $params = array(
            $this->nombre_permiso,
            $this->ver_usuario,
            $this->ver_cliente,
            $this->ver_marca,
            $this->ver_pedido,
            $this->ver_comentario,
            $this->ver_producto,
            $this->ver_categoria,
            $this->ver_cupon,
            $this->ver_permiso
        );
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
        // Se crea la consulta SQL para actualizar los permisos
        $sql = 'UPDATE permisos SET 
                    nombre_permiso = ?,
                    ver_usuario = ?,
                    ver_cliente = ?,
                    ver_marca = ?,
                    ver_pedido = ?,
                    ver_comentario = ?,
                    ver_producto = ?,
                    ver_categoria = ?,
                    ver_cupon = ?,
                    ver_permiso = ?
                WHERE id_permiso = ?';

        // Se crea el arreglo con los parámetros para la consulta
        $params = array(
            $this->nombre_permiso,
            $this->ver_usuario,
            $this->ver_cliente,
            $this->ver_marca,
            $this->ver_pedido,
            $this->ver_comentario,
            $this->ver_producto,
            $this->ver_categoria,
            $this->ver_cupon,
            $this->ver_permiso,
            $this->id_permiso
        );

        // Se ejecuta la consulta y se retorna el resultado
        return Database::executeRow($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT * FROM permisos WHERE id_permiso = ?';
        $params = array($this->id_permiso);
        return Database::getRows($sql, $params);
    }

    public function readOneAdmin()
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