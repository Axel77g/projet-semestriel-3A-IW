<?php

namespace App\Controllers;

use App\Models\Page;
use App\Core\Validator;

use App\Core\Controller;
use App\Errors\HTTPError;
use App\Errors\NotFoundError;
use App\Errors\ValidatorError;

class Pages extends Controller
{


    public function index()
    {

        $pages = Page::all();

        return $pages;
    }

    public function show($params)
    {

        $page = Page::fetch([
            "slug" => $params['slug']
        ]);

        if (!$page) {
            throw new NotFoundError();
        }

        return $page;
    }

    public function create()
    {

        $payload = request()->json();

        $validator = new Validator();

        $validator->validate($payload, [
            "parent_slug" => "required",
            "title" => "required",
            "template" => "required",
            "content" => "required"
        ]);

        if ($validator->hasErrors()) {
            throw new ValidatorError($validator->getErrors());
        }

        $authUser = request()->auth()->user();
        $page = new Page();

        $page->setAuthorId($authUser->id);
        $page->setParentSlug($payload['parent_slug']);
        $page->setSlug($payload['title']);
        $page->setTitle($payload['title']);
        $page->setTemplate($payload['template']);
        $page->setContent($payload['content']);

        if (!Page::exists(["slug" => $page->slug])) {
            $page->save();
        } else {
            throw new HTTPError("Page already exist", 400);
        }

        $page->save();

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
            "parent_slug" => "required",
            "title" => "required",
            "template" => "required",
            "content" => "required"
        ]);

        if ($validator->hasErrors()) {
            throw new ValidatorError($validator->getErrors());
        }

        $page->set($payload);

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
}
