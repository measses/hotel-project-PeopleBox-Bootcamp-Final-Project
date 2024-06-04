<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Expense.php';

$database = new Database();
$db = $database->connect();

$expense = new Expense($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $expense->getById($id);

if($result) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'Expense Not Found']);
}

