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
            $this->headers = array_change_key_case(getallheaders(), CASE_LOWER);
        }
        return $this->headers;
    }

    public function getQuery(){
        return new RequestQuery($_GET);
    }

    public function body(){
        return file_get_contents('php://input');
    }

    public function json(){
        return json_decode($this->body(), true);
    }

    public function auth(){
        $headers = $this->getHeaders();
        if(isset($headers['authorization'])){
            $token = $headers['authorization'];
            return Auth::get($token);
        }
        return new Auth();
    }
}


class RequestQuery{
    protected array $query = [];
    public function __construct($query){
        $this->query = $query;
    }

    public function get($key){
        return $this->query[$key];
    }

    public function has($key){
        return isset($this->query[$key]);
    }

}