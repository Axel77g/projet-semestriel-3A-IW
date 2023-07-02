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
        $this->user_id = Protection::protect($user_id);
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

    public function user() {
        return User::fetch($this->user_id);
    }

    public function save(){
        $this->path = $this->getPath();
        parent::save();
    }

    
}