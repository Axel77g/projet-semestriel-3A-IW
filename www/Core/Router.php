<?php

namespace App\Core;

use App\Errors\RouteNotFound;
use App\Utils\Singleton;

class Router extends Singleton{
    
    private $routes = [];

    function findRoute($uri,$method){
        foreach($this->routes as $route){
            if($route->match($uri,$method)){
                return $route;
            }
        }
        throw new RouteNotFound();
    }

    function addRoute(Route $route){
        $this->routes[] = $route;
    }
}





