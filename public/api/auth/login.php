<?php
include '../auth/session/start_session.php';

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
        $_SESSION["loggedin"] = true;
        $_SESSION["user_id"] = $result['id'];
        $_SESSION["username"] = $result['username'];
        $_SESSION["user_type"] = $result['user_type'];

        echo json_encode(['success' => true, 'message' => 'Login successful', 'user' => $result]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields']);
}
?>
