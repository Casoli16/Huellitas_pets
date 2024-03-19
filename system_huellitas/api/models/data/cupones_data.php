<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/cupones_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class cupones_data extends cupones_handler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setIdCupon($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setCodigoCupon($value, $min = 7, $max = 8)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El codigo debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El codigo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setPorcentajeCupon($value, $min = 5, $max = 100)
    {
        if (Validator::validateNaturalNumber($value) && Validator::validateMaxAdnMinNumber($value, $min, $max)) {
            $this->porcentaje_cupon = $value;
            return true;
        }  
     else {
        $this->data_error = 'El porcentaje es incorrecto';
        return false;
    }
    }

    public function setestado_cupon($value)
    {
        if (Validator::validateBoolean($value)) {
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
