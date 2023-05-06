<?php

namespace App\Utils;

class Protection
{

    public static function protectArray($array){
        foreach($array as $key => $value){
            //check if value is array
            if(is_array($value)){
                $array[$key] = self::protectArray($value);
            }else $array[$key] = self::protect($value);
          
        }
        return $array;
    }
    public static function protect($string)
    {
        return htmlspecialchars($string);
    }

    public static function sqlProtect($string)
    {
        //limit request to one instruction
        $string = explode(";",$string)[0];
        return $string.";";
    }
}