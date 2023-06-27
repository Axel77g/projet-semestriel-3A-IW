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
}