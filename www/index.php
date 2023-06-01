<?php
namespace App;

include 'config.php';
include 'autoload.php';

use App\Core\Router;
use App\Errors\HTTPError;


try{
    include(ROUTES);
    $router = Router::getInstance();
    $route = $router->findRoute($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
    $route->dispatch();
}catch(HTTPError $e){
    http_response_code($e->getCode());
}