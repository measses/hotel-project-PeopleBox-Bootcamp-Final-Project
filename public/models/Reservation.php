<?php

include_once '../../core/Model.php';
include_once 'Revenue.php'; 
class Reservation extends BaseCrud {
    // Özellikler
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
        $stmt = $this->connection->prepare($query); //Burada revenue tablosuna ekleme yapılıyor ve room_rent kategorisine göre ekleniyor.
        $stmt->bindValue(':description', 'Room Reservation ' . $reservationId); //reservationId ile rezervasyon numarası ekleniyor.
        $stmt->bindValue(':amount', $data['total_price']); //Toplam fiyat ekleniyor. bindValue ile veri tipi belirleniyor.
        $stmt->bindValue(':revenue_date', $data['checkin_date']);// Checkin tarihi ekleniyor.
        $stmt->bindValue(':category', 'room_rent'); //Kategori room_rent olarak ekleniyor.
        $stmt->execute(); //Sorgu çalıştırılıyor.
    }

    private function getRoomByNumber($room_number) {
        $query = 'SELECT * FROM rooms WHERE room_number = :room_number AND deleted_at IS NULL'; //veritabanından oda numarasına göre oda bilgileri çekiliyor.
        $stmt = $this->connection->prepare($query); //Sorgu hazırlanıyor.
        $stmt->bindParam(':room_number', $room_number); //Oda numarası bind ediliyor.
        $stmt->execute(); //Sorgu çalıştırılıyor.
        return $stmt->fetch(PDO::FETCH_ASSOC); //Sorgudan dönen veri fetch ediliyor.
    }

    private function isDateValid($checkin_date, $checkout_date) { //Tarihlerin geçerli olup olmadığını kontrol eden fonksiyon.
        $current_date = new DateTime(); //Şu anki tarih alınıyor.
        $checkin_date = new DateTime($checkin_date); //Checkin tarihi alınıyor.
        $checkout_date = new DateTime($checkout_date); //Checkout tarihi alınıyor.


        return $checkin_date >= $current_date && $checkout_date > $checkin_date;    //Checkin tarihi şu anki tarihten büyük ve checkout tarihi checkin tarihinden büyük olmalı.
    }

    public function create($data) {
        if (isset($data['room_number'])) {
            // Oda numarasını al ve room_id'yi ata
            $room_data = $this->getRoomByNumber($data['room_number']);
            if ($room_data) {
                $data['room_id'] = $room_data['id'];
                $daily_price = $room_data['price'];
                $checkin_date = new DateTime($data['checkin_date']);
                $checkout_date = new DateTime($data['checkout_date']);
                $interval = $checkin_date->diff($checkout_date);
                $days = $interval->days;

                // Günlük fiyat ve gün sayısını loglayın
                error_log('Daily Price: ' . $daily_price);
                error_log('Days: ' . $days);

                $data['total_price'] = $daily_price * $days;
            } else {
                return ['success' => false, 'message' => 'Room not found']; // Oda bulunamadı
            }
            unset($data['room_number']);
        }

        if (!$this->isDateValid($data['checkin_date'], $data['checkout_date'])) {
            return ['success' => false, 'message' => 'Invalid check-in or check-out date'];
        }

        $fields = implode(", ", array_keys($data)); //Veritabanına eklenecek alanlar belirleniyor.
        $values = ":" . implode(", :", array_keys($data));  //Veritabanına eklenecek değerler belirleniyor.
        $query = 'INSERT INTO ' . $this->table . ' (' . $fields . ', created_at, updated_at) VALUES (' . $values . ', NOW(), NOW())'; //Sorgu oluşturuluyor.
        $stmt = $this->connection->prepare($query); //Sorgu hazırlanıyor.
        foreach ($data as $key => $value) { //Veriler bind ediliyor.
            $stmt->bindValue(':' . $key, $value); //Bind ediliyor.
        }
        $result = $stmt->execute();

        if ($result && isset($data['status']) && $data['status'] === 'confirmed') { //Eğer rezervasyon onaylandıysa revenue tablosuna ekleme yapılıyor.
            $this->addRevenue($this->connection->lastInsertId(), $data);
        }

        return ['success' => $result];
    }

    public function update($id, $data) {
        if (!$this->isDateValid($data['checkin_date'], $data['checkout_date'])) {
            return ['success' => false, 'message' => 'Invalid check-in or check-out date'];
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

        if ($result && isset($data['status'])) {
            if ($data['status'] === 'confirmed') {
                $this->addRevenue($id, $data);
                $this->updateRoomStatus($data['room_id'], 'Occupied');
            } elseif ($data['status'] === 'cancelled') {
                $this->updateRoomStatus($data['room_id'], 'Available');
            }
        }

        return ['success' => $result];
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
