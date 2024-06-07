<?php
include '../auth/session/start_session.php';
include '../../config/config.php'; 
require '../../vendor/autoload.php'; 

use \Firebase\JWT\JWT;

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

if (isset($data["username"]) && isset($data["password"])) {
    $username = $data["username"];
    $password = $data["password"];
    
    $result = $user->login($username, $password);
    if ($result) {

        unset($result['password']);
        
        $issuedAt = time();
        $expirationTime = $issuedAt + JWT_EXPIRY;  
        $payload = array(
            'iat' => $issuedAt,
            'exp' => $expirationTime,
            'userId' => $result['id'],
            'userType' => $result['user_type']
        );

        $jwt = JWT::encode($payload, JWT_SECRET, JWT_ALGORITHM);

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'token' => $jwt,
            'user' => $result 
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields']);
}
?>
