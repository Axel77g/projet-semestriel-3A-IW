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

    static function slugify($string) {

       // Remplacer les accents par des lettres normales
    $string = iconv('UTF-8', 'ASCII//TRANSLIT', $string);
    
    // Convertir en minuscules
    $string = strtolower($string);
    
    // Remplacer les espaces par des underscores
    $string = preg_replace('/\s+/', '_', $string);
    
    // Remplacer les caractères spéciaux par des underscores
    $string = preg_replace('/[^a-z0-9_]/', '_', $string);
    
    // Supprimer les underscores en début et fin de chaîne
    $string = trim($string, '_');
    
    return $string;
    }
    
}