<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Todo.php';

$database = new Database();
$db = $database->connect();

$todo = new Todo($db);

$result = $todo->getAll();

if (count($result) > 0) {
    echo json_encode($result);
} else {
    echo json_encode(['success' => false, 'message' => 'No Todos Found']);
}

?>
