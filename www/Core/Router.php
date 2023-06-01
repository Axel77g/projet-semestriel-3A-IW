<?php

namespace App\Core;

use App\Errors\RouteFileNotFound;
use App\Errors\RouteNotFound;

class Router{
    
    private $routes = [];

    function loadRoutes(){
        if(!file_exists(ROUTES)){
            throw new RouteFileNotFound();
        }
        
        $this->routes = yaml_parse_file(ROUTES);

        return $this->routes;

    }

    function findRoute($uri,$method){

        foreach($this->routes as $path => $config){
            $route = new Route($path,$config);
            if($route->match($uri,$method)){
                return $route;
            }
        }
        
        throw new RouteNotFound();
        
    }
}





