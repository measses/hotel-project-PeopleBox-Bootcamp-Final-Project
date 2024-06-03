<?php

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

$room = new Room($db);

$result = $room->getAll();

if (count($result) > 0) {
    echo json_encode($result);
} else {
    echo json_encode(
        array('message' => 'No rooms found')
    );
}
