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
            $mail->SMTPDebug = 0;                               // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host =  $this->SMTPhost;                            // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = $this->senderEmail;                 // SMTP username
            $mail->Password = $this->password;                           // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = SMTP_PORT;                                    // TCP port to connect to

            $mail->setFrom($this->senderEmail, $this->senderName);
            $mail->addAddress($reciever);                     // Add a recipient

            $mail->addReplyTo($this->senderEmail);
        
            $mail->isHTML(true);                                  // Set email format to HTML

            $mail->Subject = $subject;
            $mail->Body    = $body;
            $mail->AltBody = $body;
            $mail->send();
        }
}