<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\View;

class Main extends Controller
{
    public function index(){
        $view = new View("Main/index","front");
        $view->asign("name","<h3>Index Controller</h3>");
    }
    public function contact(){
        $view = new View("Main/index","front");
        $view->asign("name","<h3>Contact Controller</h3>");

    }

    // ADMIN - BACK-OFFICE
    public function dashboard()
    {
        $view = new View("Main/dashboard", "front");
    }
}
