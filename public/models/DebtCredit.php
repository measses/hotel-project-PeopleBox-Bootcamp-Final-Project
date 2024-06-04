<?php

include_once '../../core/Model.php';

class DebtCredit extends BaseCrud {
    // Properties
    public $id;
    public $description;
    public $amount;
    public $type;
    public $due_date;
    public $created_at;
    public $updated_at;

    protected $table = 'debts_credits';

    public function __construct($db) {
        parent::__construct($db);
    }
}

?>
