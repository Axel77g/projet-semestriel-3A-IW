<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;

class ArticlePolicy extends Policy {

    static public function index(User $authUser) {
        return Policy::handle($authUser->isAdmin());
    }

    static public function show(Article $article, User $authUser): bool 
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $article->getAuthorId());
    }

    static public function update(Article $article, User $authUser): bool
    {
        return Policy::handle($authUser->isAdmin() || $authUser->getId() == $article->getAuthorId());
    }

}