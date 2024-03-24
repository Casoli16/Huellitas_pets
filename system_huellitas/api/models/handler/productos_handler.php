<?php

// Clase para trabajar con la base de datos
require_once('../../helpers/database.php');

// Declaración de atributos para el manejo de los datos
class productosHandler{
    protected $idProducto = null; 
    protected $nombreProducto = null;
    protected $descripcioProducto = null;
    protected $imagenProducto = null;
    protected $estadoProducto = null;
    protected $existenciaProducto = null;
    protected $fechaRegistro = null;
    protected $mascota = null;
    protected $idCategoria = null;
    protected $idMarca = null;

    public function searchRows(){

    }
    
    public function createRow(){
    
    }
    
    public function readAll(){
        $sql = 'SELECT * FROM productos ORDER BY fecha_registro_producto DESC';
        return Database::getRows($sql);
    }
    
    public function readOne(){
        $sql = 'SELECT * FROM productos WHERE id_producto = ?';
        $params = array($this->idProducto);
        return Database::getRows($sql, $params);
    }
    
    public function updateRow(){
    
    }
    
    public function deleteRow(){
    
    }
}


