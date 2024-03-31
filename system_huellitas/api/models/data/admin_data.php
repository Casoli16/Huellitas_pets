<?php

//Clase que validara los datos de entrada.
require_once ('../../helpers/validator.php');
//Se incluye la clase padre
require_once ('../../models/handler/admin_handler.php');

class adminData extends adminHandler
{
    private $data_error = null;
    private $filename = null;

    public function setIdAdmin($value)
    {
        if (Validator::validateNaturalNumber($value)){
            $this->idAdministrador = $value;
            return true;
        } else{
            $this->data_error= 'El identificador es incorrecto';
            return  false;
        }
    }

    public function setNombreAdmin($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)){
            $this->data_error = 'El nombre debe ser un valor alfanúmerico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)){
            $this->nombreAdmin = $value;
            return true;
        }
        else{
            $this->data_error= 'El nombre debe debe tener una longitud entre ' . $min . ' y ' . $max;
            return  false;
        }
    }

    public function setApellidoAdmin($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)){
            $this->data_error = 'El nombre debe ser un valor alfanúmerico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)){
            $this->apellidoAdmin = $value;
            return true;
        }
        else{
            $this->data_error= 'El apellido debe debe tener una longitud entre ' . $min . ' y ' . $max;
            return  false;
        }
    }

    public function setCorreoAdmin($value)
    {
        if(!Validator::validateEmail($value)){
            $this->data_error = 'Ingrese un correo válido';
            return false;
        } else{
            $this->correoAdmin = $value;
            return true;
        }
    }

    public function setAliasAdmin($value, $min = 5, $max = 15)
    {
        if (!Validator::validateAlphanumeric($value)){
            $this->data_error = 'El alias debe ser un valor alfanumerico';
            return false;
        }elseif (Validator::validateLength($value, $min, $max)){
            $this->aliasAdmin = $value;
            return true;
        } else{
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . 'y' . $max;
            return false;
        }
    }

    public function setClaveAdmin($value)
    {
        if(Validator::validatePassword($value)){
            $this->claveAdmin = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else{
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    public function setFechaRegistro($value)
    {
        $this->fechaRegistroAdmin = $value;
        return true;
    }

    public function setImagenAdmin($value)
    {
        $this->imagenAdmin = $value;
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