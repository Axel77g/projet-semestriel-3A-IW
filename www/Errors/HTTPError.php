<?php

namespace App\Errors;

use App\Core\View;
use Exception;

class HTTPError extends Exception
{
    protected $code = 500;
    protected $message = 'Internal Server Error';


    function __destruct()
    {
        $view = new View(null, "error");
        $view->massAsign( ["code" => $this->code, "message" => $this->message]);
    }
}