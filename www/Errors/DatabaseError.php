<?php

namespace App\Errors;

class DatabaseConnectionError extends HTTPError{
    
    protected $code = 500;
    protected $message = "Database connection error";
}