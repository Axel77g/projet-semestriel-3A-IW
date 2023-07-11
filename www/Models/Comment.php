<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;
use App\Models\User;

class Comment extends Model
{

    protected string $page_id;
    protected string $author;
    protected ?string $comment = null;
    protected string $content;
    protected string $status = "pending";

    /*
    * Getters
    */
    public function getPageId()
    {
        return $this->page_id;
    }

    public function getAuthor()
    {
        return $this->author;
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
    public function setPageId($page_id)
    {
        $this->page_id = $page_id;
    }

    public function setAuthor($author)
    {
        $this->author = $author;
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
