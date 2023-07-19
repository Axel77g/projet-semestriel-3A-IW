<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\HTTPError;
use App\Errors\NotFoundError;
use App\Models\Article;

class Articles extends Controller
{
    public function index()
    {
        $articles = Article::all();

        // $articles->map(function($article){
        //     $article->author = $article->getAuthor();
        //     return $article;
        // });

        return $articles;

    }

    public function show($params)
    {
        $article = Article::fetch([
            "slug" => $params['slug']
        ]);

        if (!$article) {
            throw new NotFoundError();
        }

        return $article;
    }

    public function create()
    {
        $payload = request()->json();

        $article = new Article();
        
        $article->setAuthor($payload['author']);
        $article->setTitle($payload['title']);
        $article->setContent($payload['content']);
        $article->setDescription($payload['description']);
        $article->setSlug($payload['slug']);

        if (!empty($payload['image'])) {
            $article->setImage($payload['image']);
        }
       
        if (!Article::exists(["slug" => $article->slug])) {
            $article->save();
        } else {
             throw new HTTPError("Slug already exist", 400);
        }

        return $article;
    }

    public function update($params)
    {
        $payload = request()->json();

        $article = Article::fetch($params['id']);
        
        if (!$article) {
            throw new NotFoundError();
        }

        $article->set($payload);

        $article->save();

        return $article;
    }

    public function delete($params)
    {
        $article = Article::fetch($params['id']);
        if (!$article) {
            throw new NotFoundError();
        }

        $article->destroy();

        return $article;
    }
}

