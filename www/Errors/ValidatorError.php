<?php

namespace App\Errors;


use App\Errors\HTTPError;

class ValidatorError extends HTTPError
{
    protected $code = 422;
    protected $message = 'Internal Server Error';

    function __construct(array $message)
    {
        $request = request()->getHeaders();
        $this->message = $message;
    }
}
