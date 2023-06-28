<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;
use App\Utils\StringHelpers;

Class Article extends Model{

    protected int $author_id;	
    protected string $title = "";
    protected string $content = "";
    protected string $description = "";
    public string $slug= "";
    protected string $image = "";

    /*
    *   Setters
    */
    public function setAuthor($id){
        $this->author_id = $id;
    }

    public function setTitle($str){
        $this->title =  Protection::protect(ucwords(strtolower(trim($str))));
    }
    public function setContent($str){
        $this->content =  Protection::protect(trim($str));
    }

    public function setDescription($str){
        $this->description =  Protection::protect(trim($str));
    }

    public function setSlug($slug){
        $this->slug =  StringHelpers::slugify($slug);
    }
    
    public function setImage($str){
        $this->image =  Protection::protect(trim($str));
    }


    /* 
    *   Getters
    */
    public function getAuthor(){
        
        return User::fetch(["id"=>$this->author_id]);

    }

    // public function getComments(){
    //     return $this->comment;
    // }

    public function getImage(){
        return $this->image;
    }

    public function getDescription(){
        return $this->description;
    }

    public function getTitle(){
        return $this->title;
    }
    public function getContent(){
        return $this->content;
    }
    public function getAuthorId(){
        return $this->author_id;
    }

}