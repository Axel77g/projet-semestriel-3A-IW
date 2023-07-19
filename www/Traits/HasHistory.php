<?php
namespace App\Traits;

use App\Services\HistoryServices;

trait HasHistory{

    protected $_old_value = [];

    public function setOldValue($array){
        unset($array["created_at"]);
        unset($array["updated_at"]);
        $this->_old_value = $array;
    }

    public function remember(){
        if(empty($this->_old_value)){
            return;
        }
        HistoryServices::remember($this, $this->_old_value);
    }
    /*public function getHistory(){
        return HistoryServices::retrieveAll($this->getId(), get_class($this));
    } */   

}