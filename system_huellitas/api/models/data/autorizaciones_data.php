<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/autorizaciones_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla permisos.
 */
class AutorizacionesData extends AutorizacionesHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;
    private $permisos = null;

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

    public function getPermisos()
    {
        return $this->permisos;
    }
}
