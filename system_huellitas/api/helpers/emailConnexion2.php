<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require ('C:/xampp/htdocs/Huellitas_pets/system_huellitas/vendor/autoload.php');

class Props
{
    public static function sendMail($address, $subject, $message, $attachmentPath = null)
    {

        $mail = new PHPMailer(true);

        try {

            // Configuración del servidor

            // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Habilitar salida de depuración detallada
            $mail->isSMTP();                                            // Enviar usando SMTP
            $mail->Host       = 'smtp.gmail.com';                     // Configurar el servidor SMTP para enviar a través de Gmail
            $mail->SMTPAuth   = true;                                   // Habilitar autenticación SMTP
            $mail->Username = 'guayito.palom0@gmail.com';
            $mail->Password = 'mgjcxwecwexqftuj';                             // Contraseña SMTP
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Habilitar cifrado TLS implícito
            $mail->Port       = 465;                                    // Puerto TCP para conectarse; usa 587 si has configurado `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            // Destinatarios
            $mail->setFrom('guayito.palom0@gmail.com', 'Huellitas Pets'); // Quien lo envía
            $mail->addAddress($address);     // Agregar un destinatario
            $mail->CharSet = 'UTF-8'; //caracteres especiales
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $message;
            // Añadir adjunto
            if ($attachmentPath) {
                $mail->addAttachment($attachmentPath);
            }

            $mail->send();
            return 1;
        } catch (Exception $e) {

            return 0;
        }
    }
}