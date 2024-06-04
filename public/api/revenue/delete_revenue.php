<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Revenue.php';

$database = new Database();
$db = $database->connect();

$revenue = new Revenue($db);

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

if($revenue->delete($id)) {
    echo json_encode(['message' => 'Revenue Deleted']);
} else {
    echo json_encode(['message' => 'Revenue Not Deleted']);
}

?>
