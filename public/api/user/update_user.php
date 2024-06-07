<?php

include '../auth/session/start_session.php';
include '../auth/authenticate.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$decoded = authenticate(); 

// Kullanıcı ID'sini JWT'den alalım
$user_id = $decoded->userId;

$username = $_POST['username'];
$email = $_POST['email'];
$password = isset($_POST['password']) ? password_hash($_POST['password'], PASSWORD_BCRYPT) : null;

$profile_picture = null;
if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] === UPLOAD_ERR_OK) {
    $upload_dir = '../../uploads/';
    $file_name = basename($_FILES['profile_picture']['name']);
    $target_file = $upload_dir . $file_name;
    
    if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $target_file)) {
        $profile_picture = $file_name; // dosya adını kaydet
    } else {
        echo json_encode(['success' => false, 'message' => 'File upload failed']);
        return;
    }
}

try {
    $result = $user->updateProfile($user_id, $username, $email, $profile_picture, $password);
    if ($result) {
        // Güncellenmiş kullanıcıyı geri dön
        $updatedUser = $user->getUserById($user_id);
        echo json_encode(['success' => true, 'message' => 'Profile updated successfully', 'user' => $updatedUser]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Profile update failed']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>