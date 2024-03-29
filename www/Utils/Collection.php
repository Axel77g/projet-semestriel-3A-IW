<?php

namespace App\Utils;

use App\Core\Model;
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

    public function toArray($deep=false){
        if($deep){
            $array = [];
            foreach($this->items as $item){
                if(method_exists($item, "toArray"))
                    $array[] = $item->toArray();
                else
                    $array[] = $item;
            }
            return $array;
        }else {
            return $this->items;
        }
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
        return $this;
    }

    public function sortBy($key, $order = "asc"){
        $this->sort(function($a, $b) use($key, $order){
            
            if(is_a(
                $a,Model::class) && is_a($b, Model::class
                )){
                $getter  = "get".ucfirst($key);
                $valA = $a->$getter();
                $valB = $b->$getter();
            }else{
                $valA = $a->$key;
                $valB = $b->$key;
            }
            
            if($order == "asc"){
                return $valA > $valB;
            }else{
                return $valA < $valB;
            }
        });
        return $this;
    }
    public function sort($callback){
        usort($this->items, $callback);
        return $this;
    }


    public function limit($limit){
        $this->items = array_slice($this->items, 0, $limit);
    }

   
    public function count(){
        return count($this->items);

    }

    public function except(array $keys) : Collection
    {    
        $result = [];
        foreach($this->items as $key=>$value){
            if(!in_array($key, $keys)){
                $result[$key] = $value;
            }
        }
        return new Collection($result);
    }

    public function only(array $keys) : Collection
    {   
        $result = [];
        foreach($this->items as $key=>$value){
            if(in_array($key, $keys)){
                $result[$key] = $value;
            }
        }
        return new Collection($result);
    }


    public function filter(callable $callback){

        $result = [];
        foreach($this->items as $key=>$value){
            if($callback($value, $key)){
                $result[$key] = $value;
            }
        }
        return new Collection($result);

    }

    public function shuffle(){
        shuffle($this->items);
    }
    
}

