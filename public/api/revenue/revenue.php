<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Revenue.php';

$database = new Database();
$db = $database->connect();

$revenue = new Revenue($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$result = $revenue->getById($id);

if($result) {
    echo json_encode($result);
} else {
    echo json_encode(['message' => 'Revenue Not Found']);
}

