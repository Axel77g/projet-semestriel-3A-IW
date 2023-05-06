<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\View;

class Main extends Controller{
    public function index(){
        $view = new View("Main/index","front");
        $view->asign("name","<h3>Index Controller ta darone Robin</h3>");
    }
    public function contact(){
        $view = new View("Main/index","front");
        $view->asign("name","<h3>Contact Controller ta darone Robin</h3>");

    }
}