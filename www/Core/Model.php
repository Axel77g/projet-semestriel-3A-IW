<?php
namespace App\Core;
use App\Utils\Collection;
use App\Utils\StringHelpers;

use DateTime;

abstract class Model implements Sanitize{

    public Int $id = 0;
    protected string|\DateTime $created_at;
    protected string|\DateTime $updated_at; 

    private array $_except = [];


    public function __construct(){
        if($this->id > 0 && method_exists($this, "setOldValue")){            
            $this->setOldValue($this->toArray());
        }
    }

    public static function findMany($where = [], $limit = 0, $offset = 0, $orderBy = []){
        $class = get_called_class();
        $model = new $class();
        $query = $model->query();
        $query = $query->select();
       
        if(count($where) > 0){
            $query->where($where);
        }

        if(count($orderBy) > 0){
            $query->orderBy($orderBy[0], $orderBy[1]);
        }else{
            $query->orderBy("id", "ASC");
        }

        if($limit > 0){
            $query->limit($limit);
        }
        
        if($offset > 0){
            $query->offset($offset);
        }

        $result = $query->execute();
        return new Collection($result->fetchAll());
    }

    public function query(){
        return new QueryBuilder($this);
    }

    public function save($remember = true){
        $query = $this->query();
        if($this->id > 0){ 
            if(method_exists($this, "remember") && $remember){
                $this->remember();
            }
            $query->update()->where(["id"=>$this->id])->execute();
            return $this;
        }else{ 
            $this->id = $query->insert()->execute(true);
            return $this;
        }
    }

    public static function fetch($params){
        if(!is_array($params)){
            $params = ["id"=>$params];
        }
        $class = get_called_class();
        $model = new $class();
        $query = $model->query();
       
        $result = $query->select()->where($params)->execute();
        return $result->fetch();
    }

    public static function exists($params){
        
        return (boolean) self::fetch($params);
    }

    public static function all() : Collection
    {
        $class = get_called_class();
        $model = new $class();
        $query = $model->query();
        $result = $query->select()->orderBy("id","ASC")->execute();
        return new Collection($result->fetchAll());

    }
    
    public function destroy() {
        $query = $this->query();
        return $query->delete()->where(["id" => $this->id])->execute();
        
    }

    public function getTable(){
        $className = get_class($this);
        
        $classNameExploded = explode("\\", $className);
        $endClassName = end($classNameExploded);
        $endClassName =  StringHelpers::camelCaseToSnakeCase($endClassName);
        return DB_PREFIX . $endClassName ;

    }

    public function getColumns(){
        $columns = get_object_vars($this);
        $columns = array_filter($columns, function($key){
            return strpos($key, "_") !== 0;
        }, ARRAY_FILTER_USE_KEY);
        return $columns ;
    }
    public function getColumnsNames(){
        return array_keys($this->getColumns());
    }

    public function toJson(){
        
        $baseExcept = new Collection($this->_except);
        $except = $baseExcept->filter(function($item){
            return strpos($item, ".") === false;
        });

        $columns = new Collection($this->getColumns());
        $columns = $columns->except($except->toArray())->toArray();

        foreach($columns as $key => $value){
            if(is_a($value, Model::class)){
                $columns[$key] = $value->toArray();
            }
            if(is_a($value, Collection::class)){
                $columns[$key] = $value->toArray(true);
            }
        }

        return json_encode($columns);
    }
    
    public function toArray(){
        
        $baseExcept = new Collection($this->_except);
        $except = $baseExcept->filter(function($item){
            return strpos($item, ".") === false;
        });

        $columns = new Collection($this->getColumns());
        $columns = $columns->except($except->toArray())->toArray();

        foreach($columns as $key => $value){
            if(is_a($value, Model::class)){
                $columns[$key] = $value->toArray();
            }
            if(is_a($value, Collection::class)){
                $columns[$key] = $value->toArray(true);
            }
        }

        return $columns;
    }

    public function set(array $params){
        foreach($params as $key => $value){
            $setter = StringHelpers::snakeCaseToCamelCase("set" . ucfirst($key));
            if(method_exists($this, $setter))
                $this->$setter($value);
        }
    }
    public function getId() {
        return $this->id;
    }

    public function getCreatedAt() {
        return new DateTime($this->created_at);
    }

    public function getUpdatedAt() {
        return new DateTime($this->updated_at);
    }

    public function setCreatedAt($created_at) {
        $this->created_at = $created_at;
    }

    public function setUpdatedAt($updated_at) {
        $this->updated_at = $updated_at;
    }

    public function except(array $except) {
        $this->_except = $except;
        return $this;
    }
    protected function getExcept(){
        return $this->_except;
    }

}


    
