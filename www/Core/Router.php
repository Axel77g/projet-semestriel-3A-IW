<?php

namespace App\Core;

use App\Errors\MethodNotAllowed;
use App\Utils\Singleton;

class Router extends Singleton{
    
    private $routes = [];
    
    function findRoute($uri,$method){
        $viewRoute = null;
        foreach($this->routes as $route){
            if($route->match("/",$method)){
                $viewRoute = $route;
          
            }
            if($route->match($uri,$method)){
                return $route;
            }
        }
        if($viewRoute == null)
            throw new MethodNotAllowed();
        else
            return $viewRoute;
    }

    function addRoute(Route $route){
        $this->routes[] = $route;
    }
}





