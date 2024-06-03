<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Reservation.php';

$database = new Database();
$db = $database->connect();

$reservation = new Reservation($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $reservation->getById($id);

if($result) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'Reservation Not Found']);
}
?>
