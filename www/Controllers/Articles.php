<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\Article;


class Articles extends Controller{
        
        function index(){
            $articles = Article::all();
            echo $articles->toJson();
        }

        function show($params){
            $article = Article::fetch($params['id']);
            if(!$article) throw new NotFoundError();
            echo $article->toJson();
        }

        function create(){
            $payload = request()->json();
            $article = new Article();
            $article->setTitle($payload['title']);
            $article->setContent($payload['content']);
            $article->setAuthor($payload['author']);
            $article->save();
            echo $article->toJson();
        }

        function update($params){
            $payload = request()->json();
            $article = Article::fetch($params['id']);
            if(!$article) throw new NotFoundError();
            $article->setTitle($payload['title']);
            $article->setContent($payload['content']);
            $article->setAuthor($payload['author']);
            $article->save();
            echo $article->toJson();
        }

        function delete($params){
            $article = Article::fetch($params['id']);
            if(!$article) throw new NotFoundError();
            $article->destroy();
            echo $article->toJson();
        }
        
}

