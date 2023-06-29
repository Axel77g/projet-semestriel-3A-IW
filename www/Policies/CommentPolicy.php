<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy extends Policy {

    static public function index(User $authUser) {
        return Policy::handle($authUser->isAdmin());
    }

    static public function show(Comment $comment, User $author): bool 
    {
        return Policy::handle($author->isAdmin() || $author->getId() == $comment->getAuthorId());
    }

    static public function update(Comment $authorId, User $authUser): bool
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $authorId);
    }

    static public function destroy(Comment $comment, User $authUser): bool 
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $comment->getAuthorId());
    }

}