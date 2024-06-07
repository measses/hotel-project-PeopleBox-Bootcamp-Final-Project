<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['code']) || !isset($data['email'])) {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek']);
    exit;
}

$code = $data['code'];
$email = $data['email'];

try {
    if ($user->verifyEmail($email, $code)) {
        echo json_encode(['success' => true, 'message' => 'E-posta başarıyla doğrulandı']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Geçersiz veya süresi dolmuş kod']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
