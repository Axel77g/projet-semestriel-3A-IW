<?php

namespace App\Services;

use App\Models\File; 

class PageServices {
    /* 
        Populate all the key that start with "file_" with the file object linked to the id
    */
    static function populateContentFileRelation(array $contentObj) : array
    {

        foreach($contentObj as $key => $value){
            if(is_array($value)){
                $contentObj[$key] = self::populateContentFileRelation($value);
            }else{
                if(strpos($key, "file_") === 0){
                    if($value != null){
                        $file = File::fetch($value);
                        $contentObj[$key] = is_a($file, File::class) ? $file->toArray() : null;
                    }continue;
                }else continue;
            }
        }

        return $contentObj;
    }
}
