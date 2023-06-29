<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\User;
use App\Core\View;
use App\Core\Mailer;
use App\Errors\NotFoundError;
use App\Erros\UserAlreadyExists;
use App\Erros\WrongPassword;
use App\Services\AuthServices;

class Auth extends Controller
{

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

    public function logout()
    {
        echo 'logout';
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
                    header("Location: http://localhost:8080/login");
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
        $user = User::fetch(["email"=>$payload['email']]);
        if($user){
            $user->setResetCode();
            $user->save();
            $mailer = new Mailer(SMTP_USERNAME, SMTP_USERNAME, SMTP_PASSWORD, SMTP_HOST);
            $mail = $user->getEmail();
            $reset_code = $user->getResetCode();

            $subject = "Change your password";
            $message = "
                <p>Click on the link below to change your password</p>
                <a href='http://localhost:8080/change-password?email=".$mail."&code=".$reset_code."'>Change your password</a>
            ";
            $mailer->sendMail($user->getEmail(), $subject, $message);

            echo json_encode([
                "success"=> true
            ]);
            
        }else{
            echo "Invalid email";
        }
    }

    public function updatePassword()
    {
        $payload = request()->json();
        $pwd = $payload['password'];
        $cpwd = $payload['confirmPassword'];
        $email = $_REQUEST['email'];
        $code = $_REQUEST['code'];
   
        if(isset($email) && isset($code)){
            $user = User::fetch(["email"=>$email]);
            if($user){
                if($user->getResetCode() == $code){
                    if($pwd == $cpwd){
                        $user->setPassword($pwd);
                        $user->setResetCode(0);
                        $user->save();
                        echo json_encode([
                            "success"=> true
                        ]);
                    }else{
                        echo "Passwords don't match";
                    }
                }else{
                    echo "Invalid reset code";
                }
            }else{
                echo "Invalid email";
            }
        }
    }

}