<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\User;

class Auth extends Controller{


    public function login(){
       echo 'login';
        
    }
    public function logout(){
        echo 'logout';
    }
    public function register(){
        $user = new User();
        $user->setFirstname("JoFFZD hn");
        $user->setLastname("Doe");
        $user->setEmail("test@example.com");
        $user->setPassword("Bonjour123");
        echo "<pre>";
        print_r($user);
    }
}