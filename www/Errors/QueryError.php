<?php

namespace App\Errors;


class NoColumnFound extends HTTPError{
        
        protected $code = 500;

        
        function __construct($table,$column) {
            $this->message = "No column found in the table $table for : " . $column;
        }
}
