<?php

namespace App\Middlewares;

use App\Core\Middleware;
use App\Errors\Unauthorized;
use App\Models\Role;

class Permission extends Middleware{

    private $permissions = [];

    public function __construct($permissions){
        $this->permissions = $permissions;
    }

    public function handle($next) {
        
        $user = request()->auth()->user();
        $hasPerms = false;
        
        foreach($this->permissions as $permission){
            $hasPerms = $user->hasRole(Role::fetch(["name"=>$permission]));
            if($hasPerms) {
                break;
            };
        }
        
        if(!$hasPerms) throw new Unauthorized();
        
        return $next();
        
    }

}