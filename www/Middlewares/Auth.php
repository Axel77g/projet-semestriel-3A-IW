<?php
namespace App\Middlewares;

use App\Core\Middleware;
use App\Erros\Unauthorized;

class Auth extends Middleware
{
    public function handle ($next){
        if(empty(request()->getHeaders()['Authorization']) && false)
            throw new Unauthorized();
        
        $next();
    }
}