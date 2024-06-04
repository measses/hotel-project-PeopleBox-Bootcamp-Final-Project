<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

$database = new Database();
$db = $database->connect();

$room = new Room($db);

$result = $room->getAll();

if (count($result) > 0) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'No rooms found']);
}
?>
