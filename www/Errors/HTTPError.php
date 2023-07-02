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

        $request = request()->getHeaders();

        if(isset($request['accept']) && $request['accept'] == 'application/json'){
            header('Content-Type: application/json');
            echo json_encode(["code" => $this->code, "message" => $this->message]);
            return;
        }

        $view = new View(null, "error");
        $view->massAsign( ["code" => $this->code, "message" => $this->message]);
    }
}

class NotFoundError extends HTTPError
{
    protected $code = 404;
    protected $message = 'Not Found';
}

class InternalError extends HTTPError{
    
}

class BadRequest extends HTTPError{
    protected $code = 400;
    protected $message;
}

class MethodNotAllowed extends HTTPError{
    protected $code = 405;
    protected $message = 'Method Not Allowed';
}