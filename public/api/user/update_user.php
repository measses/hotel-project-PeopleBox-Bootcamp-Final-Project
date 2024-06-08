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
    $file_type = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    $allowed_types = ['jpg', 'jpeg', 'png'];
    if (in_array($file_type, $allowed_types)) {
        // Dosya ismini hashleyerek eşsiz hale getirelim
        $hashed_file_name = md5(time() . $file_name) . '.' . $file_type;
        $target_file = $upload_dir . $hashed_file_name;

        if (move_uploaded_file($_FILES['profile_picture']['tmp_name'], $target_file)) {
            $profile_picture = $hashed_file_name; // hashlenmiş dosya adını kaydet
        } else {
            echo json_encode(['success' => false, 'message' => 'File upload failed']);
            return;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid file type']);
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
