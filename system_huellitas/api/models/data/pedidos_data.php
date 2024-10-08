<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/pedidos_handler.php');

class PedidosData extends PedidosHandler
{

    private $data_error = null;
    private $filename = null;

    public function setIdPedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idPedido = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setIdCupon($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idCupon = $value;
            return true;
        } else if ($value == 0) {
            $this->idCupon = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cupón es incorrecto';
            return false;
        }
    }


    public function setIdDetallePedido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idDetalle = $value;
            return true;
        } else {
            $this->data_error = 'El identificador es incorrecto';
            return false;
        }
    }

    public function setDatos($value)
    {
        $this->datos = $value;
        return true;
    }

    public function setImagen($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
            $this->imagen = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen = $filename;
            return true;
        } else {
            $this->imagen = 'default.png';
            return true;
        }
    }

    public function setImagen2($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
            $this->imagen2 = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->imagen2 = $filename;
            return true;
        } else {
            $this->imagen2 = 'default.png';
            return true;
        }
    }
    public function getReporteImagen()
    {
        return $this->imagen;
    }
    public function getReporteImagen2()
    {
        return $this->imagen2;
    }
    public function getReporteDatos()
    {
        return $this->datos;
    }
    public function setEstadoPedido($value, $min = 6, $max = 12)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El contenido debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->estadoPedido = $value;
            return true;
        } else {
            $this->data_error = 'El contenido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setPrecio($value)
    {
        if (Validator::validateMoney($value)) {
            $this->precio = $value;
            return true;
        } else {
            $this->data_error = 'El precio debe ser un valor numérico';
            return false;
        }
    }

    public function setProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->producto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    public function setCantidad($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad del producto debe ser mayor o igual a 1';
            return false;
        }
    }

    public function setIdDetalle($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idDetalle = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle pedido es incorrecto';
            return false;
        }
    }

    public function setDireccion($value)
    {
        $this->direccion = $value;
        return true;
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
