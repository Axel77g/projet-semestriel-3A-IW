<?php
namespace App;

include 'autoload.php';

use App\Core\Router;
use App\Errors\HTTPError;
use App\Errors\InternalError;
use Exception;

try{
    include("./routes.php");
    if(file_exists("./config.php")){
        include("./config.php");
        define("INSTALLER",false);
    }
    else{
        define("INSTALLER",true);
    }

    $router = Router::getInstance();
    $route = $router->findRoute($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
    $route->dispatch();
   
}catch(Exception $e){
    if(is_a($e,HTTPError::class)){
        http_response_code($e->getCode());
    }
    else{
        $e = new InternalError($e->getMessage());
        http_response_code($e->getCode());
    }
}