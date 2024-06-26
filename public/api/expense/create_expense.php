<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Expense.php';

$database = new Database();
$db = $database->connect();

$expense = new Expense($db);

$data = json_decode(file_get_contents("php://input"), true);

if($expense->create($data)) {
    echo json_encode(['message' => 'Expense Created']);
} else {
    echo json_encode(['message' => 'Expense Not Created']);
}

?>
