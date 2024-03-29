<?php

namespace App\Core;

use App\Errors\ControllerNotFound;
use App\Errors\RouteFormatError;

class Route{
    protected $uri;
    protected $config;
    protected $middleware = [];
    public $params = [];
    public $path;


    function __construct($path,$config){
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Content-Encoding,API-Key");
        $this->setPath($path);
        $this->setConfig($config);
       
    }

    function setPath($path){
        $this->uri = explode("/",rtrim($path,'/'));
        $this->path = $path;    
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
        if($method != $this->config['method'] && $method != 'OPTIONS') return false;        

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
            $middlewareInfos = explode(":",$this->getMiddlewares()[$i]);
            $middleware = "\\App\\Middlewares\\" . $middlewareInfos[0];
            $middleware = new $middleware(count($middlewareInfos) > 1 ? explode(",",$middlewareInfos[1]) : null);
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
        
        $res = $c->$action($this->params);
        
        if(is_a($res, Sanitize::class)) echo $res->toJson();
        
    }

    // Static methods
    static function get($path,$config){
        $config = array_merge($config,['method' => 'GET']);
        self::create($path,$config);
    }

    static function options($path,$config){
        $config = array_merge($config,['method' => 'OPTIONS']);
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