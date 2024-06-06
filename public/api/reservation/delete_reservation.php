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
$id = $data['id'];

if ($reservation->delete($id)) {
    echo json_encode(['success' => true, 'message' => 'Reservation Deleted']);
} else {
    $errorInfo = $reservation->getErrorInfo();
    echo json_encode(['success' => false, 'message' => 'Reservation Not Deleted', 'error' => $errorInfo]);
}
?>
