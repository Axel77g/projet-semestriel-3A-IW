<?php
namespace App\Errors;

use App\Errors\HTTPError;

class Unauthorized extends HTTPError{
    
    protected $code = 404;
    protected $message = 'Not Found';
}

class WrongPassword extends HTTPError{   
    protected $code = 400;
    protected $message = 'Wrong Password';
}

class UserAlreadyExists extends HTTPError{   
    protected $code = 400;
    protected $message = 'User Already Exists';
}