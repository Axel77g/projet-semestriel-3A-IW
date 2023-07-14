<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\Database;
use App\Core\Validator;
use App\Errors\BadRequest;
use App\Models\User;
use App\Errors\UserAlreadyExists;
use App\Errors\ValidatorError;


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

        // if validation fails, throw error
        if($validator->hasErrors()){
            throw new ValidatorError($validator->getErrors());

        }



        
       

        // if config.php exists, throw error (Supposed to be created by writeConfig)
        if(file_exists('./config.php')){
            throw new BadRequest();
        }

        // if config.php does not exist, create it
        writeConfig($payload);

        // include config.php (To be able to use the define variables)
        include("./config.php");

        // Write a file to create the initial database (With the prefix)
        writeInitialDatabase($payload["input_table_prefix_database"]);

        // Execute the file to create the initial database
        $db = new Database();
        $query = file_get_contents("./initialDatabase.sql");
        $db->getConnection()->exec($query);


        // Create the first user (Admin)
        createUser($payload);

        echo json_encode(["success" => true]);
    }

}

function writeConfig($payload){
    $myfile = fopen("./config.php", "w");

    fwrite($myfile, '<?php'); 
    fwrite($myfile, "\n");  
    fwrite($myfile, "\n");  

    fwrite($myfile, 'define(\'ROUTES\', \'routes.php\');');  
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("ENV", "dev");');
    fwrite($myfile, "\n");
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DEFAULT_ROLE","user");');
    fwrite($myfile, "\n");
    fwrite($myfile, "\n");

    fwrite($myfile, 'define("DB_DRIVER", "pgsql");');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DB_PORT", ' . $payload["input_port_database"] . ');');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DB_HOST", "' . $payload["input_host_database"] . '");');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DB_NAME", "' . $payload["input_name_database"] . '");');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DB_USERNAME","' . $payload["input_username_database"] . '");');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DB_PASSWORD","' . $payload["input_password_database"] . '");');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DB_PREFIX","' . $payload["input_table_prefix_database"] . '");');
    fwrite($myfile, "\n");
    fwrite($myfile, "\n");

    fwrite($myfile, 'define("APP_KEY", "SALT");');
    fwrite($myfile, "\n");
    fwrite($myfile, "\n");
    fwrite($myfile, "\n");

    fwrite($myfile, 'define("SMTP_HOST", "' . $payload["input_host_smtp"] . '");');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("SMTP_PORT", ' . $payload["input_port_smtp"] . ');');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("SMTP_USERNAME", "' . $payload["input_username_smtp"] . '");');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("SMTP_PASSWORD", "' . $payload["input_password_smtp"] . '");');
    fwrite($myfile, "\n");

    fclose($myfile);
}

function writeInitialDatabase($prefix){
    $myfile = fopen("./initialDatabase.sql", "w");
    fwrite($myfile, "
    -- Author: ESGI
    -- Date: 2019-01-10 10:00:00
    -- Last update: 2019-01-10 10:00:00
    -- Version: 1.0.0


    DROP TYPE IF EXISTS TYPE_ROLE CASCADE;
    CREATE TYPE TYPE_ROLE AS ENUM ('admin', 'user');

    DROP TYPE IF EXISTS STATUS_COMMENT CASCADE;
    CREATE TYPE STATUS_COMMENT AS ENUM ('pending', 'validated', 'refused');


    -- USERS
    DROP TABLE IF EXISTS " . $prefix . "user CASCADE;
    CREATE TABLE " . $prefix . "user (
        id SERIAL PRIMARY KEY,
        role TYPE_ROLE DEFAULT 'user',
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_verified BOOLEAN DEFAULT FALSE,
        verification_code VARCHAR(255),
        reset_code INTEGER,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    -- Pages
    DROP TABLE IF EXISTS ". $prefix ."page;
    DROP TYPE IF EXISTS TEMPLATE_PAGE CASCADE;
    CREATE TYPE TEMPLATE_PAGE AS ENUM ('home', 'article','article_list');
    CREATE TABLE ". $prefix ."page(
        id SERIAL PRIMARY KEY NOT NULL,
        author_id INTEGER NOT NULL,
        parent_slug VARCHAR(255),
        slug VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        template TEMPLATE_PAGE NOT NULL,
        content TEXT NOT NULL,
        is_commentable SMALLINT NOT NULL DEFAULT 1,
        FOREIGN KEY (author_id) REFERENCES ". $prefix ."user(id) ON DELETE CASCADE
    );

    -- COMMENTS

    DROP TABLE IF EXISTS " . $prefix . "comment CASCADE;
    CREATE TABLE " . $prefix . "comment (
        id SERIAL,
        content text NOT NULL,
        author_id int NOT NULL,
        page_id int NOT NULL,
        comment_id int,
        status STATUS_COMMENT DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (author_id) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE,
        FOREIGN KEY (page_id) REFERENCES " . $prefix . "page(id) ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES " . $prefix . "comment(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );

    -- Auth
    DROP TABLE IF EXISTS " . $prefix . "auth CASCADE;
    CREATE TABLE " . $prefix . "auth (
        id SERIAL,
        token varchar NULL,
        expire_on TIMESTAMP NULL,
        user_id int4 NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );
    -- Upload
    DROP TABLE IF EXISTS " . $prefix . "file CASCADE;
    CREATE TABLE " . $prefix . "file (
        id SERIAL,
        name varchar NULL,
        path varchar NULL,
        extension varchar NULL,
        size int4 NULL,
        mime varchar NULL,
        hash varchar NULL,
        user_id int4 NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE,
        PRIMARY KEY (id)
    );

    -- Menu

    DROP TABLE IF EXISTS " . $prefix . "menu CASCADE;

    CREATE TABLE " . $prefix . "menu (
        id SERIAL PRIMARY KEY,
        parent_id INT NULL DEFAULT 0,
        title VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        visible SMALLINT NOT NULL DEFAULT 1,
        position INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT fk_" . $prefix . "menu_parent_id FOREIGN KEY (parent_id) REFERENCES " . $prefix . "menu(id) ON DELETE CASCADE
    );
    ");
    fclose($myfile);
}

    // -- ARTICLES

    //  DROP TABLE IF EXISTS " . $prefix . "article CASCADE;
    //  CREATE TABLE " . $prefix . "article (
    //      id SERIAL,
    //      slug varchar(255) NOT NULL,
    //      title varchar(255) NOT NULL,
    //      description text NOT NULL,
    //      content text NOT NULL,
    //      author int NOT NULL,
    //      image varchar(255) NOT NULL,
    //      views int NOT NULL DEFAULT 0,
    //      likes int NOT NULL DEFAULT 0,
    //      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    //      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    //      PRIMARY KEY (id),
    //      FOREIGN KEY (author) REFERENCES " . $prefix . "user(id) ON DELETE CASCADE
    //  );

function createUser($payload){
    $existing = User::fetch(["email"=>$payload['input_email_site']]);
        if($existing) throw new UserAlreadyExists();

        $user = new User();
        $user->setFirstname($payload['input_firstname_site']);
        $user->setLastname($payload['input_lastname_site']);
        $user->setEmail($payload['input_email_site']);
        $user->setPassword($payload['input_password_site']);
        $user->setRole("admin");
        $user->save();
}
