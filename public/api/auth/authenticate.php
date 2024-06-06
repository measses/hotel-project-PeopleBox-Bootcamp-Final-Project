<?php
require '../../vendor/autoload.php';
include '../../config/config.php';

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

function authenticate() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }

    $authHeader = $headers['Authorization'];
    list($jwt) = sscanf($authHeader, 'Bearer %s');

    if (!$jwt) {
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }

    try {
        $decoded = JWT::decode($jwt, new Key(JWT_SECRET, JWT_ALGORITHM));
        return $decoded;
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Unauthorized', 'error' => $e->getMessage()]);
        exit;
    }
}
?>
