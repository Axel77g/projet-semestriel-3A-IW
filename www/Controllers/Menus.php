<?php

namespace App\Controllers;

use App\Core\Validator;
use App\Core\Controller;
use App\Errors\BadRequest;
use App\Models\Menu;

use App\Errors\NotFoundError;
use App\Errors\ValidatorError;
use App\Policies\MenuPolicy;
use App\Utils\Collection;

class Menus extends Controller
{

    function index(): Collection
    {
        $query = request()->getQuery();
        $where = [
            'visible'=>1
        ];

        if($query->has('footer')){
            $where = [
                ...$where,
                "is_footer" => 1
            ];
        }

        if($query->has('header')){
            $where = [
                ...$where,
                "is_header" => 1
            ];
        }
       
        if($query->has('all')){   
            MenuPolicy::displayInvisble(request()->auth()->user());
            unset($where['visible']);
        }

        $menus = Menu::findMany($where);
        $menus->each(function(&$menu){
            $menu->url = $menu->getPath();
        });

        $menus->sortBy("position");
        return $menus;
    }

    public function create(): Menu
    {
        $payload = request()->json();

        $validator = new Validator();

        $validator->validate($payload, [
            "title" => "required",
            "page_id" => "required",
            "position" => "numeric",
        ]);

        $menu = new Menu();
        
        $menu->setPageId($payload['page_id']);
        if (!$menu->getPage()) throw new BadRequest();

        $menu->setTitle($payload['title']);
        $menu->setParentId($payload['parent_id'] ?? null);
        $menu->setPosition($payload['position']);
        $menu->setVisible($payload['visible']);
        $menu->setIsFooter($payload['is_footer']);
        $menu->setIsHeader($payload['is_header']);
        $menu->save();

        return $menu;
    }

    public function show($params): Menu
    {
        $menu = Menu::fetch($params['id']);

        if (!$menu) throw new NotFoundError();

        return $menu;
    }

    public function update($params): Menu
    {
        $payload = request()->json();

        $validator = new Validator();

        $validator->validate($payload, [
            "title" => "required",
            "page_id" => "required",
            "position" => "numeric",
        ]);

        if ($validator->hasErrors()) {
            throw new ValidatorError($validator->getErrors());
        }

        $menu = Menu::fetch($params['id']);

        if (!$menu) throw new NotFoundError();

        $menu->set($payload);

        if (!$menu->getPage()) throw new BadRequest();

        $menu->save();

        return $menu;
    }

    public function delete($params): Menu
    {

        $menu = Menu::fetch($params['id']);

        if (!$menu) throw new NotFoundError();

        $menu->destroy();

        return $menu;
    }
}
