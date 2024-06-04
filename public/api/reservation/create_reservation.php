<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Reservation.php';

$database = new Database();
$db = $database->connect();

$reservation = new Reservation($db);
$data = json_decode(file_get_contents("php://input"), true);


if (isset($data['room_number'])) {
    $data['room_id'] = $data['room_number'];
    unset($data['room_number']);
}

if ($reservation->create($data)) {
    echo json_encode(['message' => 'Reservation Created']);
} else {
    echo json_encode(['message' => 'Reservation Not Created']);
}

?>