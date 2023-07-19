<?php

namespace App\Controllers;

use App\Models\Page;
use App\Core\Validator;

use App\Core\Controller;
use App\Errors\HTTPError;
use App\Errors\NotFoundError;
use App\Errors\ValidatorError;
use App\Services\PageServices;

class Pages extends Controller
{
    public function index()
    {
        $query = request()->getQuery();
        $where = [];

        if($query->has('template')){
            $where['template'] = $query->get('template');
        }
        if($query->has('ids')){
            $where['id'] = ["IN", explode(",", $query->get('ids'))];
        }
        
        $pages = count($where) ? Page::findMany($where) : Page::all();

        $pages->each(function(&$page){
            $page->path = $page->getPath();
        });
        
        if($query->has('withContent')){
            $pages = $pages->map(function($page){
                return [
                    ...$page->toArray(),
                    "content"=> PageServices::populateContentFileRelation($page->getContent())
                ];
            });
            echo json_encode($pages->toArray());
            return;
        }

        return $pages;
    }

    public function home(){

        $query = request()->getQuery();

        $page = Page::fetch([
            "template" => "home"
        ]);

        if (!$page) {
            throw new NotFoundError();
        }

        $page->path = $page->getPath();

        if($query->has('withContent')){

            $page =
                [
                    ...$page->toArray(),
                    "content"=> PageServices::populateContentFileRelation($page->getContent())
                ];

            echo json_encode($page);
            return;
        }

        return $page;
    }

    public function show($params)
    {

        $page = Page::fetch([
            "slug" => $params['slug']
        ]);

        if (!$page) {
            throw new NotFoundError();
        }


        echo json_encode([
            ...$page->toArray(),
            "content"=> PageServices::populateContentFileRelation($page->getContent())
        ]);
    }

    public function create()
    {

        $payload = request()->json();

        $validator = new Validator();

        $validator->validate($payload, [
            "title" => "required",
            "template" => "required",
            "content" => "required"
        ]);

        $authUser = request()->auth()->user();
        $page = new Page();

        $page->setAuthorId($authUser->id);
        $page->setParentSlug($payload['parent_slug']);
        $page->setTemplate($payload['template']);
        $page->setSlug($payload['title']);
        $page->setTitle($payload['title']);
        $page->setContent($payload['content']);

        if($page->getTemplate() == "home" && Page::exists(["template" => $page->getTemplate()])){
            throw new HTTPError("Template Home have to be unique", 400);
        }

        if (!Page::exists(["slug" => $page->slug])) {
            $page->save();
        } else {
            throw new HTTPError("Page already exist", 400);
        }
        return $page;
    }


    public function update($params)
    {

        $payload = request()->json();

        $page = Page::fetch([
            "slug" => $params['slug']
        ]);

        if (!$page) {
            throw new NotFoundError();
        }

        $validator = new Validator();
        $validator->validate($payload, [
            "title" => "required",
            "template" => "required",
            "content" => "required"
        ]);

        $page->set($payload);
        $page->setSlug($page->getTitle());

        $page->save();

        return $page;
    }


    public function delete($params)
    {
        $payload = request()->json();

        $page = Page::fetch([
            "id" => $params['id']
        ]);

        if (!$page) {
            throw new NotFoundError();
        }

        $page->destroy();

        return $page;
    }

    public function resolvePath()
    {
        $payload = request()->json();

        $validator = new Validator();

        $validator->validate($payload, [
            "path" => "required"
        ]);


        $pages = Page::all()->toArray();

        $page = null;

        foreach ($pages as $p) {
            if ($p->getPath() == $payload['path']) {
                $page = $p;
                break;
            }
        }

        if (!$page) {
            throw new NotFoundError();
        }

        $page->setViews($page->getViews() + 1);
        $page->save();

        $page->author = $page->getAuthor();
        $page->author->except(['email']);
        echo json_encode([
            ...$page->toArray(),
            "content"=> PageServices::populateContentFileRelation($page->getContent())
        ]);
    }

    public function latestArticle(){

        $query = request()->getQuery();

        $pages = Page::all();

        if (!$pages) throw new NotFoundError();
        $pages->sort(
            function($a, $b){
                return $a->getCreatedAt() < $b->getCreatedAt();
            }
        );
        $pages = $pages->filter(function($page){
            return $page->getTemplate() == "article";
        });
        $pages->limit(6);

        $pages->each(function(&$page){
            $page->path = $page->getPath();
        });

        if($query->has('withContent')){
            $pages = $pages->map(function($page){
                return [
                    ...$page->toArray(),
                    "content"=> PageServices::populateContentFileRelation($page->getContent())
                ];
            });
            echo json_encode($pages->toArray());
            return;
        }

        return $pages;
    }

    public function popularArticle(){
        $query = request()->getQuery();
        $pages = Page::all();
        if (!$pages) throw new NotFoundError();
        $pages->sort(
            function($a, $b){
                return $a->getViews() < $b->getViews();
            }
        );
        $pages = $pages->filter(function($page){
            return $page->getTemplate() == "article";
        });
        $pages->limit(6);

        $pages->each(function(&$page){
            $page->path = $page->getPath();
        });

        if($query->has('withContent')){
            $pages = $pages->map(function($page){
                return [
                    ...$page->toArray(),
                    "content"=> PageServices::populateContentFileRelation($page->getContent())
                ];
            });
            echo json_encode($pages->toArray());
            return;
        }
        

        return $pages;
    }

    public function randomArticle(){

        $query = request()->getQuery();
        $pages = Page::all();
        if (!$pages) throw new NotFoundError();
        
        $pages = $pages->filter(function($page){
            return $page->getTemplate() == "article";
        });

        
        $pages->shuffle();

        $pages->limit(6);

        $pages->each(function(&$page){
            $page->path = $page->getPath();
        });

        if($query->has('withContent')){
            $pages = $pages->map(function($page){
                return [
                    ...$page->toArray(),
                    "content"=> PageServices::populateContentFileRelation($page->getContent())
                ];
            });
            echo json_encode($pages->toArray());
            return;
        }


        return $pages;
    }
}
