<?php

include_once '../../core/Model.php';

class Room extends BaseCrud{
    // Properties

    public $id;
    public $room_number;
    public $type;
    public $status;
    public $cleaning_status;
    public $price;

    protected $table = 'rooms';

    public function __construct($db) {
        parent::__construct($db);
    }

}

?>
