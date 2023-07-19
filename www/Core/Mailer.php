<?php

namespace App\Core;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


Class Mailer{
        private $senderName;
        private $senderEmail;
        private $password;
        private $SMTPhost;

        public function __construct($senderName,$senderEmail,$password,$SMTPhost)
        {
            $this->senderName = $senderName;
            $this->senderEmail = $senderEmail;
            $this->password = $password;
            $this->SMTPhost = $SMTPhost;
        }

        public function sendMail($reciever,$subject = "Test subject",$body = "Test body"){
            $mail = new PHPMailer();
            $mail->SMTPDebug = 0;                               
            $mail->isSMTP();                                   
            $mail->Host =  $this->SMTPhost;                            
            $mail->SMTPAuth = true;                               
            $mail->Username = $this->senderEmail;                 
            $mail->Password = $this->password;                           
            $mail->SMTPSecure = 'tls';                            
            $mail->Port = SMTP_PORT;                                    

            $mail->setFrom($this->senderEmail, $this->senderName);
            $mail->addAddress($reciever);                    

            $mail->addReplyTo($this->senderEmail);
        
            $mail->isHTML(true);                                  

            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = $body;
            $mail->send();
        }
}
