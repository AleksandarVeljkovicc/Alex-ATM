<?php
namespace Src\Config;

class Database
{
    private static $connection;

    public static function getConnection()
    {
        if (self::$connection === null) {
            $host = 'localhost';
            $dbname = 'alex_bank';
            $username = 'root';
            $password = 'php';

            try {
                self::$connection = new \PDO("mysql:host=$host;dbname=$dbname", $username, $password);
                self::$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            } catch (\PDOException $e) {
                die("Connection failed: " . $e->getMessage());
            }
        }
        return self::$connection;
    }
}

