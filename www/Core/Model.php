<?php
namespace App\Core;


abstract class Model{
    private \DateTime $created_at;
    private \DateTime $updated_at; 
    protected static $tableName;
    static function query(){
        return new QueryBuilder(static::$tableName);
    }
}