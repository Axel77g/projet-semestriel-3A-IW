<?php


namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class User extends Model{

    protected string $firstname = "";
    protected string $lastname = "";
    protected string $email = "";
    protected string $password = "";

    public function setFirstname($str){
        $this->firstname =  Protection::protect(ucwords(strtolower(trim($str))));
    }

    public function setLastName($str){
        $this->lastname =  Protection::protect(strtoupper(trim($str)));
    }
    
    public function setEmail($str){
        $email =  Protection::protect(strtolower(trim($str)));
        if(!filter_var($email,FILTER_VALIDATE_EMAIL)) throw new \Exception("Invalid email");
        $this->email = $email;
    }

    public function setPassword($str){
        $password =  Protection::protect($str);
        if(strlen($password) < 8) throw new \Exception("Password must be at least 8 characters");
        $this->password = password_hash($password,PASSWORD_DEFAULT);
    }

    public function getPassword(){
        return $this->password;
    }

}