<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Reservation.php';
include_once '../../models/Room.php';  
include_once '../../models/Revenue.php';  

$database = new Database();
$db = $database->connect();

$reservation = new Reservation($db);
$room = new Room($db);  
$revenue = new Revenue($db);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['room_number'])) {
    $room_data = $room->getByRoomNumber($data['room_number']);
    if ($room_data) {
        $data['room_id'] = $room_data['id'];
        $room_number = $data['room_number']; // Store room number
        $daily_price = $room_data['price'];
        $checkin_date = new DateTime($data['checkin_date']);
        $checkout_date = new DateTime($data['checkout_date']);
        $interval = $checkin_date->diff($checkout_date);
        $days = $interval->days;
        $data['total_price'] = $daily_price * $days;

        if (!$reservation->isRoomAvailable($data['room_id'], $data['checkin_date'], $data['checkout_date'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Room is not available for the selected dates']);
            return;
        }

        // Oda durumunu güncelle
        $room->update($room_data['id'], ['status' => 'Occupied', 'room_number' => $room_number]); // Pass room number
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Room not found']);
        return;
    }
    unset($data['room_number']);
}

$result = $reservation->create($data);
if ($result['success']) {
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => 'Reservation Created']);
} else {
    // Hata mesajını döndür
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $result['message']]);
}
