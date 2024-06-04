<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Revenue.php';

$database = new Database();
$db = $database->connect();

$revenue = new Revenue($db);

$data = json_decode(file_get_contents("php://input"), true);

if($revenue->create($data)) {
    echo json_encode(['message' => 'Revenue Created']);
} else {
    echo json_encode(['message' => 'Revenue Not Created']);
}

?>
