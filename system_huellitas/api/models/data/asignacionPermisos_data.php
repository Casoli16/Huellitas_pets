<?php

//Clase que validara los datos de entrada.
require_once ('../../helpers/validator.php');
//Se incluye la clase padre
require_once ('../../models/handler/asignacionPermisos_handler.php');

class AsignacionPermisosData extends  AsignacionPermisosHandler
{
    private $data_error = null;
    private $filename = null;

    public function setIdAsignacionPermiso($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idAsignacionPermiso = $value;
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

    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}