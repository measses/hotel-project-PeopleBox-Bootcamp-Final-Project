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

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];
$confirm_password = $data['confirm_password'];

if ($password !== $confirm_password) {
    echo json_encode(['success' => false, 'message' => 'Parolalar eşleşmiyor']);
    return;
}

try {
    $result = $user->register($username, $email, $password);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Kullanıcı başarıyla kaydedildi']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı kaydı başarısız oldu']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
