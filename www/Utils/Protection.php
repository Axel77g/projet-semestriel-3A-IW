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
       
        return htmlspecialchars(Protection::removeScripts($string), ENT_NOQUOTES, 'UTF-8');;
    }

    public static function removeScripts($string){
        $string =  preg_replace('/\<script\>/i', "", $string);
        $string =  preg_replace('/\<\/script\>/i', "", $string);
        return $string; 
    }

    public static function int($int){
        $filtered = filter_var($int, FILTER_SANITIZE_NUMBER_INT);
        if($filtered)
            return $int;
        else return 0;
    }

    public static function float($float){
        $filtered = filter_var($float, FILTER_SANITIZE_NUMBER_FLOAT);
        if($filtered)
            return $$filtered;
        else return 0;
    }

    public static function email($string){
        $string = self::protect(strtolower(trim($string)));
        $filtered = filter_var($string, FILTER_VALIDATE_EMAIL);
        if($filtered){
            return $filtered;
        }else return null;
    }

    public static function sqlProtect($string)
    {
        //limit request to one instruction
        $string = explode(";",$string)[0];
        return $string.";";
    }
}