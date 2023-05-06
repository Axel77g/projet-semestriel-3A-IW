<?php
namespace App\Erros;

use App\Errors\HTTPError;

class Unauthorized extends HTTPError{
    
    protected $code = 404;
    protected $message = 'Not Found';
}