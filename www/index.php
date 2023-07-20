<?php
namespace App;

include 'autoload.php';

use App\Core\Router;
use App\Errors\HTTPError;
use App\Errors\InternalError;
use Throwable;

try{
    include("./routes.php");
    if(file_exists("./config.php")){
        try{
            include("./config.php");
            define("INSTALLER",false);
        }catch(Throwable $e){
            unlink("./config.php");
            define("INSTALLER",true);
        } 
    }
    else{
        define("INSTALLER",true);
    }

    $router = Router::getInstance();
    $route = $router->findRoute($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);
    $route->dispatch();
   
}catch(Throwable $e){
    if(is_a($e,HTTPError::class)){
        http_response_code($e->getCode());
    }
    else{
        $e = new InternalError($e->getMessage());
        http_response_code($e->getCode());
    }
}