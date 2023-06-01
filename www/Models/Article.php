<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

Class Article extends Model{

    protected string $title = "";
    protected string $content = "";
    protected int $author;

    public function setTitle($str){
        $this->title =  Protection::protect(ucwords(strtolower(trim($str))));
    }
    public function setContent($str){
        $this->content =  Protection::protect(trim($str));
    }
    public function setAuthor($id){
        $this->author = $id;
    }
    
    public function getTitle(){
        return $this->title;
    }
    public function getContent(){
        return $this->content;
    }
    public function getAuthor(){
        return $this->author;
    }

}