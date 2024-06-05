<?php

include_once '../../core/Model.php';

class Expense extends BaseCrud {
    // Properties
    public $id;
    public $description;
    public $amount;
    public $date;
    public $category;
    public $created_at;
    public $updated_at;

    protected $table = 'expenses';

    public function __construct($db) {
        parent::__construct($db);
    }
}

?>
