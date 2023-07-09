<?php

namespace App\Models;

use App\Core\Model;

use App\Utils\StringHelpers;

class Page extends Model
{

    public int $author_id;
    protected string $parent_slug = "";
    public string $slug = "";
    protected string $title = "";
    protected string $template = "";
    protected string $content = "";

    /*
    *   Setters
    */
    public function setId($id)
    {
        $this->id = $id;
    }

    public function setAuthorId($id)
    {
        $this->author_id = $id;
    }

    public function setParentSlug($parent_slug)
    {
        $this->parent_slug = $parent_slug;
    }

    public function setSlug($slug)
    {
        $this->slug = StringHelpers::slugify($slug);
    }

    public function setTitle($str)
    {
        $this->title = $str;
    }

    public function setTemplate($str)
    {
        $this->template = $str;
    }

    public function setContent($str)
    {
        $this->content = json_encode($str);
    }

    /*
    *   Getters
    */

    public function getId()
    {
        return $this->id;
    }

    public function getAuthorId()
    {
        return $this->author_id;
    }

    public function getParentSlug()
    {
        return $this->parent_slug;
    }

    public function getSlug()
    {
        return $this->slug;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function getTemplate()
    {
        return $this->template;
    }

    public function getContent()
    {
        return json_decode($this->content);
    }
}
