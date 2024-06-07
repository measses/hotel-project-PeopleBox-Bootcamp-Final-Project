<?php

include_once '../../core/Model.php';

class Room extends BaseCrud {
    // Properties
    public $id;
    public $room_number;
    public $room_type;
    public $status;
    public $cleaning_status;
    public $price;
    public $created_at;
    public $updated_at;
    public $deleted_at;

    protected $table = 'rooms';

    public function __construct($db) {
        parent::__construct($db);
    }

    // Room number'ın benzersizliğini kontrol eden fonksiyon
    public function roomNumberExists($room_number) {
        $query = 'SELECT COUNT(*) as count FROM ' . $this->table . ' WHERE room_number = :room_number';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':room_number', $room_number, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'] > 0;
    }

    public function update($id, $data) {
        // Oda numarası kontrolü
        $query = 'SELECT * FROM ' . $this->table . ' WHERE room_number = :room_number AND id != :id AND deleted_at IS NULL';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':room_number', $data['room_number']);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $existingRoom = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($existingRoom) {
            return ['success' => false, 'error' => 'Room number already exists'];
        }
    
        // Rezervasyon kontrolü
        if (isset($data['status']) && $data['status'] === 'Available') {
            $reservationQuery = 'SELECT * FROM reservations WHERE room_id = :room_id AND status = "confirmed" AND checkout_date > NOW()';
            $reservationStmt = $this->connection->prepare($reservationQuery);
            $reservationStmt->bindParam(':room_id', $id, PDO::PARAM_INT);
            $reservationStmt->execute();
            $activeReservation = $reservationStmt->fetch(PDO::FETCH_ASSOC);
    
            if ($activeReservation) {
                return ['success' => false, 'error' => 'Room cannot be marked as available, it has active reservations'];
            }
        }
    
        $set = "";
        foreach ($data as $key => $value) {
            $set .= $key . " = :" . $key . ", ";
        }
        $set .= "updated_at = NOW()";
        $query = 'UPDATE ' . $this->table . ' SET ' . $set . ' WHERE id = :id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        $result = $stmt->execute();
    
        return ['success' => $result, 'error' => $result ? null : 'An error occurred while updating the room'];
    }
    
    

    public function create($data) {
        // Oda numarası kontrolü
        $query = 'SELECT * FROM ' . $this->table . ' WHERE room_number = :room_number AND deleted_at IS NULL';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':room_number', $data['room_number']);
        $stmt->execute();
        $existingRoom = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($existingRoom) {
            return false; // Oda numarası zaten mevcut
        }

        $fields = implode(", ", array_keys($data));
        $values = ":" . implode(", :", array_keys($data));
        $query = 'INSERT INTO ' . $this->table . ' (' . $fields . ', created_at, updated_at) VALUES (' . $values . ', NOW(), NOW())';
        $stmt = $this->connection->prepare($query);
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        return $stmt->execute();
    }

    public function delete($id) {
        // Check if the room has active reservations
        $query = 'SELECT COUNT(*) as count FROM reservations WHERE room_id = :room_id AND status = "confirmed"';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':room_id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($result && $result['count'] > 0) {
            return ['success' => false, 'message' => 'Room has active reservations'];
        }
    
        $query = 'UPDATE rooms SET deleted_at = NOW() WHERE id = :id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $success = $stmt->execute();
    
        return ['success' => $success, 'message' => $success ? 'Room Deleted' : 'Room Not Deleted'];
    }
    
    
    
    public function getRoomNumberById($room_id) {
        $query = 'SELECT room_number FROM ' . $this->table . ' WHERE id = :room_id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':room_id', $room_id, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['room_number'];
    }
    
    
}
?>
