<?php
namespace App\Core;


abstract class Model{

    public Int $id = 0;
    private \DateTime $created_at;
    private \DateTime $updated_at; 

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

    public function destroy() {
        $query = $this->query();
        $query->delete()->where(["id" => $this->id])->execute();
    }

    public function getTable(){
        $className = get_class($this);
        $className = strtolower($className);
        $classNameExploded = explode("\\", $className);
        return "frw_" . end($classNameExploded);

    }

    public function getColumns(){
        return  get_object_vars($this);
    }
    public function getColumnsNames(){
        return array_keys($this->getColumns());
    }

    public function toJson(){
        return json_encode($this->getColumns());
    }

    public function getId() {
        return $this->id;
    }
    
}