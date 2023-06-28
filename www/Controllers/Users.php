<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Errors\UserAlreadyExists;
use App\Errors\WrongPassword;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Services\AuthServices;


class Users extends Controller{
    
    function index() {

        $users = User::all();

        return $users;
    }

    public function me() {
        $auth = request()->auth();
        return $auth->user();
    }


    function show($params) {

        $user = User::fetch($params['id']);
        
        UserPolicy::index(request()->auth()->user(),$user);

        if(!$user) throw new NotFoundError();
        return $user;
    }

    function update($params) {
        $payload = request()->json();
        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();
        $user->set($payload);
        $user->save();
        echo $user->toJson();
    }

    function destroy($params) {
        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();
        $user->destroy();
    }

    function register() {
        $payload = request()->json();

        $existing = User::fetch(["email"=>$payload['email']]);
        
        if($existing) throw new UserAlreadyExists();

        $user = new User();
        $user->setFirstname($payload['firstname']);
        $user->setLastname($payload['lastname']);
        $user->setEmail($payload['email']);
        $user->setPassword($payload['password']);
        $user->save();

        return $user;
    }

    function login() {
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