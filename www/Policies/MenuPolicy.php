<?php

namespace App\Policies;

use App\Models\User;

class MenuPolicy extends Policy {

    static public function displayInvisble(?User $authUser) {
       
        if(!$authUser) return Policy::handle(false); 
        return Policy::handle($authUser->isAdmin());
    }
}