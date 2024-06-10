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
    protected $categoria = null;
    protected $marca = null;
    protected $idCliente = null;
    protected $codigo = null;

    const RUTA_IMAGEN = '../../images/productos/';

    //    Buscar un producto
    public function searchProducts()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_producto, nombre_producto, precio_producto, nombre_categoria, imagen_producto, mascotas, id_categoria
            FROM productos
            INNER JOIN categorias USING(id_categoria)
            WHERE productos.nombre_producto LIKE ? OR nombre_categoria LIKE ?';
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

    // Selecciona los productos de acuerdo a su id
    public function readOneProduct()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, 
        existencia_producto, nombre_marca, nombre_categoria, existencia_producto  FROM productosView WHERE id_producto = ?';
        $params = array($this->idProducto);
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
        $sql = 'INSERT INTO productos (nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, existencia_producto, mascotas, id_categoria, id_marca) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array(
            $this->nombreProducto,
            $this->descripcionProducto,
            $this->precioProducto,
            $this->imagenProducto,
            $this->estadoProducto,
            $this->existenciaProducto,
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

    //    Leer las marcas en base a su estado y animal
    public function readOneMarcas()
    {
        $sql = 'SELECT DISTINCT idMarca, mascotas, estadoProducto, marca FROM vista_mascotas_marca WHERE mascotas = ? AND estadoProducto = 1';
        $params = array($this->mascotas);
        return Database::getRows($sql, $params);
    }

    //    Leer las marcas en base a su estado y animal
    public function readOneCategorias()
    {
        $sql = 'SELECT DISTINCT idCategoria, mascotas, estadoProducto, categoria
            FROM vista_mascotas_categoria
            WHERE mascotas = ? AND estadoProducto = 1;';
        $params = array($this->mascotas);
        return Database::getRows($sql, $params);
    }

    //    Leer las marcas en base a su estado y animal
    public function readOneMarca()
    {
        $sql = 'SELECT * FROM vista_productos_puntuacion WHERE id_marca = ? AND mascota = ? ORDER BY puntuacion_producto DESC';
        $params = array($this->marca, $this->mascotas);
        return Database::getRows($sql, $params);
    }

    //    Leer las marcas en base a su estado y animal
    public function readOneCategoria()
    {
        $sql = 'SELECT * FROM vista_productos_puntuacion WHERE id_categoria = ? AND mascota = ?  ORDER BY puntuacion_producto DESC';
        $params = array($this->categoria, $this->mascotas);
        return Database::getRows($sql, $params);
    }

    //    Leer las marcas en base a su estado y animal
    public function readAllProducts()
    {
        $sql = 'SELECT * FROM vista_productos_puntuacion WHERE estado_producto = 1 ORDER BY puntuacion_producto DESC';
        return Database::getRows($sql);
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
                estado_producto = ?, existencia_producto = ?, mascotas = ?, id_categoria = ?, id_marca = ?
                WHERE id_producto = ?';
        $params = array(
            $this->nombreProducto,
            $this->descripcionProducto,
            $this->precioProducto,
            $this->imagenProducto,
            $this->estadoProducto,
            $this->existenciaProducto,
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

    // Leer si un cupon es valido
    public function readOneCupon()
    {
        $sql = 'SELECT * FROM vista_cupones_cliente WHERE id_cliente = ? AND codigo_cupon = ?;';
        $params = array($this->idCliente, $this->codigo);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_producto
                FROM productos
                WHERE id_producto= ?';
        $params = array($this->idProducto);
        return Database::getRow($sql, $params);
    }
}
