<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\View;

class Main extends Controller
{
    public function index(){
        $viewName = "Main/index";
        if(INSTALLER){
            $viewName = "Main/installer";
        }
        $view = new View($viewName,"front");
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
