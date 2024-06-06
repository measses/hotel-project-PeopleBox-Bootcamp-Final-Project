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
        $daily_price = $room_data['price'];
        $checkin_date = new DateTime($data['checkin_date']);
        $checkout_date = new DateTime($data['checkout_date']);
        $interval = $checkin_date->diff($checkout_date);
        $days = $interval->days;
        $data['total_price'] = $daily_price * $days;


        if (!$reservation->isRoomAvailable($data['room_id'], $data['checkin_date'], $data['checkout_date'])) {
            echo json_encode(['success' => false, 'message' => 'Room is not available for the selected dates']);
            return;
        }

        // Oda durumunu güncelle
        $room->update($room_data['id'], ['status' => 'Occupied']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Room not found']);
        return;
    }
    unset($data['room_number']);
}

if ($reservation->create($data)) {
    // Rezervasyon onaylı ise gelir kaydı oluştur
    if ($data['status'] === 'confirmed') {
        $reservation_id = $reservation->getLastInsertId();
        
        // Gelir kaydı oluştur
        $revenue_data = [
            'reservation_id' => $reservation_id,
            'description' => 'Room Reservation ' . $reservation_id,
            'amount' => $data['total_price'],
            'revenue_date' => $data['checkin_date'],
            'category' => 'room_rent'
        ];
        $revenue->create($revenue_data);
    }
    echo json_encode(['success' => true, 'message' => 'Reservation Created']);
} else {
    // Hata mesajını döndür
    $errorInfo = $reservation->getErrorInfo();
    echo json_encode(['success' => false, 'message' => 'Reservation Not Created', 'error' => $errorInfo]);
}

?>