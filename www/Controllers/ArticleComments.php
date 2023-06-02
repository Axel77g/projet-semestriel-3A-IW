<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\ArticleComment;


class ArticleComments extends Controller{
        
        function index(){

            $articlecomments = ArticleComment::all();
            return $articlecomments;
        }

        function show($params){
            $articlecomment = ArticleComment::fetch($params['id']);
            if(!$articlecomment) throw new NotFoundError();
            return $articlecomment;
        }

        function create(){
            $payload = request()->json();
            $articlecomment = new ArticleComment();
            $articlecomment->setArticleId($payload['article_id']);
            $articlecomment->setCommentId($payload['comment_id']);
            $articlecomment->save();
            return $articlecomment;
        }

        function update($params){
            $payload = request()->json();
            $articlecomment = ArticleComment::fetch($params['id']);
            if(!$articlecomment) throw new NotFoundError();


            $articlecomment->set($payload);
            $articlecomment->save();
            return $articlecomment;
        }

        function delete($params){
            $articlecomment = ArticleComment::fetch($params['id']);
            if(!$articlecomment) throw new NotFoundError();
            $articlecomment->destroy();
            return $articlecomment;
        }
        
}

