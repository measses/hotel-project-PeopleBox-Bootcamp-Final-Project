<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Reservation.php';
include_once '../../models/Room.php'; 

$database = new Database();
$db = $database->connect();

$reservation = new Reservation($db);
$room = new Room($db); 

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['room_number'])) {
    $room_data = $room->getByRoomNumber($data['room_number']);
    if($room_data) {
        $data['room_id'] = $room_data['id'];
    } else {
        echo json_encode(['message' => 'Room not found']);
        return;
    }
    unset($data['room_number']);
}

// Room availability check
if (!$reservation->isRoomAvailable($data['room_id'], $data['checkin_date'], $data['checkout_date'], $data['id'])) {
    echo json_encode(['success' => false, 'message' => 'Room is not available for the selected dates']);
    return;
}

$id = $data['id'];
unset($data['id']);

if($reservation->update($id, $data)) {
    if($data['status'] === 'confirmed') {
        $room->update($data['room_id'], ['status' => 'Occupied']);
    } elseif ($data['status'] === 'cancelled') {
        $room->update($data['room_id'], ['status' => 'Available']);
    }
    echo json_encode(['success' => true, 'message' => 'Reservation Updated']);
} else {
    echo json_encode(['success' => false, 'message' => 'Reservation Not Updated']);
}
?>
