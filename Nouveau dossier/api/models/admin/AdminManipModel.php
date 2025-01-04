<?php

class AdminManipModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    // vérifier si l'email existe ou pas
    public function emailVerif($email) {
        $requeteVerification = "SELECT COUNT(*) as count FROM users WHERE email = ?";
        $stm = $this->db->prepare($requeteVerification);
        $stm->execute([$email]);
        $resultat = $stm->fetch(PDO::FETCH_ASSOC);
        return $resultat['count'];
    }

    public function createUser($username, $email, $passwordHash) {
        $requeteAjoutUser = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
        try {
            $stm = $this->db->prepare($requeteAjoutUser);
            $stm->execute([$username, $email, $passwordHash, 'user']);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function suppressionUser($id){
        //faut d'abord supprimer la grille qu'il a crée s'il en a crée
        $requeteSuppressionSavedGrids = "DELETE FROM saved_grids WHERE id_user = ?";
        $stm = $this->db->prepare($requeteSuppressionSavedGrids);
        $stm->execute([$id]);


        $requeteSuppressionGrilles = "DELETE FROM grids WHERE id_utilisateur = ?";
        $stm = $this->db->prepare($requeteSuppressionGrilles);
        $stm->execute([$id]);

        $requeteSuppressionUser = "DELETE FROM users WHERE id = ?";
        try{
            $stm = $this->db->prepare($requeteSuppressionUser);
            $stm->execute([$id]);
            return true;
        }catch(PDOException $e){
            error_log("Erreur PDO : " . $e->getMessage());
            return false;
        }
    }

    public function suppressionGame($id){
        //pour pouvroir supprimer la grille faut d'abord supprimer les grilles sauvgarder s'il y en a
        $requeteSuppressionSavedGrids = "DELETE FROM saved_grids WHERE id_grid = ?";
        $stm = $this->db->prepare($requeteSuppressionSavedGrids);
        $stm->execute([$id]);
        
        $requeteSuppressionGame = "DELETE FROM grids WHERE id = ?";
        try{
            $stm = $this->db->prepare($requeteSuppressionGame);
            $stm->execute([$id]);
            return true;
        }catch(PDOException $e){
            error_log("Erreur PDO : " . $e->getMessage());
            return false;
        }
    }




}

?>
