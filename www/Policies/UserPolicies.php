<?php

namespace App\Policies;

use App\Models\User;

class UserPolicies extends Policy {

    static public function fetch(User $authUser, User $user): bool 
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $user->getId());
    }

    static public function save(User $authUser, User $user): bool
    {
        return $authUser->isAdmin() || $authUser->getId() == $user->getId();
    }

    static public function destroy(User $authUser, User $user): bool 
    {
        return $authUser->isAdmin() || $authUser->getId() == $user->getId();
    }

    static public function fetchAll(User $authUser): bool 
    {
        return $authUser->isAdmin();
    }
    
} 


?>