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

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($room->create($data)) {
        $response['success'] = true;
        $response['message'] = 'Oda Eklendi';
    } else {
        $response['message'] = 'Oda Eklenemedi. Oda numarası zaten mevcut';
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $result = $room->update($data['id'], $data);
    if ($result['success']) {
        $response['success'] = true;
        $response['message'] = 'Oda Güncellendi';
    } else {
        $response['message'] = 'Oda Güncellenemedi. ' . $result['error'];
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = $room->delete($data['id']);
    if ($result['success']) {
        $response['success'] = true;
        $response['message'] = 'Oda Silindi';
    } else {
        $response['message'] = 'Oda Silinemedi. ' . $result['message'];
    }
}

echo json_encode($response);
?>
