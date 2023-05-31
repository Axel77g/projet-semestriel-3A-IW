<?php

namespace App\Services;

use App\Models\Auth;

class AuthServices{
    static function isCorrectPassword($password, $hash){
        return password_verify($password, $hash);
    }
    static function generateToken($user){

        $existing = Auth::fetch([
            "user_id"=>$user->id,
            "expire_on" => [">=","NOW()"]
        ]);
        if($existing && $existing->isValid()) return $existing->getToken();

        $auth = new Auth($user);
        $auth->save();
        return $auth->getToken();
    }  

}