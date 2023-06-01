<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Erros\UserAlreadyExists;
use App\Erros\WrongPassword;
use App\Models\User;
use App\Services\AuthServices;

class Users extends Controller{
    
    public function me(){
        $auth = request()->auth();
        echo $auth->user()->toJson();
    }

    function show($params){
        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();
        echo $user->toJson();
    }

    function update($params){
        $payload = request()->json();
        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();
        $user->set($payload);
        $user->save();
        echo $user->toJson();
    }

    function destroy($params){
        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();
        $user->destroy();
    }

    function register(){
        $payload = request()->json();

        $existing = User::fetch(["email"=>$payload['email']]);
        if($existing) throw new UserAlreadyExists();

        $user = new User();
        $user->setFirstname($payload['firstname']);
        $user->setLastname($payload['lastname']);
        $user->setEmail($payload['email']);
        $user->setPassword($payload['password']);
        $user->save();

        echo $user->toJson();
    }

    function login(){
        $payload = request()->json();
        
        $user = User::fetch(["email"=>$payload['email']]);
        if(!$user) throw new NotFoundError();

        $pass = AuthServices::isCorrectPassword($payload['password'],$user->getPassword());
        
        if(!$pass) throw new WrongPassword();

        $token = AuthServices::generateToken($user);
        echo json_encode([
            "token"=> $token
        ]);

    }
}