<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

function sendVerificationEmail($email, $code) {
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP();
        $mail->Host = 'mail.buukalemun.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'info@buukalemun.com'; 
        $mail->Password = 'CDcPKDHrF-jCMJ!';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        //Recipients
        $mail->setFrom('info@buukalemun.com', 'Measses '); 
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

