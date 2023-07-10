<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Errors\UserAlreadyExists;
use App\Errors\WrongPassword;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Services\AuthServices;
use App\Core\Mailer;    


class Users extends Controller{
    
    function index() {

        $users = User::all();

        return $users;
    }

    public function me() {
        $auth = request()->auth();
        return $auth->user();
    }

    public function isAdmin(){
        return true;
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

}