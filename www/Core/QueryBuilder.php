<?php

namespace App\Core;

use App\Errors\InternalError;
use App\Errors\NoColumnFound;
use PDO;

class QueryBuilder {
    private Database $db;
    private string $table;
    private $model;
    private string $query = "";

    private array $execPayload = [];

    public function __construct($model)
    {   
        $this->model = $model;
        $this->db = Database::getInstance();
        $this->table = $model->getTable() ;
    }


    public function hasWhere(){
        return strpos($this->query, "WHERE") !== false;
    }

    public function select($columns = "*")
    {
        if(is_array($columns)){
            $columnsTemp = array_intersect($columns, $this->model->getColumnsNames());
            $columnsTemp = implode(",", $columns);
            if(empty($columnsTemp))
                throw new NoColumnFound($this->table, implode(",", $columns));
            $columns = $columnsTemp;
        }else if ($columns != "*") {
            if(!in_array($columns, $this->model->getColumnsNames()))
                throw new NoColumnFound($this->table,$columns);
        }
        $this->query = "SELECT $columns FROM $this->table";
        return $this;
    }

    public function update($payload = null){
        if($payload == null)
            $payload = $this->model->getColumns();
        
       
    
        $payload = array_intersect_key($payload, array_flip($this->model->getColumnsNames()));
        $base = "UPDATE $this->table SET";

        foreach($payload as $key => $value){
            $base .= " $key = :$key,";
        }
        $base = rtrim($base,",");

        $this->query = $base;
        
        //concatenate payload

        $this->execPayload = array_merge($this->execPayload, $payload);
        
        return $this;
    }

    public function insert($payload = null){
        if($payload == null)
            $payload = $this->model->getColumns();

        $payload = array_intersect_key($payload, array_flip($this->model->getColumnsNames()));
        unset($payload['id']);
        $columns = implode(", ", array_keys($payload));
        $preparedValues = array_map(function($value){
            return ":$value";
        },array_keys($payload));
        $values = implode(", ", $preparedValues);

        $this->query = "INSERT INTO $this->table ($columns) VALUES ($values)";
        $this->execPayload = array_merge($this->execPayload, $payload);

        return $this;
    }

    public function delete(){
        $this->query = "DELETE FROM $this->table";
        return $this;
    }

    public function where($arrayWhere){
        $arrayWhere = array_intersect_key($arrayWhere, array_flip($this->model->getColumnsNames()));
        
        $base = !$this->hasWhere() ? " WHERE" : " AND";
        foreach($arrayWhere as $key => $value){
            if(is_array($value)){
                $base .= " $key $value[0] :$key AND";
                $arrayWhere[$key] = $value[1];
            }
            else 
                $base .= " $key = :$key AND";
        }
        $base = rtrim($base,"AND");
        $this->query .= $base;
        $this->execPayload = array_merge($this->execPayload, $arrayWhere);
        return $this;
    }

    public function whereIn($prop,$value=[]){
        $value = implode(",", $value);
        $base = !$this->hasWhere() ? " WHERE" : " AND";
        $base .= " $prop IN ($value)";
        $base = rtrim($base,"AND");
        $this->query .= $base;
        return $this;
    }

    public function orderBy($property, $direction = "ASC"){
        $this->query .= " ORDER BY $property $direction";
        return $this;
    }

    public function limit($limit){
        $this->query .= " LIMIT $limit";
        return $this;
    }

    public function offset($offset){
        $this->query .= " OFFSET $offset";
        return $this;
    }

    public function toSql(){
        return $this->query;
    }

    public function execute($lastId = false){
        
        if(str_contains($this->query, "DELETE" && !str_contains("WHERE", $this->query))) {
            throw new InternalError("DELETE without WHERE");
        }

        
        $pdo = $this->db->getConnection();
        $stmt = $pdo->prepare($this->query);
        $stmt->setFetchMode(\PDO::FETCH_CLASS,get_class($this->model));
        $this->parseExecPayload();
        // var_dump($this->execPayload);
        $stmt->execute($this->execPayload);
        if($lastId)
            return $pdo->lastInsertId();
        return $stmt;
    }

    public function debug(){
        echo "<pre>";
        var_dump($this->query);
        var_dump($this->execPayload);
        echo "</pre>";
       
    }

    public function parseExecPayload(){
        foreach($this->execPayload as $key => $value){
            if($value instanceof \DateTime){
                $this->execPayload[$key] = $value->format("Y-m-d H:i:s");
            }
        }
        
    }
}