<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\Database;
use App\Core\Validator;
use App\Errors\BadRequest;
use App\Services\InstallerServices;

class Installer {

    public function create($params){

        // if config.php exists, throw error
        if(file_exists('./config.php')){
            throw new BadRequest();
        }

        
        $payload = request()->json();

        // Validate the payload
        $validator = new Validator();
        $validator->validate($payload, [
            "input_host_database" => "required",
            "input_port_database" => "required|numeric",
            "input_name_database" => "required",
            "input_username_database" => "required",
            "input_password_database" => "required",
            "input_table_prefix_database" => "required",
            "input_host_smtp" => "required",
            "input_port_smtp" => "required|numeric",
            "input_username_smtp" => "required",
            "input_password_smtp" => "required",
            "input_name_site" => "required",
            "input_firstname_site" => "required",
            "input_lastname_site" => "required",
            "input_email_site" => "required|email",
            "input_password_site" => "required|minLength:8|maxLength:50",
        ]);



        
       

        // if config.php exists, throw error (Supposed to be created by writeConfig)
        if(file_exists('./config.php')){
            throw new BadRequest();
        }

        // if config.php does not exist, create it
        InstallerServices::writeConfig($payload);

        // include config.php (To be able to use the define variables)
        include("./config.php");

        // Write a file to create the initial database (With the prefix)
        InstallerServices::writeInitialDatabase(str_replace("&quot;", "", $payload["input_table_prefix_database"]));

        // Execute the file to create the initial database

        try {
            $db = new Database();
            $query = file_get_contents("./initialDatabase.sql");
            $db->getConnection()->exec($query);
            // Create the first user (Admin)
            InstallerServices::createUser($payload);
        } catch (\Throwable $th) {
            unlink("./config.php");
            throw $th;
        }       
        // seader 
        InstallerServices::seedDatabase();
    
        echo json_encode(["success" => true]);
    }

}
