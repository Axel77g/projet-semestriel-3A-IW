<?php
namespace App\Utils;

class StringHelpers{

    static public function camelCaseToSnakeCase($string)
    {
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $string));
    }

    static public function snakeCaseToCamelCase($string)
    {
        return lcfirst(str_replace('_', '', ucwords($string, '_')));
    }

    static public function slugify($string)
    {
        $string = strtolower($string);
        $string = preg_replace('/[^a-z0-9 -]+/', '', $string);
        $string = preg_replace('/\s+/', '-', $string);
        return $string;
    }
    
}