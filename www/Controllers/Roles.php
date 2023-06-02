<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Role;
use App\Core\View;
use App\Errors\NotFoundError;

class Roles extends Controller 
{

    /*
    *   @method GET
    *   @route  /roles
    */
    // public function index() 
    // {
    //     $roles = Role::all();

    //     echo $roles->toJson();
    // }

    /*
    *   @method POST
    *   @route  /roles/{id}
    */
    public function create() 
    {
        $payload = request()->json();

        $role = new Role();
        $role->setRole($payload['name']);

        $role->save();

        echo $role->toJson();
    }

    /*
    *   @method PUT
    *   @route  /roles/{id}
    */
    public function update($params) 
    {
        $payload = request()->json();

        $role = Role::fetch($params['id']);

        if(!$role) throw new NotFoundError();

        $role->set($payload);

        $role->save();

        echo $role->toJson();
    }

    /*
    *   @method DELETE
    *   @route  /roles/{id}
    */
    public function destroy($params) {

        $role = Role::fetch($params['id']);

        if(!$role) throw new NotFoundError();

        $role->destroy();

        echo "Role " .$role->getRole() . " deleted";

    }

}