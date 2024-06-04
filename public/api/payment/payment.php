<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Payment.php';

$database = new Database();
$db = $database->connect();

$payment = new Payment($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $payment->getById($id);

if($result) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'Payment Not Found']);
}

