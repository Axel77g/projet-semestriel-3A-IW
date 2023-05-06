<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\User;

class Users extends Controller{

    public function me(){
        echo "<pre>";
        $query = User::query()->select("firstname")
        ->where([
            "id"=>1,
            "firstname"=>["!=","John"]
        ])->whereIn("age",[10,54])
        ->orderBy("id")
        ->limit(10)
        ->offset(15)
        ->toSql();

        $query2 = User::query()->update([
            "firstname"=>"John",
            "lastname"=>"Doe"
            ])->where(["id"=>15])->toSql();
            
        $query3 = User::query()->insert([
                "firstname"=>"John",
                "lastname"=>"Doe"
        ])->toSql();
                
        $query4 = User::query()->delete()->where(["id"=>15])->toSql();
        var_dump($query);
        var_dump($query2);
        var_dump($query3);
        var_dump($query4);
        //echo "User me";
    }

    function show($params){
        echo "User with id " . $params['id'];
    }

    function deleteMass(){
        echo "delete users";
    }
}