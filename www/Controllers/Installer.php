<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Errors\NotFoundError;
use Error;

class Installer extends Controller{

    public function create($params){

        // if(file_exists('./config.php')){
        //     throw new Error();
        // }

        $payload = request()->json();
        var_dump($payload);

        $myfile = fopen("./config.txt", "w");

        fwrite($myfile, '<?php'); 
        fwrite($myfile, "\n");  
        fwrite($myfile, "\n");  

        fwrite($myfile, 'define(\'ROUTES\', \'routes.php\');');  
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("ENV", "dev");');
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");
        fwrite($myfile, "\n");

        fwrite($myfile, 'define("DB_DRIVER", "pgsql");');
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
        fwrite($myfile, 'define("SMTP_HOST", "YOUR_HOST");');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("SMTP_PORT", 123);');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("SMTP_USERNAME", ""your_adress@gmail.com");"');
        fwrite($myfile, "\n");
        fwrite($myfile, 'define("SMTP_PASSWORD", "your_password");');
        fwrite($myfile, "\n");

        fclose($myfile);







    }

}