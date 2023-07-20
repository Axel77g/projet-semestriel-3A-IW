<?php

namespace App\Models;

use App\Core\Model;
use App\Services\PageServices;
use App\Traits\HasHistory;
use App\Utils\Protection;
use App\Utils\StringHelpers;


class Page extends Model
{

    use HasHistory;

    public int $author_id;
    protected ?string $parent_slug = "";
    public string $slug = "";
    protected string $title = "";
    protected string $template = "";
    protected string $content = "";
    protected int $is_commentable = 0;
    protected int $views = 0;
    protected string $meta_description = "";

    /*
    *   Setters
    */
    public function setId($id)
    {
        $this->id = Protection::int($id);
    }

    public function setAuthorId($id)
    {
        $this->author_id = Protection::int($id);
    }

    public function setParentSlug($parent_slug)
    {
        $this->parent_slug = Protection::protect($parent_slug);
    }

    public function setSlug($slug)
    {
        $this->slug = StringHelpers::slugify(Protection::protect($slug));
    }

    public function setTitle($str)
    {
        $this->title = Protection::protect($str);
    }

    public function setTemplate($str)
    {
        $this->template = Protection::protect(strtolower($str));
    }

    public function setContent(array $array)
    {
        $this->content = Protection::removeScripts(json_encode($array));
    }

    public function setIsCommentable(bool $bool)
    {
        $this->is_commentable = (int) Protection::int($bool);
    }

    public function setViews(int $views)
    {
        $this->views = $views;
    }

    public function setMetaDescription($str)
    {
        $this->meta_description = Protection::protect($str);
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

    public function getAuthor()
    {
        return User::fetch($this->author_id);
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
        return json_decode($this->content, true);
    }

    public function getIsCommentable(): bool
    {
        return (bool) $this->is_commentable;
    }

    public function getViews()
    {
        return $this->views;
    }

    public function getMetaDescription()
    {
        return $this->meta_description;
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

    public function toArray()
    {
        $array = parent::toArray();
        return [
            ...$array,
            'content' => PageServices::populateContentFileRelation($this->getContent()),
        ];
    }

    public function toJson()
    {
        return json_encode($this->toArray());
    }
}
