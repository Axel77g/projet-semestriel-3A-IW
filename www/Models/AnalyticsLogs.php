<?php

namespace App\Models;

use App\Core\Model;
use App\Utils\Protection;
use App\Utils\StringHelpers;

Class AnalyticsLogs extends Model{

    public int $user_id;	


    /*
    *   Setters
    */
    public function setUserId($id){
        $this->user_id = $id;
    }

   
    public function getUserId(){
        return $this->user_id;
    }

   

}