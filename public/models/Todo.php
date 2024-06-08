<?php

include_once '../../core/Model.php';

class Todo extends BaseCrud {
    // Properties
    public $id;
    public $user_id;
    public $title;
    public $description;
    public $isConfirmed;
    public $created_at;
    public $updated_at;
    public $deleted_at;
    public $dueDate;

    protected $table = 'todos';

    public function __construct($db) {
        parent::__construct($db);
    }

    public function create($data) {
        $query = 'INSERT INTO ' . $this->table . ' (title, description, user_id, dueDate) VALUES (:title, :description, :user_id, :dueDate)';
        $stmt = $this->connection->prepare($query);
    
        // Clean and bind data
        $this->title = htmlspecialchars(strip_tags($data['title']));
        $this->description = htmlspecialchars(strip_tags($data['description']));
        $this->user_id = htmlspecialchars(strip_tags($data['user_id']));
        $this->dueDate = htmlspecialchars(strip_tags($data['dueDate']));
    
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':dueDate', $this->dueDate);

        try {
            if ($stmt->execute()) {
                return [
                    "success" => true,
                    "todo" => $this->getById($this->connection->lastInsertId())
                ];
            }
        } catch (PDOException $e) {
            error_log("Error: " . $e->getMessage());
            return ["success" => false, "message" => $e->getMessage()];
        }
    
        return ["success" => false, "message" => "Todo not created"];
    }

    public function delete($id) {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':id', $id);

        try {
            if ($stmt->execute()) {
                return ["success" => true];
            }
        } catch (PDOException $e) {
            error_log("Error: " . $e->getMessage());
            return ["success" => false, "message" => $e->getMessage()];
        }

        return ["success" => false, "message" => "Todo not deleted"];
    }

    public function getById($id) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id = :id';
        $stmt = $this->connection->prepare($query);

        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll() {
        $query = 'SELECT * FROM ' . $this->table;
        $stmt = $this->connection->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id, $data) {
        $query = 'UPDATE ' . $this->table . ' SET title = :title, description = :description, user_id = :user_id, dueDate = :dueDate, isConfirmed = :isConfirmed WHERE id = :id';
        $stmt = $this->connection->prepare($query);

        $this->title = htmlspecialchars(strip_tags($data['title']));
        $this->description = htmlspecialchars(strip_tags($data['description']));
        $this->user_id = htmlspecialchars(strip_tags($data['user_id']));
        $this->dueDate = htmlspecialchars(strip_tags($data['dueDate']));
        $this->isConfirmed = isset($data['isConfirmed']) ? htmlspecialchars(strip_tags($data['isConfirmed'])) : 0;

        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':dueDate', $this->dueDate);
        $stmt->bindParam(':isConfirmed', $this->isConfirmed);
        $stmt->bindParam(':id', $id);

        try {
            if ($stmt->execute()) {
                return [
                    "success" => true,
                    "todo" => $this->getById($id)
                ];
            }
        } catch (PDOException $e) {
            error_log("Error: " . $e->getMessage());
            return ["success" => false, "message" => $e->getMessage()];
        }

        return ["success" => false, "message" => "Todo not updated"];
    }
}

?>
