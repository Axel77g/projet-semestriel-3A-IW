<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Erros\UserAlreadyExists;
use App\Erros\WrongPassword;
use App\Models\User;
use App\Services\AuthServices;
use App\Core\Mailer;    

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

}