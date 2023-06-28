<?php

namespace App\Utils;
use App\Core\Sanitize;

class Collection implements Sanitize{

    private $items = [];

    function __construct($items = []){
        $this->items = $items;
    }

    public function toJson(){
        $jsonArray = [];
        $this->each(function($model) use(&$jsonArray){
            $jsonArray[] = $model->toArray();
        });
        return json_encode($jsonArray);
    }

    public function toArray(){
        return $this->items;
    }

    public function map($callback){       
        foreach($this->items as &$item){
            $item = $callback($item);
        }
        return $this;
    }

    public function each($callback){
        foreach($this->items as $item){
            $callback($item);
        }
    }

    // filters    
    public function reverse(){
        $this->items = array_reverse($this->items);
    }

    public function sortBy($key, $order = "asc"){
        $this->sort(function($a, $b) use($key, $order){
            if($order == "asc"){
                return $a->$key > $b->$key;
            }else{
                return $a->$key < $b->$key;
            }
        });
    }
    public function sort($callback){
        usort($this->items, $callback);
    }
    
}

