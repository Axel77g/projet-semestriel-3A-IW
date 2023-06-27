<?php

namespace App\Core;

use App\Errors\ControllerNotFound;
use App\Errors\RouteFormatError;

class Route{
    protected $uri;
    protected $config;
    protected $middleware = [];
    public $params = [];


    function __construct($path,$config){
        $this->setPath($path);
        $this->setConfig($config);
       
    }

    function setPath($path){
        $this->uri = explode("/",rtrim($path,'/'));
    }

    function setConfig($config){
        if(empty($config['controller']) || empty($config['action']) || empty($config['method'])) throw new RouteFormatError();
        $this->config = $config;
    }

    function getMiddlewares(){
        if(empty($this->config['middlewares'])) return [];
        return $this->config['middlewares'];
    }

    function match($uri,$method){
        if($method != $this->config['method']) return false;        

        $path = explode("?",rtrim($uri,'/'))[0];
        $path = explode("/",rtrim($path,'/'));
        
        if(count($this->uri) != count($path)) return false;
        
        $i = 0;
        $paramRegex = '/[\{](.+)[\}]/m';
        $pass = true;
        
        while($pass && $i < count($this->uri)){
            if($this->uri[$i] == $path[$i]){
                $i++;
            }
            else if(preg_match($paramRegex,$this->uri[$i],$matches)){
                $param = $matches[1];
                $this->params[$param] = $path[$i];
                $i++;
            }
            else{
                $pass = false;
            }
        }
        return $pass;
    } 

    function middlewareChain($i=0) {
  
        if($i < count($this->getMiddlewares())){
            $middleware = "\\App\\Middlewares\\" . $this->getMiddlewares()[$i];
            $middleware = new $middleware();
            $middleware->handle(function() use ($i){
                $this->middlewareChain($i+1);
            });
        }
    }

    function runMiddlewares(){
        $this->middlewareChain(0);
    }

    function dispatch(){
        $controller =   $this->config['controller'];
        $action = $this->config['action'];
        if(!file_exists("Controllers/$controller.php")) throw new ControllerNotFound();
        include "Controllers/$controller.php";
        $controller = "App\\Controllers\\$controller";
        $c = new $controller();
        $this->runMiddlewares();
        return $c->$action($this->params);
    }

    // Static methods
    static function get($path,$config){
        $config = array_merge($config,['method' => 'GET']);
        self::create($path,$config);
    }

    static function post($path,$config){
        $config = array_merge($config,['method' => 'POST']);
        self::create($path,$config);
    }

    static function delete($path,$config){
        $config = array_merge($config,['method' => 'DELETE']);
        self::create($path,$config);  
    }

    static function put($path,$config){
        $config = array_merge($config,['method' => 'PUT']);
        self::create($path,$config);
    }

    static function create(...$params){
        $router = Router::getInstance();
        $router->addRoute(new Route(...$params));
    }

}