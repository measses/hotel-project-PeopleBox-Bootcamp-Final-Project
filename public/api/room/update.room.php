<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

$database = new Database();
$db = $database->connect();

$room = new Room($db);
$data = json_decode(file_get_contents("php://input"), true);

if($post->update($data['id'], $data)) {
    echo json_encode(['message' => 'Room Updated']);
} else {
    echo json_encode(['message' => 'Room Not Updated']);
}