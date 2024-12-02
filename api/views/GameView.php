<?php
class GameView {
    public function render($game) {
        // Si les données du jeu sont disponibles
        if ($game) {
            echo json_encode($game);
        } else {
            // Si le jeu n'a pas été trouvé
            http_response_code(404);
            echo json_encode(["error" => "Game not found"]);
        }
    }
}
?>
