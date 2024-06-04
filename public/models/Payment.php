<?php

include_once '../../core/Model.php';

class Payment extends BaseCrud {
    // Properties
    public $id;
    public $reservation_id;
    public $amount;
    public $payment_date;
    public $payment_method;
    public $created_at;
    public $updated_at;
    public $deleted_at;


    protected $table = 'payments';

    public function __construct($db) {
        parent::__construct($db);
    }
}

?>
