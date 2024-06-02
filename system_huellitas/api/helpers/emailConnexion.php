<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require('C:/xampp/htdocs/Huellitas_pets/system_huellitas/vendor/autoload.php');

class Email {
    public static function sendMail($address, $subject, $name, $message)
    {
        $mail = new PHPMailer(true);

        try {
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                    //Muestra los posibles errores
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                       //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'susancasoli@gmail.com';                //SMTP username
            $mail->Password   = 'rbshysegrfmgslog';                     //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            $mail->setFrom($address); // Quien lo envía
            $mail->addAddress('susancasoli@gmail.com', 'Equipo de Huellitas Pets');
            $mail->CharSet = 'UTF-8';
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = '
                            <body style="font-family: Arial, sans-serif;">                           
                              <div style="width: 700px; margin: 0 auto; ">
                              <div style="text-align: center">
                                <img src="https://serving.photos.photobox.com/898252010919df605cc039d068688ed4cd5f09e85e1991ef9b5fff224dca7254f3225b22.jpg" style="width: 150px; height: 150px" alt=""> 
                              </div>
                                <h2 style="background-color: #f4d35e; color: #000000; margin-top: 0; text-align: center; padding: 10px">'.$name. '</h2>
                                <hr style="border-top: 1px solid #ddd;">
                                <div style="line-height: 1.5; padding: 15px; background-color: #FAF0CAFF; font-size: 17px">
                                  ' .$message. '
                                </div>
                                  <div style="text-align: center; padding: 10px; background-color: #ff8b4d;">
                                  <p style="color: white; font-size: 15px ">Copyright &copy; <?php echo date("Y"); ?> Huellitas Pets. Todos los derechos reservados.</p>
                                </div>
                              </div>
                            </body>
                            ';
            $mail->send();
            return true;
        }catch (Exception $e){
            return false;
        }
    }
}