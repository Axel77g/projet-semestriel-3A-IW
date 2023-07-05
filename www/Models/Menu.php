<?php

namespace App\Models;

use App\Core\Model;

class Menu extends Model {

    protected ?int $parent_id = null;
    public string $title = "";
    protected string $url = "";
    protected int $visible;
    protected int $position = 0;

    /*
    * Getters
    */
    public function getParentId(): int {
        return $this->parent_id;
    }

    public function getTitle(): string {
        return $this->title;
    }

    public function getUrl(): string {
        return $this->url;
    }

    public function getPosition(): int {
        return $this->position;
    }

    public function getVisible(): int {
        return $this->visible;
    }

    /*
    * Setters
    */
    public function setParentId(int $parent_id): void {
        $this->parent_id = $parent_id;
    }   

    public function setTitle(string $title): void {
        $this->title = $title;
    }

    public function setUrl(string $url): void {
        $this->url = $url;
    }

    public function setVisible(int $visible): void {
        $this->visible = $visible;
    }

    public function setPosition(int $position): void {
        $this->position = $position;
    }
    

}