<?php

namespace App\Controllers;

// Core
use App\Core\Validator;
use App\Core\Controller;

// Models
use App\Models\Menu;

// Validators
use App\Errors\HTTPError;
use App\Errors\NotFoundError;
use App\Errors\ValidatorError;

class Menus extends Controller
{

    function index()
    {

        $menus = Menu::all();

        return $menus;
    }

    public function create()
    {

        $payload = request()->json();


        $validator = new Validator($payload, [
            "title" => "required",
            "url" => "required",
            "position" => "numeric",
        ]);

        $menu = new Menu();

        $menu->setTitle($payload['title']);
        $menu->setUrl($payload['url']);
        $menu->setPosition($payload['position']);
        $menu->setVisible($payload['visible']);

        // if (!Menu::fetch(["title" => $payload['title']])) {
        //     throw new HTTPError(409, "Menu already exists");
        // }

        $menu->save();

        return $menu;
    }

    public function show($params)
    {

        $menu = Menu::fetch($params['id']);

        if (!$menu) throw new NotFoundError();

        return $menu;
    }

    public function update($params)
    {

        $payload = request()->json();

        $menu = Menu::fetch($params['id']);

        if (!$menu) throw new NotFoundError();

        $menu->set($payload);

        $menu->save();

        return $menu;
    }

    public function delete($params)
    {

        $menu = Menu::fetch($params['id']);

        if (!$menu) throw new NotFoundError();

        $menu->destroy();

        return $menu;
    }
}
