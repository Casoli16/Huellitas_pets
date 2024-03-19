<?php

require_once('config.php')

class Database
{
    private static $connection = null;
    private static $statement = null;
    private static $error = null;

    public static function executeRow($query, $values)
    {
        try{
            self::$connection = new PDO('mysql:host=' . SERVER . ';dbname' . DATABASE, USERNAME, PASSWORD);
            self::$statement = self::$connection->prepare($query);
            return self::$statement->execute($values)
        }catch(){

        }
    }

    public static function getRow($query, $values = null)
    {
        if(self::executeRow($query, $values)){
            return self::$statement->fetch(PDO::FETCH_ASSOC);
        } else{
            return false;
        }
    }

    public static function getRow($query, $values = null)
    {
        if(self::executeRow($query, $values)){
            return self::$statement->fetchAll(PDO::FETCH_ASSOC);
        } else{
            return false;
        }
    }

    private static function setException($code, $message)
    {
        self::$error = $message . PHP_EOL;

        switch ($code) {
            case '2002':
                self::$error = 'Servidor desconocido';
                break;
                case '1049':
                    self::$error = 'Base de datos desconocida';
                    break;
                case '1045':
                    self::$error = 'Acceso denegado';
                    break;
                case '42S02':
                    self::$error = 'Tabla no encontrada';
                    break;
                case '42S22':
                    self::$error = 'Columna no encontrada';
                    break;
                case '23000':
                    self::$error = 'Violación de restricción de integridad';
                    break;
                default:
                    self::$error = 'Ocurrió un problema en la base de datos';
        }
    }

    public static function getException(){
        
        return self::$error;
    }
}