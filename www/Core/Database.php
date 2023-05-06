<?php

namespace App\Core;

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
     
        $this->connection = new PDO($this->getConnectionString(), $this->getCredentials()['username'], $this->getCredentials()['password']);
       
    }

    public function getConnection(){
        return $this->connection;
    }

    public function __destruct()
    {
        $this->connection = null;
    }
}