<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Room.php';

$database = new Database();
$db = $database->connect();

$room = new Room($db);

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$result = $room->delete($id);
if ($result['success']) {
    echo json_encode(['success' => true, 'message' => $result['message']]);
} else {
    echo json_encode(['success' => false, 'message' => $result['message']]);
}
?>
