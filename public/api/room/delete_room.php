<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

$database = new Database();
$db = $database->connect();

$room = new Room($db);
$data = json_decode(file_get_contents("php://input"), true);

if($room->delete($data['id'])) {
    echo json_encode(['message' => 'Room Deleted']);
} else {
    echo json_encode(['message' => 'Room Not Deleted']);
}