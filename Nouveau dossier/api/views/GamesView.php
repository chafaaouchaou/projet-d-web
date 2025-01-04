<?php
class GamesView {
    public function render($games) {
        header('Content-Type: application/json');
        echo json_encode($games);
    }
}
?>
