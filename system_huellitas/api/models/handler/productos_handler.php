<?php

// Clase para trabajar con la base de datos
require_once('../../helpers/database.php');

// Declaración de atributos para el manejo de los datos
class productosHandler
{
    protected $idProducto = null;
    protected $nombreProducto = null;
    protected $descripcionProducto = null;
    protected $precioProducto = null;
    protected $imagenProducto = null;
    protected $estadoProducto = null;
    protected $existenciaProducto = null;
    protected $fechaRegistroProducto = null;
    protected $mascotas = null;
    protected $idCategoria = null;
    protected $idMarca = null;

    const RUTA_IMAGEN = '../../images/productos/';

    //    Buscar un producto
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, mascotas, fecha_registro_producto, nombre_categoria, estado_producto, mascotas
                FROM productosview
                WHERE nombre_producto LIKE ? OR mascotas LIKE ?
                ORDER BY nombre_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    // Selecciona los productos de perros
    public function readEspecificProducts()
    {
        $sql = 'SELECT * FROM productosView WHERE mascotas = ?';
        $params = array($this->mascotas);
        return Database::getRows($sql, $params);
    }

    // Selecciona el producto de acuerdo al id que se pase
    public function readEspecificProductsById()
    {
        $sql = 'SELECT * FROM productosView WHERE id_producto = ?';
        $params = array($this->idProducto);
        return Database::getRows($sql, $params);
    }

    //    Crear producto
    public function createRow()
    {
        $sql = 'INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, existencia_producto, fecha_registro_producto, mascotas, id_categoria, id_marca) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array(
            $this->nombreProducto,
            $this->descripcionProducto,
            $this->precioProducto,
            $this->imagenProducto,
            $this->estadoProducto,
            $this->existenciaProducto,
            $this->fechaRegistroProducto,
            $this->mascotas,
            $this->idCategoria,
            $this->idMarca
        );
        return Database::executeRow($sql, $params);
    }

    //    Leer todos los productos
    public function readAll()
    {
        $sql = 'SELECT * FROM productos ORDER BY fecha_registro_producto DESC';
        return Database::getRows($sql);
    }

    //    Leer un registro de un producto
    public function readOne()
    {
        $sql = 'SELECT * FROM productos WHERE id_producto = ?';
        $params = array($this->idProducto);
        return Database::getRows($sql, $params);
    }

    //Muestra el producto mas vendido
    public function readTopProduct()
    {
        $sql = 'SELECT * FROM producto_ventas_view';
        return Database::getRows($sql);
    }
    //    Actualizar un producto
    public function updateRow()
    {
        $sql = 'UPDATE productos
                SET nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, imagen_producto = ?,
                estado_producto = ?, existencia_producto = ?, fecha_registro_producto = ?, mascotas = ?, id_categoria = ?, id_marca = ?
                WHERE id_producto = ?';
        $params = array(
            $this->nombreProducto,
            $this->descripcionProducto,
            $this->precioProducto,
            $this->imagenProducto,
            $this->estadoProducto,
            $this->existenciaProducto,
            $this->fechaRegistroProducto,
            $this->mascotas,
            $this->idCategoria,
            $this->idMarca,
            $this->idProducto
        );
        return Database::executeRow($sql, $params);
    }

    //    Eliminar producto
    public function deleteRow()
    {
        $sql = 'DELETE FROM productos WHERE id_producto = ?';
        $params = array($this->idProducto);
        return Database::executeRow($sql, $params);
    }

}
