<?php
namespace App\Core;
use App\Utils\Collection;
use App\Utils\StringHelpers;

use App\Errors\BadRequest;
use DateTime;

abstract class Model implements Sanitize{

    public Int $id = 0;
    protected string|\DateTime $created_at;
    protected string|\DateTime $updated_at; 


    public static function findMany($where = [], $limit = 0, $offset = 0, $orderBy = []){
        $class = get_called_class();
        $model = new $class();
        $query = $model->query();
        $result = $query->select()->where($where)->offset($offset)->execute();
        if($limit > 0){
            $result->limit($limit);
        }
        return new Collection($result->fetchAll());
    }

    public function query(){
        return new QueryBuilder($this);
    }

    public function save(){
        $query = $this->query();
        if($this->id > 0){
            
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
        $result = $query->select()->execute();
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
        return  get_object_vars($this);
    }
    public function getColumnsNames(){
        return array_keys($this->getColumns());
    }

    public function toJson(){

        $columns = $this->getColumns();

        if(isset($columns["password"])){
            unset($columns["password"]);
        }

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

        $columns = $this->getColumns();
        
        if(isset($columns["password"])){
            unset($columns["password"]);
        }

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

}


    
