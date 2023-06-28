<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\Article;


class Articles extends Controller{
        
        function index(){
            
            $articles = Article::all();

            $articles->map(function($article){
                $article->author = $article->getAuthor();
                return $article;
            });

            return $articles;
        }

        function show($params){
       
            $article = Article::fetch([
                "slug" => $params['slug']
            ]);
     
            if(!$article) throw new NotFoundError();
            
            return $article;
        }

        function create(){
            $payload = request()->json();
            $article = new Article();
            $article->setTitle($payload['title']);
            $article->setContent($payload['content']);
            $article->setAuthor($payload['author']);

            $article->save();
            
            return $article;
        }

        function update($params){
            $payload = request()->json();
            $article = Article::fetch($params['id']);
            if(!$article) throw new NotFoundError();
            $article->set($payload);
            
            $article->save();
            
            return $article;
        }

        function delete($params){
            $article = Article::fetch($params['id']);
            if(!$article) throw new NotFoundError();
            
            $article->destroy();
            
            return $article;
        }
        
}

