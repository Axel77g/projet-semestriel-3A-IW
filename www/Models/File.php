<?php 

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class File extends Model {

    protected $path = "";
    protected $name = "";
    protected $extension = "";
    protected $size = 0;
    protected $mime = "";
    protected $user_id = 0;
    protected $hash = "";
    protected $alternative_text = "";

    public function __construct(){
      
        
        $this->hash = empty($this->hash) ?  Protection::protect(uniqid()): $this->hash;
    }

    public function setName(string $name) {
        $this->name = Protection::protect(strtolower($name));
    }

    public function setExtension(string $extension) {
        $this->extension = Protection::protect(strtolower($extension));
    }

    public function setSize(int $size) {
        $this->size = Protection::protect($size);
    }

    public function setMime(string $mime) {
        $this->mime = Protection::protect(strtolower($mime));
    }

    public function setUserId($user_id) {
        $this->user_id = Protection::int($user_id);
    }

    public function setAlternativeText($alternativeText) {
        $this->alternative_text = Protection::protect($alternativeText);
    }

    public function getPath() {
        return "uploads/".$this->hash.".".$this->extension;
    }

    public function getName() {
        return $this->name;
    }

    public function getExtension() {
        return $this->extension;
    }

    public function getSize() {
        return $this->size;
    }

    public function getMime() {
        return $this->mime;
    }

    public function getUserID(){
        return $this->user_id;
    }

    public function getAlternativeText(){
        return $this->alternative_text;
    }

    public function user() {
        return User::fetch($this->user_id);
    }

    public function save($remember = true){
        $this->path = $this->getPath();
        parent::save($remember);
    }
}