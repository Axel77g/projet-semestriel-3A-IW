<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\Page;


class Analytics extends Controller
{
    function top_articles(){
        // echo "top articles";

        $page = Page::all();
        if (!$page) throw new NotFoundError();
        $page->sort(
            function($a, $b){
                return $a->getViews() < $b->getViews();
            }
        );
        $page->filter(function($page){
            return $page->getTemplate() == "article";
        });
        $page->limit(5);
        

        return $page;

    }
}

