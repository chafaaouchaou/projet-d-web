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
        $requeteSuppressionUser = "DELETE FROM users WHERE id = ?";
        try{
            $stm = $this->db->prepare($requeteSuppressionUser);
            $stm->execute([$id]);
            return true;
        }catch(PDOException $e){
            return false;
        }
    }

    public function suppressionGame($id){
        $requeteSuppressionGame = "DELETE FROM grids WHERE id = ?";
        try{
            $stm = $this->db->prepare($requeteSuppressionGame);
            $stm->execute([$id]);
            return true;
        }catch(PDOException $e){
            return false;
        }
    }




}

?>
