<?php
namespace App\Models;

use App\Core\Model;
use App\Errors\InternalError;

class Auth extends Model{

    protected string $token = "";
    protected Int $user_id = 0;
    protected $expire_on = "";

    function __construct(User $user = null)
    {
        if($user){
            $expire_on = new \DateTime();
            $expire_on->add(new \DateInterval("P7D"));
            $this->expire_on = $expire_on;
            $this->user_id = $user->id;
            $this->generateToken();
        }
    }

    function generateToken(){
        $generatedOn = date("Y-m-d H:i:s");

        $data = [
            "user_id" => $this->user_id,
            "expire_on" => $this->expire_on,
            "generated_on" => $generatedOn
        ];
        $base64String =  base64_encode(json_encode($data));
        $this->token = $base64String . '.' . password_hash(APP_KEY . $generatedOn,PASSWORD_DEFAULT);
    }

    function getToken(){
        return $this->token;
    }

    public function user(){
        return User::fetch(["id"=>$this->user_id]);
    }

    public function author() {
        return User::fetch(["id"=>$this->author_id]);
    }

    function isValid(){
        $tokenExploded = explode(".",$this->token);
        $payload = json_decode(base64_decode($tokenExploded[0]),true);

        $generatedOn = $payload['generated_on'];
        if(empty($generatedOn))
            throw new InternalError();
    
        $signature = str_replace($tokenExploded[0] . '.','',$this->token);
        $isValidSignature = password_verify(APP_KEY . $generatedOn,$signature);
        
        if(is_string($this->expire_on))
            $this->expire_on = new \DateTime($this->expire_on);
        $expire_on = $this->expire_on;
        $now = new \DateTime();
        return $expire_on > $now && $isValidSignature;  
    }

    static function get($token){
        return self::fetch(["token"=>$token]);
    }
}