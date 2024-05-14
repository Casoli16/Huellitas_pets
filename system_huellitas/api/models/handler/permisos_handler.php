<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla permisos.
 */
class PermisosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idPermiso = null;
    protected $nombrePermiso = null;
    protected $idAdmin = null;
    protected $verUsuario = null;
    protected $verCliente = null;
    protected $verMarca = null;
    protected $verPedido = null;
    protected $verComentario = null;
    protected $verProducto = null;
    protected $verCategoria = null;
    protected $verCupon = null;
    protected $verPermiso = null;



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
            $this->nombrePermiso,
            $this->verUsuario,
            $this->verCliente,
            $this->verMarca,
            $this->verPedido,
            $this->verComentario,
            $this->verProducto,
            $this->verCategoria,
            $this->verCupon,
            $this->verPermiso
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
            $this->nombrePermiso, 
            $this->verUsuario, 
            $this->verCliente, 
            $this->verMarca, 
            $this->verPedido, 
            $this->verComentario, 
            $this->verProducto, 
            $this->verCategoria, 
            $this->verCupon, 
            $this->verPermiso, 
            $this->idPermiso
        );

        // Se ejecuta la consulta y se retorna el resultado
        return Database::executeRow($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT * FROM permisos WHERE id_permiso = ?';
        $params = array($this->idPermiso);
        return Database::getRows($sql, $params);
    }

    public function readOneAdmin()
    {
        $sql = 'SELECT * FROM vista_permisos_administrador WHERE id_admin =?;';
        $params = array($this->idAdmin);
        return Database::getRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM permisos  WHERE id_permiso = ?;';
        $params = array($this->idPermiso);
        return Database::executeRow($sql, $params);
    }

}