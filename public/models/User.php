<?php

class User {
    private $conn;
    private $table = 'users';

    // Properties
    public $id;
    public $username;
    public $email;
    public $password;
    public $user_type;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register($username, $email, $password) {
        
        if ($this->usernameExists($username)) {
            throw new Exception('Bu kullanıcı adı zaten kullanılıyor.');
        }

        if ($this->emailExists($email)) {
            throw new Exception('Bu e-posta adresi zaten kullanılıyor.');
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception('Geçersiz e-posta adresi.');
        }

        $query = "INSERT INTO " . $this->table . " (username, email, password) VALUES (:username, :email, :password)";
        $stmt = $this->conn->prepare($query);

        $password_hash = password_hash($password, PASSWORD_BCRYPT);

        // Bind parameters
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password_hash);

        // Execute the query
        try {
            $result = $stmt->execute();
        } catch (PDOException $e) {
            // Log the error
            error_log($e->getMessage());
            throw new Exception('Kullanıcı kaydı başarısız oldu.');
        }

        return $result;
    }

    public function login($username, $password) {
        $query = "SELECT * FROM " . $this->table . " WHERE username = :username";
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bindParam(':username', $username);

        // Execute the query
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify password
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }

        return false;
    }

    private function usernameExists($username) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE username = :username';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    private function emailExists($email) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }
}
?>
