<?php

namespace App\Controllers;

use App\Models\Menu;
use App\Core\Controller;
use App\Errors\HTTPError;
use App\Errors\NotFoundError;

// Validators
use App\Core\Validator;
use App\Errors\ValidatorError;

class Menus extends Controller{

    function index() {

        $menus = Menu::all();

        return $menus;

    }

    public function create() {

        $payload = request()->json();

        $validator = new Validator();

        $validator->validate($payload, [
            "title" => "required",
            "url" => "required",
            "position" => "numeric",
            "visible" => "required"
        ]);

        $menu = new Menu();

        $menu->setTitle($payload['title']); 
        $menu->setUrl($payload['url']);
        $menu->setPosition($payload['position']);
        $menu->setVisible($payload['visible']);

        $menu->save();

        return $menu;

    }

    public function show($params) {

        $menu = Menu::fetch($params['id']);

        if(!$menu) throw new NotFoundError();

        return $menu;

    }

    public function update($params) {

        $payload = request()->json();

        $menu = Menu::fetch($params['id']);
        
        if(!$menu) throw new NotFoundError();
        
        $menu->set($payload);
        
        $menu->save();

        return $menu;

    }

    public function delete($params) {

        $menu = Menu::fetch($params['id']);

        if(!$menu) throw new NotFoundError();

        $menu->destroy();

        return $menu;

    }

}