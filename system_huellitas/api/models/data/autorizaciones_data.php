<?php
// Se incluye la clase para validar los datos de entrada.
require_once ('../../helpers/validator.php');
// Se incluye la clase padre.
require_once ('../../models/handler/autorizaciones_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla permisos.
 */
class autorizaciones_data extends autorizaciones_handler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;
    private $permisos = null;
    
    public function setIdAdmin($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_admin = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    
    /*
     * Método para guardar los permisos en un objeto
     */
    public function guardarPermisos($dataset)
    {
        // Creamos un objeto para almacenar los permisos
        $this->permisos = new stdClass();
        // Guardamos cada permiso en el objeto
        $this->permisos->id_admin = $dataset['id_admin'];
        $this->permisos->nombre_permiso = $dataset['nombre_permiso'];
        $this->permisos->ver_usuario = $dataset['ver_usuario'];
        $this->permisos->ver_cliente = $dataset['ver_cliente'];
        $this->permisos->ver_marca = $dataset['ver_marca'];
        $this->permisos->ver_pedido = $dataset['ver_pedido'];
        $this->permisos->ver_comentario = $dataset['ver_comentario'];
        $this->permisos->ver_producto = $dataset['ver_producto'];
        $this->permisos->ver_categoria = $dataset['ver_categoria'];
        $this->permisos->ver_cupon = $dataset['ver_cupon'];
        $this->permisos->ver_permiso = $dataset['ver_permiso'];
    }

    /*
     *  Métodos para obtener los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }

    public function getPermisos()
    {
        return $this->permisos;
    }
}
