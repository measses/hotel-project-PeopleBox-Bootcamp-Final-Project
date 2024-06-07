<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Todo.php';

$database = new Database();
$db = $database->connect();

$todo = new Todo($db);

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['id']) && isset($data['title']) && isset($data['description']) && isset($data['user_id']) && isset($data['dueDate'])) {
    $id = $data['id'];
    $result = $todo->update($id, $data);
    echo json_encode($result);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid Input']);
}

?>
