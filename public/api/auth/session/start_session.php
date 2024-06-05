<?php

$session_lifetime = 7 * 24 * 60 * 60; // 7 gün 

session_set_cookie_params([
    'lifetime' => $session_lifetime,
    'path' => '/',
    'domain' => '', 
    'secure' => isset($_SERVER['HTTPS']), 
    'httponly' => true, 
    'samesite' => 'Lax', 
]);

session_start();
?>
