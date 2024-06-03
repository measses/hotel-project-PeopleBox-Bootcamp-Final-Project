<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

$database = new Database();
$db = $database->connect();

$room = new Room($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $room->getById($id);

if($result) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'Room Not Found']);
}
