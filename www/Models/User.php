<?php


namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;

class User extends Model{

    protected Int $role_id = DEFAULT_ROLE;
    protected string $firstname = "";
    protected string $lastname = "";
    protected string $email = "";
    protected string $password = "";
    protected Int $is_verified = 0;
    protected string $verification_code = "";
    protected Int $reset_code = 0;

    public function getResetCode(){
        return $this->reset_code;
    }

    public function setResetCode($int = 1){
        if($int == 1){
            $this->reset_code = rand(100000,999999);
        }
        else{
            $this->reset_code = $int;
        }
    }

    public function setVerificationCode(){
        $this->verification_code = bin2hex(random_bytes(32));
    }

    public function getVerificationCode(){
        return $this->verification_code;
    }

    public function setIsVerified($int){
        $this->is_verified = $int;
    }

    public function setFirstname($str){
        $this->firstname =  Protection::protect(ucwords(strtolower(trim($str))));
    }

    public function setLastname($str){
        $this->lastname =  Protection::protect(strtoupper(trim($str)));
    }
    
    public function setEmail($str){
        $email =  Protection::protect(strtolower(trim($str)));
        if(!filter_var($email,FILTER_VALIDATE_EMAIL)) throw new \Exception("Invalid email");
        $this->email = $email;
    }

    public function setRoleId(Int $role_id){
        $this->role_id = $role_id;
    }
    
    public function getEmail(){
        return $this->email;
    }

    public function setPassword($str){
        $password =  Protection::protect($str);
        if(strlen($password) < 8) throw new \Exception("Password must be at least 8 characters");
        $this->password = password_hash($password,PASSWORD_DEFAULT);
    }

    public function getPassword(){
        return $this->password;
    }

    public function role() {
        return Role::fetch(["id"=>$this->role_id]);
    }

    public function hasRole(Role $role) {    
        return $this->role_id == $role->getId();
    }
}
