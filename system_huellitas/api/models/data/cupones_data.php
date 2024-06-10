<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/cupones_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class CuponesData extends CuponesHandler
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
            $this->idCupon = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setCodigoCupon($value, $min = 4, $max = 8)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El codigo debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->codigoCupon = $value;
            return true;
        } else {
            $this->data_error = 'El codigo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setPorcentajeCupon($value, $min = 5, $max = 81)
    {
        if (Validator::validateNaturalNumber($value) && Validator::validateMaxAdnMinNumber($value, $min, $max)) {
            $this->porcentajeCupon = $value;
            return true;
        } else {
            $this->data_error = '¡El máximo de porcentaje de un cupón es 80%, modificalo por favor!';
            return false;
        }
    }

    public function setestado_cupon($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->estadoCupon = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }

    public function setfecha_cupon($value)
    {
        if (Validator::validateDate($value)) {
            $this->fechaCupon = $value;
            return true;
        } else {
            $this->data_error = 'Digite la fecha de correctamente';
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
