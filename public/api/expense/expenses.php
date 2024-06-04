<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Expense.php';

$database = new Database();
$db = $database->connect();

$expense = new Expense($db);

$result = $expense->getAll();

if (count($result) > 0) {
    echo json_encode($result);
} else {
    echo
    json_encode(['message' => 'No expense found']);
}
?>
