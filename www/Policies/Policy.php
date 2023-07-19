<?php

namespace App\Policies;

use App\Errors\Unauthorized;

class Policy {
    
    static public function handle(bool $hasAccess){
        if(!$hasAccess) throw new Unauthorized();
        else return true;
    }
}

?>