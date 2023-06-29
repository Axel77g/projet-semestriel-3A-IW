<?php
namespace App;

include 'autoload.php';

use App\Core\Router;
use App\Core\View;
use App\Errors\HTTPError;


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
   
}catch(HTTPError $e){
    http_response_code($e->getCode());
}