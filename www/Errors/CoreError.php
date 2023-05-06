<?php

namespace App\Errors;

class DependenciesNotFound extends HTTPError{
    
    protected $code = 500;
    function __construct($class) {
        $message = "Dependencies not found : " . $class;
        parent::__construct($message);
    }
}