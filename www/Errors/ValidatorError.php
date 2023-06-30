<?php

namespace App\Errors;


use App\Errors\HTTPError;

class ValidatorError extends HTTPError
{
    protected $code = 422;
    protected $message = 'Internal Server Error';

    function __construct($message)
    {
        $this->message = $message;
    }


    function __destruct()
    {

        $request = request()->getHeaders();

        if(isset($request['accept']) && $request['accept'] == 'application/json'){
            header('Content-Type: application/json');
            echo json_encode(["code" => $this->code, "succes" => false,  "messages" => json_encode($this->message)]);
            return;
        }
    }
}
