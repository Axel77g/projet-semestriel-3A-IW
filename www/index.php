<?php
namespace App;

include 'config.php';
include 'autoload.php';


use App\Core\Request;
use App\Core\Router;
use App\Errors\HTTPError;


try{
    $router = new Router();
    $router->loadRoutes();
    $route = $router->findRoute($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);

    $route->dispatch();
}catch(HTTPError $e){
    http_response_code($e->getCode());
}