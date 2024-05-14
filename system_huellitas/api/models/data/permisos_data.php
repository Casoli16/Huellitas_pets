<?php
// Se incluye la clase para validar los datos de entrada.
require_once ('../../helpers/validator.php');
// Se incluye la clase padre.
require_once ('../../models/handler/permisos_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class PermisosData extends PermisosHandler
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
            $this->idPermiso = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setIdAdmin($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idAdmin = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setNombrePermiso($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanúmerico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombrePermiso = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }






    public function setVerUsuario($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verUsuario = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setVerProducto($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verProducto = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setVerComentario($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verComentario = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setVerCategoria($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verCategoria = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }

    public function setVerCupon($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verCupon = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }

    public function setVerPermiso($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verPermiso = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }


    public function setVerCliente($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verCliente = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }

    public function setVerMarca($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verMarca = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }
    public function setVerPedido($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->verPedido = $value;
            return true;
        } else {
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
