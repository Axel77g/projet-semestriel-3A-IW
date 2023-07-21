<?php

namespace App\Policies;

use App\Models\File;
use App\Models\User;

class UploadPolicy extends Policy {

    static public function store( User $authUser): bool
    {
        return Policy::handle($authUser->isAdmin());
    }

    static public function update(File $file, User $authUser): bool
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $file->getUserID());
    }

    static public function delete(File $file, User $authUser): bool
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $file->getUserID());
    }

}