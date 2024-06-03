<?php

require_once('config.php');

class Database
{
    private static $connection = null;
    private static $statement = null;
    private static $error = null;

    public static function executeRow($query, $values)
    {
        try{
            self::$connection = new PDO('mysql:host=' . SERVER . ';dbname=' . DATABASE, USERNAME, PASSWORD);
            self::$statement = self::$connection->prepare($query);
            return self::$statement->execute($values);
        } catch (PDOException $error) {
            // Se obtiene el código y el mensaje de la excepción para establecer un error personalizado.
            self::setException($error->getCode(), $error->getMessage());
            return false;
        }
    }

    /*
 *   Método para obtener el valor de la llave primaria del último registro insertado.
 *   Parámetros: $query (sentencia SQL) y $values (arreglo con los valores para la sentencia SQL).
 *   Retorno: numérico entero (último valor de la llave primaria si la sentencia se ejecuta satisfactoriamente o 0 en caso contrario).
 */
    public static function getLastRow($query, $values)
    {
        if (self::executeRow($query, $values)) {
            $id = self::$connection->lastInsertId();
        } else {
            $id = 0;
        }
        return $id;
    }

    public static function getRow($query, $values = null)
    {
        if(self::executeRow($query, $values)){
            return self::$statement->fetch(PDO::FETCH_ASSOC);
        } else{
            return false;
        }
    }

    public static function getRows($query, $values = null)
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
    public static function executeRow2($query, $values = null)
{
    try{
        self::$connection = new PDO('mysql:host=' . SERVER . ';dbname=' . DATABASE, USERNAME, PASSWORD);
        self::$statement = self::$connection->prepare($query);
        // Verificamos si se proporcionaron valores antes de ejecutar la consulta
        if ($values !== null) {
            return self::$statement->execute($values);
        } else {
            return self::$statement->execute();
        }
    } catch (PDOException $error) {
        // Se obtiene el código y el mensaje de la excepción para establecer un error personalizado.
        self::setException($error->getCode(), $error->getMessage());
        return false;
    }
}

}