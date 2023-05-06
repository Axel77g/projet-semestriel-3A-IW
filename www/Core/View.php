<?php

namespace App\Core;

use App\Errors\ViewNotFound;
use App\Utils\Protection;

define("VIEW_BASE_PATH","Views/");

class View{
    private $template;
    private $view;
    public $data = [];
    
    public function __construct($viewName,$template="front")
    {
        $this->setTemplate($template);
        $this->setView($viewName);
   
    }

    public function setView($viewName){
        if($viewName == null){
            return;
        }
        $viewPath = VIEW_BASE_PATH.$viewName.".view.php";
        if(!file_exists($viewPath)){
            throw new ViewNotFound($viewPath);
        }
        $this->view = $viewPath;
    }

    public function setTemplate($template){
        
        $templatePath = VIEW_BASE_PATH.$template.".tpl.php";
        if(!file_exists($templatePath)){
            throw new ViewNotFound($templatePath);
        }
        $this->template = $templatePath;
    }

    public function asign($key,$value){
        $temp = $this->data;
        $temp[$key] = $value;
        $this->setData($temp);
    }

    public function massAsign($array){
        $temp = $this->data;
        foreach($array as $key => $value){
            $temp[$key] = $value;
        }
        $this->setData($temp);
    }

    public function setData($data){
        $this->data = Protection::protectArray($data);
    }

    public function __destruct()
    {
        extract($this->data);
        include $this->template;
    }
}