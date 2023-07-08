<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class Comment extends Model
{

    protected string $article_id;
    protected string $author_id;
    protected ?string $comment_id = null;
    protected string $content;

    /*
    * Getters
    */
    public function getfunctionArticleId()
    {
        return $this->article_id;
    }

    public function getAuthorId()
    {
        return $this->content;
    }

    // public function getAuthorName()
    // {
    //     $author = User::fetch(["id" => $this->author_id]);

    //     return $author->getLastname();
    // }

    public function getCommentId()
    {
        return $this->author_id;
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

    public function setCommentId($comment_id)
    {
        $this->comment_id = $comment_id;
    }

    public function setContent($content)
    {
        $this->content = $content;
    }
}
