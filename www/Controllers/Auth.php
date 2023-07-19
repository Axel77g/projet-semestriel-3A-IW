<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\User;
use App\Core\Mailer;
use App\Services\AuthServices;
use App\Core\Validator;
use App\Errors\ValidatorError;
use App\Models\AnalyticsLogs;
use App\Errors\Unauthorized;

class Auth extends Controller
{

    function login(){
        $payload = request()->json();
        $validator = new Validator();
        $validator->validate(
        $payload,[
            "email"=>"required|email|emailNotExists",
            "password"=>"required|CheckPassword:". $payload['email'],
        ]);
        $user = User::fetch(["email"=>$payload['email']]);

        addAnalyticsLogs($user->getId());

        $token = AuthServices::generateToken($user);
        echo json_encode([
            "role"=> $user->getRole(),
            "success"=> true,
            "token"=> $token
        ]);
    }

    public function logout()
    {
        echo 'logout';
    }
    
    function register(){

        $payload = request()->json();
        $validator = new Validator();
        $validator->validate(
        $payload,[
            "firstname"=>"required",
            "lastname"=>"required",
            "email"=>"required|email|emailAlreadyExists",
            "password"=>"required",
        ]);
       
        $user = new User();
        $user->setFirstname($payload['firstname']);
        $user->setLastname($payload['lastname']);
        $user->setEmail($payload['email']);
        $user->setPassword($payload['password']);

        if(!empty($payload['role'])){
            $authUser = request()->auth()->user();
            if(!$authUser->isAdmin()) {
                throw new Unauthorized();
            }
            else{
                $user->setRole($payload['role']);
            }
        }
        $user->setVerificationCode();
        $user->save();

        $mailer = new Mailer(SMTP_USERNAME, SMTP_USERNAME, SMTP_PASSWORD, SMTP_HOST);

        $mail = $user->getEmail();
        $verif_code = $user->getVerificationCode();

        $subject = "Verify your account";
        $message = "
            <h1>Thanks For Registration</h1>
            <p>Click on the link below to verify your account</p>
            <a href='https://".$_SERVER['HTTP_HOST']."/verify?email=".$mail."&code=".$verif_code."'>Verify</a>
        ";
        $mailer->sendMail($user->getEmail(), $subject, $message);

        addAnalyticsLogs($user->getId());

        echo json_encode([
            "success"=> true,
        ]);
    }

    public function verify()
    {
        if(isset($_GET['email']) && isset($_GET['code'])){
            $email = $_GET['email'];
            $code = $_GET['code'];
            $user = User::fetch(["email"=>$email]);
            if($user){
                if($user->getVerificationCode() == $code){
                    $user->setIsVerified(1);
                    $user->save();
                    header("Location: /login");
                }else{
                    echo "Invalid verification code";
                }
            }else{
                echo "Invalid email";
            }
        }
    }

    public function forgotPassword()
    {

        $payload = request()->json();
        $validator = new Validator();
        $validator->validate(
        $payload,[
            "email"=>"required|email|emailNotExists"
        ]);
        $user = User::fetch(["email"=>$payload['email']]);
        $user->setResetCode();
        $user->save();
        $mailer = new Mailer(SMTP_USERNAME, SMTP_USERNAME, SMTP_PASSWORD, SMTP_HOST);
        $mail = $user->getEmail();
        $reset_code = $user->getResetCode();

        $subject = "Change your password";
        $message = "
            <p>Click on the link below to change your password</p>
            <a href='http://".$_SERVER['HTTP_HOST']."/change-password?email=".$mail."&code=".$reset_code."'>Change your password</a>
        ";
        $mailer->sendMail($user->getEmail(), $subject, $message);
        echo json_encode([
            "success"=> true
        ]);
    }

    public function updatePassword()
    {
        $payload = request()->json();
        $pwd = $payload['password'];
        $cpwd = $payload['confirmPassword'];
        $email = $_REQUEST['email'];
        $code = $_REQUEST['code'];

        $validator = new Validator();
        $validator->validate(
        $payload,[
            "password"=>"required",
            "confirmPassword"=>"required|ConfirmPassword:". $pwd,
        ]);
   
        if(isset($email) && isset($code)){
            $user = User::fetch(["email"=>$email]);
            if($user){
                if($user->getResetCode() == $code){
                    $user->setPassword($pwd);
                    $user->setResetCode(0);
                    $user->save();
                    echo json_encode([
                        "success"=> true
                    ]);
                }else{
                    echo "Invalid reset code";
                }
            }else{
                echo "Invalid email";
            }
        }
    }

}

function addAnalyticsLogs($user_id = 0){
    $analytics = new AnalyticsLogs();
    $analytics->setUserId($user_id);
    $analytics->save();

}