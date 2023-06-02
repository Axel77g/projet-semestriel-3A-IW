<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\User;
use App\Services\AuthServices;

class Users extends Controller{
    
    public function me(){

        $auth = request()->auth();
        return $auth->user();
    }

    function show($params){
        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();
        return $user;
    }

    function deleteMass(){
        echo "delete users";
    }

    function register(){
        $payload = request()->json();

        $existing = User::fetch(["email"=>$payload['email']]);
        if($existing){
            echo "User already exists";
            return;
        }

        $user = new User();
        $user->setFirstname($payload['firstname']);
        $user->setLastname($payload['lastname']);
        $user->setEmail($payload['email']);
        $user->setPassword($payload['password']);
        $user->save();

        return $user;
    }

    function login(){
        $payload = request()->json();
        
        $user = User::fetch(["email"=>$payload['email']]);
        if(!$user){
            echo "User not found";
            return;
        }

        $pass = AuthServices::isCorrectPassword($payload['password'],$user->getPassword());
        
        if(!$pass){
            echo "Wrong password";
            return;
        }

        $token = AuthServices::generateToken($user);
        echo json_encode([
            "token"=> $token
        ]);

    }
}