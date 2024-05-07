<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/categorias_handler.php');

class CategoriasData extends CategoriasHandler{

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
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setDescripcioCategoria($value, $min = 2, $max = 250)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->descripcionCategoria = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setImagenCategoria($file, $filename = null)
    {
        if(Validator::validateImageFile($file, 1000)){
            $this->imagenCategoria = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()){
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename){
            $this->imagenCategoria = $filename;
            return true;
        } else{
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
}