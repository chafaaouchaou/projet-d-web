<?php
require_once 'DB.php';

class MessageModel {
    private $conn;
    private $table_name = "message";

    public function __construct() {
        $db = new DB();
        $this->conn = $db->getConnection();
    }

    public function getMessage() {
        $query = "SELECT content FROM " . $this->table_name . " ORDER BY created_at DESC LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row ? $row['content'] : "No message found!";
    }
}
?>
