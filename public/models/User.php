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
    public $profile_picture;
    public $verification_code;


    public function __construct($db) {
        $this->conn = $db;
    }

   

    public function register($username, $email, $password, $user_type = 'user') {
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

        $query = "INSERT INTO " . $this->table . " (username, email, password, user_type) VALUES (:username, :email, :password, :user_type)";
        $stmt = $this->conn->prepare($query);

        $password_hash = password_hash($password, PASSWORD_BCRYPT);

        // Bind parameters
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':user_type', $user_type);

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

    public function saveVerificationCode($email, $code) {
        $query = "UPDATE " . $this->table . " SET verification_code = :code WHERE email = :email";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':email', $email);

        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            throw new Exception('Doğrulama kodu kaydedilemedi. Hata: ' . $e->getMessage());
        }
    }

    public function verifyEmail($email, $code) {
        $query = "SELECT * FROM " . $this->table . " WHERE verification_code = :code AND email = :email";
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(':code', $code);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
    
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($user) {
            $query = "UPDATE " . $this->table . " SET verification_code = NULL, email_verified_at = NOW() WHERE verification_code = :code AND email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':code', $code);
            $stmt->bindParam(':email', $email);
            return $stmt->execute();
        }
    
        return false;
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

    public function updateProfile($id, $username, $email, $profile_picture = null, $password = null) {
        $query = "UPDATE " . $this->table . " SET username = :username, email = :email";
        
        if ($profile_picture) {
            $query .= ", profile_picture = :profile_picture";
        }
        
        if ($password) {
            $query .= ", password = :password";
        }
        
        $query .= " WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);
    
        // Bind parameters
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        
        if ($profile_picture) {
            $stmt->bindParam(':profile_picture', $profile_picture);
        }
        
        if ($password) {
            $stmt->bindParam(':password', $password);
        }
    
        // Execute the query
        try {
            return $stmt->execute();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            throw new Exception('Profile update failed.');
        }
    }

    public function getUserById($id) {
        $query = "SELECT id, username, email, user_type, profile_picture FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    

    public function usernameExists($username) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE username = :username';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function emailExists($email) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE email = :email';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function getUsers() {
        $query = "SELECT id, username, email, user_type, profile_picture FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
