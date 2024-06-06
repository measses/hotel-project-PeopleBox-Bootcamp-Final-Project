<?php

include_once '../../core/Model.php';
include_once 'Revenue.php';  // Revenue modelini dahil ediyoruz

class Reservation extends BaseCrud {
    // Properties
    public $id;
    public $room_id;
    public $guest_name;
    public $checkin_date;
    public $checkout_date;
    public $status;
    public $total_price;
    public $created_at;
    public $updated_at;
    public $deleted_at;

    protected $table = 'reservations';

    public function __construct($db) {
        parent::__construct($db);
    }
    
    private function addRevenue($reservationId, $data) {
        $query = 'INSERT INTO revenue (description, amount, revenue_date, category, created_at, updated_at) 
                VALUES (:description, :amount, :revenue_date, :category, NOW(), NOW())';
        $stmt = $this->connection->prepare($query);
        $stmt->bindValue(':description', 'Room Reservation ' . $reservationId);
        $stmt->bindValue(':amount', $data['total_price']);
        $stmt->bindValue(':revenue_date', $data['checkin_date']);
        $stmt->bindValue(':category', 'room_rent');
        $stmt->execute();
    }

    public function create($data) {
        $fields = implode(", ", array_keys($data));
        $values = ":" . implode(", :", array_keys($data));
        $query = 'INSERT INTO ' . $this->table . ' (' . $fields . ', created_at, updated_at) VALUES (' . $values . ', NOW(), NOW())';
        $stmt = $this->connection->prepare($query);
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        $result = $stmt->execute();

        if ($result && isset($data['status']) && $data['status'] === 'confirmed') {
            $this->addRevenue($this->connection->lastInsertId(), $data);
        }

        return $result;
    }

    public function update($id, $data) {
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
    
        if ($result && isset($data['status'])) {
            if ($data['status'] === 'confirmed') {
                $this->addRevenue($id, $data);
                $this->updateRoomStatus($data['room_id'], 'Occupied');
            } elseif ($data['status'] === 'cancelled') {
                $this->updateRoomStatus($data['room_id'], 'Available');
            }
        }
    
        return $result;
    }
    
    public function delete($id) {
        // Get reservation data
        $reservation = $this->getById($id);
        
        $query = 'UPDATE ' . $this->table . ' SET deleted_at = NOW(), status = "cancelled" WHERE id = :id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $result = $stmt->execute();
    
        // Update room status to available
        if ($result) {
            $this->updateRoomStatus($reservation['room_id'], 'Available');
        }
    
        return $result;
    }

    private function updateRoomStatus($room_id, $status) {
        $query = 'UPDATE rooms SET status = :status WHERE id = :room_id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':room_id', $room_id, PDO::PARAM_INT);
        $stmt->execute();
    }
    
    public function isRoomAvailable($room_id, $checkin_date, $checkout_date, $reservation_id = null) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE room_id = :room_id AND status NOT IN ("cancelled", "deleted") AND (checkin_date < :checkout_date AND checkout_date > :checkin_date)';
        if ($reservation_id) {
            $query .= ' AND id != :reservation_id';
        }
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':room_id', $room_id);
        $stmt->bindParam(':checkin_date', $checkin_date);
        $stmt->bindParam(':checkout_date', $checkout_date);
        if ($reservation_id) {
            $stmt->bindParam(':reservation_id', $reservation_id);
        }
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        return !$result;
    }
    
    public function getLastInsertId() {
        return $this->connection->lastInsertId();
    }

    public function getErrorInfo() {
        return $this->connection->errorInfo();
    }
}
?>
