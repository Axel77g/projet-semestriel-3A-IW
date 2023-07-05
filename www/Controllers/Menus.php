<?php

namespace App\Controllers;

use App\Models\Menu;
use App\Core\Controller;
use App\Errors\HTTPError;
use App\Errors\NotFoundError;

class Menus extends Controller{

    function index() {

        $menus = Menu::all();

        return $menus;

    }

    public function create() {

        $payload = request()->json();

        $menu = new Menu();

        $menu->setTitle($payload['title']); 
        $menu->setUrl($payload['url']);

        if(!empty($payload['parent_id'])) {
            $menu->setParentId($payload['parent_id']);
        }

        if(!Menu::exists(['title' => $menu->title])) {
            $menu->save();
        } else {
            throw new HTTPError('Title already exist', 400);
        }

        $menu->save();

        return $menu;


    }

    public function update($params) {

        $payload = request()->json();

        $menu = Menu::fetch($params['id']);
        
        if(!$menu) throw new NotFoundError();
        
        if(!Menu::exists(['title' => $payload['title']])) {
            $menu->setTitle($payload['title']);
        } else {
            throw new HTTPError('Title already exist', 400);
        }

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