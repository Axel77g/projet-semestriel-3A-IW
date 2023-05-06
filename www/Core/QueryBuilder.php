<?php

namespace App\Core;

use App\Errors\NoColumnFound;
use PDO;

class QueryBuilder {
    private Database $db;
    private string $table;
    private string $query = "";

    public function __construct($table)
    {
        $this->setTable($table);
        $this->db = Database::getInstance();
    }
    public function setTable($table){
        $this->table = strtolower($table);
    }

    public function getTableColumns(){

        $query = $this->db->getConnection()->prepare("SELECT column_name FROM information_schema.columns WHERE table_name = '$this->table'");
        $query->execute();  
        return $query->fetchAll(PDO::FETCH_COLUMN);

    }

    public function hasWhere(){
       
        return strpos($this->query, "WHERE") !== false;
    }

    

    public function select($columns = "*")
    {
        if(is_array($columns)){
            $columnsTemp = array_intersect($columns, $this->getTableColumns());
            $columnsTemp = implode(",", $columns);
            if(empty($columnsTemp))
                throw new NoColumnFound($this->table, implode(",", $columns));
            $columns = $columnsTemp;
        }else {
            if(!in_array($columns, $this->getTableColumns()))
                throw new NoColumnFound($this->table,$columns);
        }
        $this->query = "SELECT $columns FROM $this->table";
        return $this;
    }

    public function update($payload){

        $payload = array_intersect_key($payload, array_flip($this->getTableColumns()));

        $base = "UPDATE $this->table SET";
        foreach($payload as $key => $value){
            $base .= " $key = '$value',";
        }
        $base = rtrim($base,",");
        $this->query = $base;
        return $this;
    }

    public function insert($payload){
        $payload = array_intersect_key($payload, array_flip($this->getTableColumns()));
        $columns = array_keys($payload);
        $columns = implode(",", $columns);
        $values = array_values($payload);
        $values = implode("','", $values);
        $this->query = "INSERT INTO $this->table ($columns) VALUES ('$values')";
        return $this;
    }

    public function delete(){
        $this->query = "DELETE FROM $this->table";
        return $this;
    }

    public function where($arrayWhere){

        $arrayWhere = array_intersect_key($arrayWhere, array_flip($this->getTableColumns()));
        
        $base = !$this->hasWhere() ? " WHERE" : " AND";
        foreach($arrayWhere as $key => $value){
            if(is_array($value))
                $base .= " $key $value[0] '$value[1]' AND";
            else 
                $base .= " $key = '$value' AND";
        }
        $base = rtrim($base,"AND");
        $this->query .= $base;
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
}