<?php

abstract class BaseCrud {
    protected $connection;
    protected $table;

    public function __construct($db) {
        $this->connection = $db;
    }

    public function getAll() {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE deleted_at IS NULL';
        $stmt = $this->connection->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id = :id AND deleted_at IS NULL';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $fields = implode(", ", array_keys($data));
        $values = ":" . implode(", :", array_keys($data));
        $query = 'INSERT INTO ' . $this->table . ' (' . $fields . ', created_at, updated_at) VALUES (' . $values . ', NOW(), NOW())';
        $stmt = $this->connection->prepare($query);
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value);
        }
        return $stmt->execute();
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
        return $stmt->execute();
    }
    

    public function delete($id) {
        $query = 'UPDATE ' . $this->table . ' SET deleted_at = NOW() WHERE id = :id';
        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}

?>
