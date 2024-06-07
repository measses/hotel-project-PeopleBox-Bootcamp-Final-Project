<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Todo.php';

$database = new Database();
$db = $database->connect();

$todo = new Todo($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $todo->getById($id);

if ($result) {
    echo json_encode($result);
} else {
    echo json_encode(['success' => false, 'message' => 'Todo Not Found']);
}

?>
