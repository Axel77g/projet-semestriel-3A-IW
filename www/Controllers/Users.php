<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\User;
use App\Policies\UserPolicy;
use App\Core\Validator;
use App\Errors\Unauthorized;
use App\Errors\ValidatorError;

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

        $validator = new Validator();
        $validation = [
            "firstname" => "required",
            "lastname" => "required",
            "email" => "required|email",
        ];

        if(!empty($payload['password'])){
            $validation = array_merge($validation,[
                "password" => "required|minLength:8|maxLength:50",
                "password_confirmation" => "required|minLength:8|maxLength:50"
            ]);
        }else{
            unset($payload['password']);
        }

        if(!empty($payload['role'])){
            $authUser = request()->auth()->user();
            if(!$authUser->isAdmin()) throw new Unauthorized();
        }


        $validator->validate($payload,$validation);

        if($validator->hasErrors()) throw new ValidatorError($validator->getErrors());

        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();

        $existing = User::fetch(["email"=>$payload['email']]);
        if($existing && $existing->id != $user->id) throw new ValidatorError(["email"=>["Cet email existe déjà"]]);

        $user->set($payload);
        $user->save();
  
        return $user;
    }

    function destroy($params) {
        $user = User::fetch($params['id']);
        if(!$user) throw new NotFoundError();
        $user->destroy();
    }

}