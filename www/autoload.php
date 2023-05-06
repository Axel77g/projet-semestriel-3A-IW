<?php

use App\Core\Request;

function request(){
    return new Request();
}

//load all Errors
$ErrorsFiles = glob(__DIR__ . "/Errors/*.php");
include __DIR__ . "/Errors/HTTPError.php";

foreach($ErrorsFiles as $file){
    if($file == __DIR__ . "/Errors/HTTPError.php") continue;
    include $file;
}

use App\Errors\DependenciesNotFound;

spl_autoload_register(function ($class){
    $class = str_replace("\\","/",$class);
    $class = str_replace("App","",$class);
    $fileExist = $class . ".php";

    if(file_exists(__DIR__ . $fileExist)){
        include __DIR__ . $fileExist;
    } else throw new DependenciesNotFound($class);
    
});

//get all files in this directory
