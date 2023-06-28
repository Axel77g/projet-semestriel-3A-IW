<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use Error;
use App\Models\User;
use App\Erros\UserAlreadyExists;

class Installer extends Controller{

    public function create($params){

        // if(file_exists('./config.php')){
        //     throw new Error();
        // }

        $payload = request()->json();

        writeConfig($payload);

        writeInitialDatabase($payload);

        createUser($payload);
    }

}

function writeConfig($payload){
    $myfile = fopen("./config.txt", "w");

    fwrite($myfile, '<?php'); 
    fwrite($myfile, "\n");  
    fwrite($myfile, "\n");  

    fwrite($myfile, 'define(\'ROUTES\', \'routes.php\');');  
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("ENV", "dev");');
    fwrite($myfile, "\n");
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("DEFAULT_ROLE",2);');
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
    fwrite($myfile, 'define("SMTP_USERNAME", "' . $payload["input_username_smtp"] . '");"');
    fwrite($myfile, "\n");
    fwrite($myfile, 'define("SMTP_PASSWORD", "' . $payload["input_password_smtp"] . '");');
    fwrite($myfile, "\n");

    fclose($myfile);
}

function writeInitialDatabase($payload){
    $myfile = fopen("./initialDatabase.sql", "w");

    fclose($myfile);
}

function createUser($payload){
    $existing = User::fetch(["email"=>$payload['input_email_site']]);
        if($existing) throw new UserAlreadyExists();

        $user = new User();
        $user->setFirstname($payload['input_firstname_site']);
        $user->setLastname($payload['input_lastname_site']);
        $user->setEmail($payload['input_email_site']);
        $user->setPassword($payload['input_password_site']);
        $user->setRoleId(1);
        $user->save();
}