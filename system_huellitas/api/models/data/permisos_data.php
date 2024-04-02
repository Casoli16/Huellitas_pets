<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/permisos_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class permisos_data extends permisos_handler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setIdPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_permiso= $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }


    public function setNombrePermiso($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)){
            $this->data_error = 'El nombre debe ser un valor alfanúmerico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)){
            $this->nombre_permiso = $value;
            return true;
        }
        else{
            $this->data_error= 'El nombre debe debe tener una longitud entre ' . $min . ' y ' . $max;
            return  false;
        }
    }
    public function setAgacUsuarioPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->agac_usuario_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setEliminarUsuarioPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->eliminar_usuario_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setAgacProductoPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->agac_producto_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setEliminarProductoPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->eliminar_producto_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setBorrarComentarioPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->borrar_comentario_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setAgacCategoriaPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->agac_categoria_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    } public function setEliminarCategoriaPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->eliminar_categoria_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setGestionarCuponPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->gestionar_cupon_permiso = $value;
            return true;
        } 
         else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
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
}
