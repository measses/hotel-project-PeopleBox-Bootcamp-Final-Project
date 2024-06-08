<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, PUT, DELETE, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

$database = new Database();
$db = $database->connect();

$room = new Room($db);
$data = json_decode(file_get_contents("php://input"), true);

$result = $room->update($data['id'], $data);

if ($result['success']) {
    echo json_encode(['success' => true, 'message' => 'Oda Başarıyla Güncellendi']);
} else {
    echo json_encode(['success' => false, 'message' => 'Oda Güncellenemedi!', 'error' => $result['error']]);
}
?>
