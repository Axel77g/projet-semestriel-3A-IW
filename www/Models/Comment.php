<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class Comment extends Model{

    protected string $author_id;
    protected string $comment_id;
    protected string $content;
    protected string $created_at;
    protected string $updated_at;

    public function setContent($str){
        $this->content = Protection::protect(trim($str));
    }

    public function setCreatedAt($str){
        $this->created_at = $str;
    }

    public function setUpdatedAt($str){
        $this->updated_at = $str;
    }

    public function getContent(){
        return $this->content;
    }

    public function getCreatedAt(){
        return $this->created_at;
    }

    public function getUpdatedAt(){
        return $this->updated_at;
    }

    public function getAuthorId() {
        return $this->author_id;
    }

}