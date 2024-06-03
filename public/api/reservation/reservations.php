<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Reservation.php';

$database = new Database();
$db = $database->connect();

$reservation = new Reservation($db);

$result = $reservation->getAll();

if (count($result) > 0) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'No reservations found']);
}
?>
