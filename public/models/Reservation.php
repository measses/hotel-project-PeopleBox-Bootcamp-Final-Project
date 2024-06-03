<?php

include_once '../../core/Model.php';

class Reservation extends BaseCrud {
    // Properties
    public $id;
    public $room_number;
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
}

