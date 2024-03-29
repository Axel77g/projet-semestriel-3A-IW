<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class Menu extends Model
{

    protected ?int $parent_id = null;
    public string $title = "";
    protected int $page_id = 0;
    protected int $visible = 0;
    protected int $is_footer = 0;
    protected int $is_header = 0;
    protected int $position = 0;

    /*
    * Getters
    */
    public function getParentId(): int
    {
        return $this->parent_id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getPageId(): string
    {
        return $this->page_id;
    }

    public function getPage() 
    {
        return Page::fetch($this->page_id);
    }

    public function getPath(){
        $page = $this->getPage();
        return $page->getPath();
    }

    public function getPosition(): int
    {
        return $this->position;
    }

    public function getVisible(): int
    {
        return $this->visible;
    }

    /*
    * Setters
    */
    public function setParentId(?int $parent_id = null): void
    {
        $this->parent_id = $parent_id;
    }

    public function setTitle(string $title): void
    {
        $this->title = Protection::protect($title);
    }

    public function setPageId(int $page_id): void
    {
        $this->page_id = Protection::int($page_id);
    }

    public function setVisible(int $visible): void
    {
        $this->visible = Protection::int($visible);
    }

    public function setIsFooter(int $is_footer): void
    {
        $this->is_footer = Protection::int($is_footer);
    }

    public function setIsHeader(int $is_header): void
    {
        $this->is_header = Protection::int($is_header);
    }

    public function setPosition(int $position): void
    {
        $this->position = Protection::int($position);
    }
}
