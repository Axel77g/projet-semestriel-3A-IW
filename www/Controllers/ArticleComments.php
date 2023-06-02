<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\ArticleComment;


class ArticleComments extends Controller{
        
        function index(){

            $articlecomments = ArticleComment::all();
            echo $articlecomments->toJson();
        }

        function show($params){
            $article = ArticleComment::fetch($params['id']);
            if(!$article) throw new NotFoundError();
            echo $article->toJson();
        }

        function create(){
            $payload = request()->json();
            $article = new ArticleComment();
            $article->setArticleId($payload['article_id']);
            $article->setCommentId($payload['comment_id']);
            $article->save();
            echo $article->toJson();
        }

        function update($params){
            $payload = request()->json();
            $article = ArticleComment::fetch($params['id']);
            if(!$article) throw new NotFoundError();


            $article->set($payload);
            $article->save();
            echo $article->toJson();
        }

        function delete($params){
            $article = ArticleComment::fetch($params['id']);
            if(!$article) throw new NotFoundError();
            $article->destroy();
            echo $article->toJson();
        }
        
}

