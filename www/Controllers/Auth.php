<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\User;
use App\Core\View;
use App\Core\Mailer;

class Auth extends Controller
{

    public function login()
    {
        $view = new View("Auth/login", "back");

    }
    public function logout()
    {
        echo 'logout';
    }
    public function register()
    {
        $user = new User();
        $user->setFirstname("JoFFZD hn");
        $user->setLastname("Doe");
        $user->setEmail("test@example.com");
        $user->setPassword("Bonjour123");
        
        return $user;
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
                    echo "Account verified";
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
        $view = new View("Auth/forgot-password", "back");
    }

    public function resetPassword()
    {
        $user = User::fetch(["email"=>$_POST['email']]);
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
        }else{
            echo "Invalid email";
        }
    }

    public function changePassword()
    {
        if(isset($_GET['email']) && isset($_GET['code'])){
            $email = $_GET['email'];
            $code = $_GET['code'];
            $user = User::fetch(["email"=>$email]);
            if($user){
                if($user->getResetCode() == $code){
                    $view = new View("Auth/change-password", "back");
                }else{
                    echo "Invalid reset code";
                }
            }else{
                echo "Invalid email";
            }
        }
    } 

    public function updatePassword()
    {
        $user = User::fetch(["email"=>$_POST['email']]);
        if($user){
            $user->setResetCode(0);
            if($_POST['new_password'] == $_POST['new_password_confirm']){
                $user->setPassword($_POST['new_password']);
                $user->save();
                $view = new View("Auth/login", "back");
            }
        }else{
            echo "Invalid email";
        }
    }

}