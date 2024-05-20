<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cupones.
 */
class ValoracionesHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $idValoracion = null;
    protected $calificacionValoracion = null;
    protected $comentarioValoracion = null;
    protected $fechaValoracion = null;
    protected $estadoValoracion = null;
    protected $idDetalleedido = null;

    const RUTA_IMAGEN = '../../images/productos/';


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     * Aunque ahorita solo haré el de agregar cupones
     */
    // SEARCH
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_valoracion, nombre_producto, imagen_producto, calificacion_valoracion, comentario_valoracion, fecha_valoracion, estado_valoracion, nombre_cliente, apellido_cliente
                FROM valoraciones v
                INNER JOIN detalles_pedidos dp ON v.id_detalle_pedido = dp.id_detalle_pedido
                INNER JOIN productos p ON dp.id_producto = p.id_producto
                INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
                INNER JOIN clientes c ON pe.id_cliente = c.id_cliente
                WHERE nombre_producto LIKE ?
                ORDER BY c.nombre_cliente;';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    // READ ALL
    public function readAll()
    {
        $sql = 'SELECT id_valoracion, nombre_producto, imagen_producto, calificacion_valoracion, comentario_valoracion, DATE_FORMAT(fecha_valoracion, "%d de %M del %Y") AS fecha_valoracion, estado_valoracion, nombre_cliente, apellido_cliente
                FROM valoraciones v
                INNER JOIN detalles_pedidos dp ON v.id_detalle_pedido = dp.id_detalle_pedido
                INNER JOIN productos p ON dp.id_producto = p.id_producto
                INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
                INNER JOIN clientes c ON pe.id_cliente = c.id_cliente
                ORDER BY nombre_cliente';
        return Database::getRows($sql);
    }

    //    Leer un registro de una valoracion
    public function readOne(){
        $sql = 'SELECT id_valoracion, nombre_producto, imagen_producto, calificacion_valoracion, comentario_valoracion, fecha_valoracion, estado_valoracion, nombre_cliente, apellido_cliente
                FROM valoraciones v
                INNER JOIN detalles_pedidos dp ON v.id_detalle_pedido = dp.id_detalle_pedido
                INNER JOIN productos p ON dp.id_producto = p.id_producto
                INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
                INNER JOIN clientes c ON pe.id_cliente = c.id_cliente
                WHERE id_valoracion = ?';
        $params = array($this->idValoracion);
        return Database::getRows($sql, $params);
    }

    //    Actualizar una valoracion
    public function updateRow(){
        $sql = 'UPDATE valoraciones 
                SET estado_valoracion = ?
                WHERE id_valoracion = ?';
        $params = array(
            $this->estadoValoracion,
            $this->idValoracion
        );
        return Database::executeRow($sql, $params);
    }
}

