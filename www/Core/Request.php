<?php

namespace App\Core;

use App\Models\Auth;

class Request{

    private static $instance = null;
    private $method;
    private $path;
    private $headers;

    public function __construct(){

        //singleton
        if(self::$instance == null){
            self::$instance = $this;
        }

        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->path = $_SERVER['REQUEST_URI'];
    }

    public function getMethod(){
        return $this->method;
    }

    public function getPath(){
        return $this->path;
    }

    public function getHeaders(){
        if($this->headers == null){
            $this->headers = getallheaders();
        }
        return $this->headers;
    }

    public function body(){
        return file_get_contents('php://input');
    }

    public function json(){
        return json_decode($this->body(), true);
    }

    public function auth(){
        $headers = $this->getHeaders();
        if(isset($headers['Authorization'])){
            $token = $headers['Authorization'];
            return Auth::get($token);
        }
        return null;
    }
}