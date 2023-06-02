<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class ArticleComment extends Model{

    protected int $article_id;
    protected int $comment_id;

    public function setArticleId($id){
        $this->article_id = $id;
    }

    public function setCommentId($id){
        $this->comment_id = $id;
    }

    public function getArticleId(){
        return $this->article_id;
    }

    public function getCommentId(){
        return $this->comment_id;
    }
}