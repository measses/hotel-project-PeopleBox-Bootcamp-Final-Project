<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

function sendVerificationEmail($email, $code) {
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host = 'mail.example.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'info@example.com'; 
        $mail->Password = 'password_key'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        //Recipients
        $mail->setFrom('info@example.com', 'Measses Otel'); 
        $mail->addAddress($email);

        //Content
        $mail->isHTML(true);
        $mail->Subject = 'Email Verification';
        $mail->Body    = "Lütfen e-posta adresinizi doğrulamak için bu kodu kullanın: <b>$code</b>";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo);
        return "Mailer Error: " . $mail->ErrorInfo; 
    }
}

