<?php

namespace App\Utils;

class Singleton{
    private static $instance = null;

    public static function getInstance(){
        if(self::$instance == null){
            $class = get_called_class();
            self::$instance = new $class();
        }
        return self::$instance;
    }
}