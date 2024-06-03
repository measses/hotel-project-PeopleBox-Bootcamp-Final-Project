<?php

include_once '../../core/Model.php';


// CREATE TABLE rooms (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     room_number VARCHAR(10) NOT NULL,
//     type VARCHAR(50) NOT NULL,
//     status VARCHAR(20) NOT NULL,
//     checkin_date DATE,
//     checkout_date DATE,
//     guest_name VARCHAR(100),
//     cleaning_status VARCHAR(20) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL
//   );
  
class Room extends BaseCrud{
    // Properties

    public $id;
    public $room_number;
    public $type;
    public $status;
    public $checkin_date;
    public $checkout_date;
    public $guest_name;
    public $cleaning_status;
    public $price;

    protected $table = 'rooms';

    public function __construct($db) {
        parent::__construct($db);
    }

}