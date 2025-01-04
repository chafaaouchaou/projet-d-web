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

    public function renderAddGridForm() {
        $html = '<h1>Ajouter une nouvelle grille</h1>
        <form id="add-grid-form">
            <label for="nom">Nom de la grille :</label>
            <input type="text" id="nom" name="nom" required>
    
            <label for="description">Description :</label>
            <textarea id="description" name="description" required></textarea>
    
            <label for="lignes">Nombre de lignes :</label>
            <input type="number" id="lignes" name="lignes" required>
    
            <label for="colonnes">Nombre de colonnes :</label>
            <input type="number" id="colonnes" name="colonnes" required>
    
            <label for="casesNoire">Cases noires (ex : 0,1 2,3) :</label>
            <input type="text" id="casesNoire" name="casesNoire" required>
    
            <label for="defHorizontales">Définitions horizontales (séparées par des virgules) :</label>
            <textarea id="defHorizontales" name="defHorizontales" required></textarea>
    
            <label for="defVerticales">Définitions verticales (séparées par des virgules) :</label>
            <textarea id="defVerticales" name="defVerticales" required></textarea>
    
            <label for="solutions">Solution de la grille :</label>
            <textarea id="solutions" name="solutions" required></textarea>
    
            <label for="niveauDifficulte">Niveau de difficulté :</label>
            <select id="niveauDifficulte" name="niveauDifficulte" required>
                <option value="débutant">Débutant</option>
                <option value="intermédiaire">Intermédiaire</option>
                <option value="expert">Expert</option>
            </select>

    
            <button type="submit">Ajouter la grille</button>
        </form>
    
        <div id="message"></div>
        
        <!-- Inclusion du fichier JS -->
        <script src="/projet-d-web/CruciWeb/games/assets/js/addGame.js"></script>';
    
        return $html;
    }
    
    // Méthode pour afficher un message de succès ou d'erreur
    public function renderMessage($message) {
        return "<p>$message</p>";
    }


}
?>
