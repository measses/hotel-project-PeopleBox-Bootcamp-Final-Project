<?php

include_once '../../core/Model.php';

class Revenue extends BaseCrud {
    // Properties
    public $id;
    public $description;
    public $amount;
    public $revenue_date;
    public $category;
    public $created_at;
    public $updated_at;

    protected $table = 'revenue';

    public function __construct($db) {
        parent::__construct($db);
    }
}

?>
