<?php
class MessageView {
    public function render($message) {
        echo json_encode(["message" => $message]);
    }
}
?>