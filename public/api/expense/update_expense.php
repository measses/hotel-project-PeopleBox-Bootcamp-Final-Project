<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Expense.php';

$database = new Database();
$db = $database->connect();

$expense = new Expense($db);

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

if($expense->update($id, $data)) {
    echo json_encode(['message' => 'Expense Updated']);
} else {
    echo json_encode(['message' => 'Expense Not Updated']);
}

?>
