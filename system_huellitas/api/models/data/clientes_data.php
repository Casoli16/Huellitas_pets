<?php

//Clase que validara los datos de entrada.
require_once('../../helpers/validator.php');
//Se incluye la clase padre
require_once('../../models/handler/clientes_handler.php');

class ClientesData extends  ClientesHandler
{
    private $data_error = null;
    private $filename = null;

    public function setIdCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idCliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return  false;
        }
    }

    public function setNombreCliente($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El nombre debe ser un valor alfanúmerico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombreCliente = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return  false;
        }
    }

    public function setApellidoCliente($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El apellido debe ser un valor alfanúmerico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->apellidoCliente = $value;
            return true;
        } else {
            $this->data_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return  false;
        }
    }

    public function setCorreoCliente($value)
    {
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'Ingrese un correo válido';
            return false;
        } else {
            $this->correoCliente = $value;
            return true;
        }
    }

    public function setDuiCliente($value)
    {
        if (!Validator::validateDUI($value)) {
            $this->data_error = 'Ingrese un DUI válido';
            return false;
        } else {
            $this->duiCliente = $value;
            return true;
        }
    }

    public function setTelefonoCliente($value)
    {
        if (!Validator::validatePhone($value)) {
            $this->data_error = 'Ingrese un número de teléfono válido';
            return false;
        } else {
            $this->telefonoCliente = $value;
            return true;
        }
    }

    public function setFechaNacimiento($value)
    {
        if (!Validator::validateDate($value)) {
            $this->data_error = 'Ingrese una fecha válida';
            return false;
        } else {
            $this->fechaNacimientoCliente = $value;
            return true;
        }
    }

    public function setDireccionCliente($value, $min = 15, $max = 250)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->direccionCliente = $value;
            return true;
        } else {
            $this->data_error = 'La dirección debe tener una longitud entre ' . $min . ' y ' . $max . ' caracteres';
            return  false;
        }
    }

    public function setClaveCliente($value)
    {
        if (Validator::validatePassword($value)) {
            $this->claveCliente = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    public function setEstadoCliente($value)
    {
        $this->estadoCliente = $value;
        return true;
    }
    public function setFechaRegistro($value)
    {
        $this->fechaRegistroCliente = $value;
        return true;
    }

    public function setImagenCliente($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
            $this->imagenCliente = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagenCliente = $filename;
            return true;
        } else {
            $this->imagenCliente = 'default.png';
            return true;
        }
    }
    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['imagen_cliente'];
            return true;
        } else {
            $this->data_error = 'Administrador inexistente';
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
