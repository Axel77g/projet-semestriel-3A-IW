<?php

namespace App\Core;

use App\Errors\DatabaseConnectionError;
use PDO;

class Database{
    static private $instance;
    private $connection;

    public function __construct(){
        $this->connect();    
    }

    static public function getInstance(){
        if(self::$instance == null){
            self::$instance = new Database();
        }
        return self::$instance;
    }

    private function getConnectionString(){
        return DB_DRIVER . ':host=' . DB_HOST . ';dbname=' . DB_NAME . '';
    }

    private function getCredentials(){
        return [
            'username' => DB_USERNAME,
            'password' => DB_PASSWORD
        ];
    }

    public function connect(){
        //create a PDO connection
        try {
            $this->connection = new \PDO($this->getConnectionString(), $this->getCredentials()['username'], $this->getCredentials()['password']);
            //code...
        } catch (\Exception $th) {
            throw new DatabaseConnectionError();
        }
       
    }

    public function getConnection(){
        return $this->connection;
    }

    public function __destruct()
    {
        $this->connection = null;
    }
}