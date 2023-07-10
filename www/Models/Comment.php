<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class Comment extends Model
{

    protected string $article_id;
    protected string $author_id;
    protected ?string $comment = null;
    protected string $content;

    protected string $status = "pending";

    /*
    * Getters
    */
    public function getArticleId()
    {
        return $this->article_id;
    }

    public function getAuthorId()
    {
        return $this->author_id;
    }

    // public function getAuthorName()
    // {
    //     $author = User::fetch(["id" => $this->author_id]);

    //     return $author->getLastname();
    // }

    public function getComment()
    {
        return $this->comment;
    }

    public function getContent()
    {
        return $this->content;
    }

    /*
    * Setters
    */
    public function setArticleId($article_id)
    {
        $this->article_id = $article_id;
    }

    public function setAuthorId($author_id)
    {
        $this->author_id = $author_id;
    }

    public function setComment($comment)
    {
        $this->comment = $comment;
    }

    public function setContent($content)
    {
        $this->content = $content;
    }

    public function setStatus($status)
    {
        if($status == "pending" || $status == "validated" || $status == "refused"){
            $this->status = $status;
        }
        else{
            $this->status = "pending";
        }
    }

    public function getStatus()
    {
        return $this->status;
    }
}
