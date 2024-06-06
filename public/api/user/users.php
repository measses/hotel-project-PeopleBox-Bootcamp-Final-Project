<?php
include '../auth/session/start_session.php';
include '../auth/authenticate.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$decoded = authenticate(); 

// Sadece admin kullanıcıların bu API'yi kullanmasına izin ver
if ($decoded->userType !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    return;
}

try {
    $result = $user->getUsers();
    if ($result) {
        echo json_encode(['success' => true, 'data' => $result]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Kullanıcılar alınamadı']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
