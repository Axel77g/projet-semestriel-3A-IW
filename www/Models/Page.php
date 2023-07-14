<?php

namespace App\Models;

use App\Core\Model;

use App\Utils\StringHelpers;

class Page extends Model
{

    public int $author_id;
    protected ?string $parent_slug = "";
    public string $slug = "";
    protected string $title = "";
    protected string $template = "";
    protected string $content = "";
    protected int $is_commentable = 0;

    protected int $views = 0;

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
        $this->template = strtolower($str);
    }

    public function setContent(array $array)
    {
        $this->content = json_encode($array);
    }

    public function setIsCommentable(bool $bool)
    {
        $this->is_commentable = (int) $bool;
    }

    public function setViews(int $views)
    {
        $this->views = $views;
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

    public function getContent(): array
    {
        return json_decode($this->content,true);
    }

    public function getIsCommentable() : bool
    {
        return (bool) $this->is_commentable;
    }

    public function getViews()
    {
        return $this->views;
    }

    public function getParent()
    {
        return Page::fetch([
            "slug" => $this->parent_slug
        ]);
    }

    public function getPath()
    {

        $parent = $this->getParent();

        if ($parent) {
            return $parent->getPath() . "/" . $this->slug;
        } else {
            return "/" . $this->slug;
        }
    }
}
