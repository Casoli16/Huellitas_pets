<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/valoraciones_handler.php');

class ValoracionesData extends ValoracionesHandler
{

    private $data_error = null;
    private $filename = null;

    public function setIdValoracion($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idValoracion = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setIdCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idCliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setIdProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idProducto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setComentarioValoracion($value, $min = 2, $max = 250)
    {
        if (!$value) {
            return true;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->comentarioValoracion = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setCalificaionValoracion($value, $min = 1, $max = 5)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->calificacionValoracion = $value;
            return true;
        } else {
            $this->data_error = 'La valoración debe tener al menos una estrella';
            return false;
        }
    }

    public function setEstadoValoracion($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->estadoValoracion = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }

    public  function setFechaRegistro($value)
    {
        $this->fechaValoracion = $value;
        return true;
    }

    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
