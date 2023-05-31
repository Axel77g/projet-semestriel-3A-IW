<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\Database;
use App\Models\User;

class Users extends Controller{

    public function me(){

        echo "<pre>";
        $user = User::fetch(1);
        $user->setFirstname("Jimmy");
        $user->save();
        //echo "User me";
    }

    function show($params){
        echo "User with id " . $params['id'];
    }

    function deleteMass(){
        echo "delete users";
    }
}