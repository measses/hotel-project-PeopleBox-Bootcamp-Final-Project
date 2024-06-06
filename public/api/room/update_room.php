<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

$database = new Database();
$db = $database->connect();

$room = new Room($db);
$data = json_decode(file_get_contents("php://input"), true);

if ($room->update($data['id'], $data)) {
    echo json_encode(['message' => 'Room Updated']);
} else {
    echo json_encode(['message' => 'Room Not Updated', 'error' => 'Room number already exists or other error occurred']);
}
?>
