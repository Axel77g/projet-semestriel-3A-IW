<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy extends Policy {

    static public function index(User $authUser): bool 
    {
        return Policy::handle($authUser->isAdmin());
    }
    
    static public function show(User $authUser, User $user): bool 
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $user->getId());
    }

    static public function update(User $authUser, User $user): bool
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $user->getId());
    }

    static public function destroy(User $authUser, User $user): bool 
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $user->getId());
    }    
} 

?>