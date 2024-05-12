<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/pedidos_handler.php');

class pedidos_data extends pedidos_handler{

    private $data_error = null;
    private $filename = null;

    public function setIdPedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_pedido_p = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setNombreCliente($value, $min = 3, $max = 20)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El contenido debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombreProducto = $value;
            return true;
        } else {
            $this->data_error = 'El contenido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setEstadoPedido($value, $min = 6, $max = 12)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El contenido debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->estado_pedido_p = $value;
            return true;
        } else {
            $this->data_error = 'El contenido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setMonth($value)
    {
        $this->monthNumber = $value;
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