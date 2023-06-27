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

    function register(){
        $payload = request()->json();

        $existing = User::fetch(["email"=>$payload['email']]);
        if($existing) throw new UserAlreadyExists();

        $user = new User();
        $user->setFirstname($payload['firstname']);
        $user->setLastname($payload['lastname']);
        $user->setEmail($payload['email']);
        $user->setPassword($payload['password']);
        $user->setVerificationCode();
        $user->save();

        $mailer = new Mailer(SMTP_USERNAME, SMTP_USERNAME, SMTP_PASSWORD, SMTP_HOST);

        $mail = $user->getEmail();
        $verif_code = $user->getVerificationCode();

        $subject = "Verify your account";
        $message = "
            <h1>Thanks For Registration</h1>
            <p>Click on the link below to verify your account</p>
            <a href='http://localhost:8080/verify?email=".$mail."&code=".$verif_code."'>Verify</a>
        ";
        $mailer->sendMail($user->getEmail(), $subject, $message);

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