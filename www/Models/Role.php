<?php 

namespace App\Models;

use App\Core\Model;
use App\Errors\InternalError;
use App\Utils\Protection;

class Role extends Model {

    protected $name = "";

    public function setRole($role) {
        $this->name = Protection::protect(ucwords(strtolower(trim($role))));
    }   

    public function getRole() {
        return $this->name;
    }

}