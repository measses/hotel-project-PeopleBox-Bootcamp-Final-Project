<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/DebtCredit.php';

$database = new Database();
$db = $database->connect();

$debtCredit = new DebtCredit($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $debtCredit->getById($id);

if($result) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'DebtCredit Not Found']);
}

