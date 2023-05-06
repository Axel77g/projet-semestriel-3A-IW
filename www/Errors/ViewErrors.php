<?php

namespace App\Errors;

class ViewNotFound extends HTTPError{
    protected $code = 500;
    protected $message = 'Internal Server Error';
    public function __construct($viewName){
        $this->message = $this->message." : ".$viewName . " not found";
    }
    
}