<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/marcas_handler.php');

class marcasData extends marcas_handler{

    private $data_error = null;
    private $filename = null;

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

    public function setNombreMarca($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombreMarca = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setImagenMarca($file, $filename = null)
    {
        if(Validator::validateImageFile($file, 1000)){
            $this->imagenMarca = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()){
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename){
            $this->imagenMarca = $filename;
            return true;
        } else{
            $this->imagenMarca = 'default.png';
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