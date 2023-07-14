<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;
use App\Models\User;

class Comment extends Model
{

    protected int $page_id = 0;
    protected int $author_id = 0;
    protected ?int $comment_id = null;
    protected string $content = "";
    protected string $status = "pending";

    /*
    * Getters
    */
    public function getPageId()
    {
        return $this->page_id;
    }

    public function getAuthorId()
    {
        return $this->author_id;
    }

    public function getAuthor(){
        return User::fetch($this->author_id);
    }


    public function getCommentId()
    {
        return $this->comment_id;
    }

    public function getComment(){
        return Comment::fetch($this->comment_id);
    }

    public function getComments(){
        return Comment::findMany([
            "comment_id" => $this->id,
            'status'=> 'validated', 
        ]);
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

    public function setAuthorId($author)
    {
        $this->author_id = $author;
    }

    public function setCommentId($comment)
    {
        $this->comment_id = $comment;
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
