<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/categorias_handler.php');

class CategoriasData extends CategoriasHandler
{

    private $data_error = null;
    private $filename = null;

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

    public function setNombreCategoria($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombreCategoria = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    public function setNombreMascota($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            if ($value == 'Perro' || $value == 'Perros') {
                $this->nombreAnimal = 'Perro';
                return true;
            } elseif ($value == 'Gato' || $value == 'Gatos') {
                $this->nombreAnimal = 'Gato';
                return true;
            } else {
                $this->data_error = 'El nombre de la mascota debe ser Perro o Gato';
                return false;
            }
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    public function setDescripcionCategoria($value, $min = 2, $max = 250)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->descripcionCategoria = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return false;
        }
    }

    public function setImagenCategoria($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
            $this->imagenCategoria = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagenCategoria = $filename;
            return true;
        } else {
            $this->imagenCategoria = 'default.png';
            return true;
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

    public function setFileName()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen_categoria'];
            return true;
        } else {
            $this->data_error = 'Categoría inexistente';
            return false;
        }
    }
}
