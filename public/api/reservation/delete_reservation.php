<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Reservation.php';

$database = new Database();
$db = $database->connect();

$reservation = new Reservation($db);
$data = json_decode(file_get_contents("php://input"), true);

if($reservation->delete($data['id'])) {
    echo json_encode(['message' => 'Reservation Deleted']);
} else {
    echo json_encode(['message' => 'Reservation Not Deleted']);
}
?>
