<?php

include_once '../../core/Model.php';

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

        if ($result && isset($data['status']) && $data['status'] === 'confirmed') {
            $this->addRevenue($id, $data);
        }

        return $result;
    }
}
?>
