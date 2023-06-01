<?php
namespace App\Middlewares;

use App\Core\Middleware;
use App\Erros\Unauthorized;

class HasRole extends Middleware {
 
    private $roles = [];
 
    public function __construct($roles){
        $this->roles = $roles;
    }
 
    public function handle($next){
 
        $auth = request()->auth();
 
        foreach ($this->roles as $role) {
            if($auth->user()->hasRole($role)) return $next();
        }
        
        return new Unauthorized();
        
    }


}