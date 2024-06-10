<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/productos_handler.php');

class productosData extends productosHandler
{

    private $data_error = null;
    private $filename = null;

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

    public function setNombreProducto($value, $min = 2, $max = 50)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombreProducto = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    public function setCodigo($value, $min = 3, $max = 20)
    {
        if (!$value) {
            $this->data_error = 'Cupón vacío';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->codigo = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    public function setDescripcionProducto($value, $min = 2, $max = 250)
    {
        if (!$value) {
            return true;
        } elseif (!Validator::validateString($value)) {
            $this->data_error = 'La descripción contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcionProducto = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    public function setPrecioProducto($value)
    {
        if (Validator::validateMoney($value)) {
            $this->precioProducto = $value;
            return true;
        } else {
            $this->data_error = 'El precio debe ser un valor numérico';
            return false;
        }
    }


    public function setExistenciaProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->existenciaProducto = $value;
            return true;
        } else {
            $this->data_error = 'El valor de las existencias debe ser un número entero';
            return false;
        }
    }

    public function setIdCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idCategoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setIdMarca($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idMarca = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setMarca($value)
    {
        $this->marca = $value;
        return true;
    }

    public function setCategoria($value)
    {
        $this->categoria = $value;
        return true;
    }

    public function setImagenProducto($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
            $this->imagenProducto = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagenProducto = $filename;
            return true;
        } else {
            $this->imagenProducto = 'default.png';
            return true;
        }
    }

    public function setEstadoProducto($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->estadoProducto = $value;
            return true;
        } else {
            $this->data_error = 'Esto no es un booleano';
            return false;
        }
    }

    public  function setFechaRegistro($value)
    {
        $this->fechaRegistroProducto = $value;
        return true;
    }

    public  function setMascotas($value)
    {
        if ($value == 'Perro' || $value == 'Perros') {
            $this->mascotas = 'Perro';
            return true;
        } elseif ($value == 'Gato' || $value == 'Gatos') {
            $this->mascotas = 'Gato';
            return true;
        } else {
            $this->data_error = 'No es una mascota';
            return false;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen_producto'];
            return true;
        } else {
            $this->data_error = 'Producto inexistente';
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
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
