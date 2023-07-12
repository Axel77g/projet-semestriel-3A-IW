<?php
namespace App\Core;

use App\Core\Sanitize;
use App\Errors\ValidatorError;

class Validator implements Sanitize{
    
        private $errors = [];
    
        public function validate($data, $rules){
            foreach($rules as $key => $rule){
                $rules = explode("|", $rule);
                foreach($rules as $rule){
                    $rule = explode(":", $rule);
                    $ruleName = $rule[0];
                    $ruleValue = $rule[1] ?? null;
                    $param = $rule[2] ?? null;
                    $this->$ruleName($key, $data[$key], $ruleValue, $param);
                }
            }

            if($this->hasErrors()){
                throw new ValidatorError($this->getErrors());
            }
        }
    
        public function required($key, $value, $ruleValue){
            if(empty($value)){
                $this->errors[$key][] = "Le champ est requis";
            }
        }
    
        public function email($key, $value, $ruleValue){
            if(!filter_var($value, FILTER_VALIDATE_EMAIL)){
                $this->errors[$key][] = "Le champ doit être un email valide";
            }
        }

        public function numeric($key, $value, $ruleValue){
            if(!is_numeric($value)){
                $this->errors[$key][] = "Le champ doit être un nombre";
            }
        }

        public function emailNotExists($key, $value, $ruleValue){
            $model = "App\\Models\\User" ;
            $model = new $model();
            $result = $model::fetch([$key=>$value]);
            if(!$result){
                $this->errors[$key][] = "Cet email n'existe pas";
            }
        }

        public function emailAlreadyExists($key, $value, $ruleValue){
            $model = "App\\Models\\User" ;
            $model = new $model();
            $result = $model::fetch([$key=>$value]);
            if($result){
                $this->errors[$key][] = "Cet email existe déjà";
            }
        }

        public function CheckPassword($key, $value, $ruleValue){
            $model = "App\\Models\\User";
            $model = new $model();
            $result = $model::fetch(["email"=>$ruleValue]);
            if($result && !password_verify($value, $result->getPassword())){
                $this->errors[$key][] = "Le mot de passe est incorrect";
            }
        }

        public function ConfirmPassword($key, $value, $ruleValue){
            if($value !== $ruleValue){
                $this->errors[$key][] = "Les mots de passe ne correspondent pas";
            }
        }

        public function maxLength($key, $value, $ruleValue){
            if(strlen($value) > $ruleValue){
                $this->errors[$key][] = "Le champ doit contenir moins de $ruleValue caractères";
            }
        }

        public function minLength($key, $value, $ruleValue){
            if(strlen($value) < $ruleValue){
                $this->errors[$key][] = "Le champ doit contenir plus de $ruleValue caractères";
            }
        }

        public function max($key, $value, $ruleValue){
            if($value > $ruleValue){
                $this->errors[$key][] = "Le champ doit être inférieur à $ruleValue";
            }
        }

        public function min($key, $value, $ruleValue){
            if($value < $ruleValue){
                $this->errors[$key][] = "Le champ doit être supérieur à $ruleValue";
            }
        }


    
        public function unique($key, $value, $ruleValue){
            $model = "App\\Models\\" . ucfirst($ruleValue);
            echo $model;

            $model = new $model();

            $result = $model->where($key, $value)->first();
            if($result){
                $this->errors[$key][] = "Le champ doit être unique";
            }
        }
    
        public function getErrors(){
            return $this->errors;
        }
    
        public function hasErrors(){
            return !empty($this->errors);
        }


        public function getColumns(){
            return  get_object_vars($this);
        }

        public function toJson(){

            $columns = $this->getColumns();

    
            return json_encode($this->getColumns());
        }
        
        public function toArray(){
    
            $columns = $this->getColumns();
            
            if(isset($columns["password"])){
                unset($columns["password"]);
            }
            
            return $columns;
        }

}

