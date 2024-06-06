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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($room->create($data)) {
        echo json_encode(['message' => 'Room Created']);
    } else {
        echo json_encode(['message' => 'Room Not Created', 'error' => 'Room number already exists']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if ($room->update($data['id'], $data)) {
        echo json_encode(['message' => 'Room Updated']);
    } else {
        echo json_encode(['message' => 'Room Not Updated', 'error' => 'Room number already exists or other error occurred']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if ($room->delete($data['id'])) {
        echo json_encode(['message' => 'Room Deleted']);
    } else {
        echo json_encode(['message' => 'Room Not Deleted']);
    }
}
?>
