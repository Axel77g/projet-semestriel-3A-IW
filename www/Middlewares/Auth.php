<?php
namespace App\Middlewares;

use App\Core\Middleware;
use App\Erros\Unauthorized;

class Auth extends Middleware
{
    public function handle ($next){

        $auth = request()->auth();
        
        if(empty($auth))
            throw new Unauthorized();
        
        if(!$auth->isValid())
            throw new Unauthorized();

        $next();
    }
}