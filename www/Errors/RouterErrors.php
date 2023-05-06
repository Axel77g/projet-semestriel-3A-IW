<?php

namespace App\Errors;

class RouteFileNotFound extends HTTPError{
}
class RouteFormatError extends HTTPError{
}

class RouteNotFound extends HTTPError{
    protected $code = 404;
    protected $message = 'Route Not Found';
}

class ControllerNotFound extends HTTPError{
    protected $message = "Controller not found";
    protected $code = 500;
}

class ControllerDispatchError extends HTTPError{
    protected $message = "Controller dispach error";
}