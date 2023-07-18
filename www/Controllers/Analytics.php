<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use App\Models\AnalyticsLogs;
use App\Models\Comment;
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
        $page = $page->filter(function($page){
            return $page->getTemplate() != "article_list";
        });
        $page->limit(5);
        

        return $page;

    }

    function stat_logs(){
        $analytics = AnalyticsLogs::all();
        if (!$analytics) throw new NotFoundError();

        return $analytics;
    }

    function stat_comments(){
        $comments = Comment::all();
        if (!$comments) throw new NotFoundError();
        
        return $comments;
    }
}

