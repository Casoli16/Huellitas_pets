<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../libraries/PHPMailer-master/src/Exception.php';
require '../libraries/PHPMailer-master/src/SMTP.php';
require '../libraries/PHPMailer-master/src/PHPMailer.php';

class Email {
    public static function sendMail($address, $subject, $body, $message)
    {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'susancasoli@gmail.com';                //SMTP username
            $mail->Password   = 'rbshysegrfmgslog';                     //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            $mail->setFrom('susancasoli@gmail.com', 'Asistente virtual de Huellitas Pets'); // Quien lo envía
            $mail->addAddress($address);
            $mail->CharSet = 'UTF-8';
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $body.' '.$message;
            $mail->send();
            return true;
        }catch (Exception $e){
            return false;
        }
    }
}