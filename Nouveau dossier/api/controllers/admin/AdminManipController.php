<?php

class AdminManipController {
    private $db;
    private $model;

    public function __construct($db) {
        $this->db = $db;
        $this->model = new AdminManipModel($db);
    }

    public function adminConnecte(){
        session_start();
        if (!isset($_SESSION['admin_id'])) {
            http_response_code(401);
            echo json_encode(["error" => "Admin non connecté"]);
            exit;
        }
        return $_SESSION['admin_id'];
    }

    // Méthode pour créer un utilisateur
    public function createUser($data) {
        $adminConnecte = $this->adminConnecte();
        header('Content-Type: application/json');
        // Validation de l'email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['Adresse email non valide']);
            return;
        }

        // si l'email existe deja on retourne une erreur 
        $resultat = $this->model->emailVerif($data['email']);
        if ($resultat > 0) {
            echo json_encode(['Adresse email déjà utilisée']);
            return;
        }

        // Si tous se passe bien on ajoute l'utilisateur sans soucis
        $passwdHache = password_hash($data['password'], PASSWORD_DEFAULT);

        if ($this->model->createUser($data['username'], $data['email'], $passwdHache)) {
            echo json_encode(['Utilisateur ajouté avec succès']);
        } else {
            echo json_encode(['erreur' => 'Une erreur s\'est produite lors de l\'ajout de l\'utilisateur']);
        }
    }

    public function suppressionUser($id){
        header('Content-Type: application/json');
        if($this->model->suppressionUser($id)){
            echo json_encode(['Utilisateur supprimé']);
        }else{
            echo json_encode(['Erreur lors de la suppression']);
        }
    }

    public function suppressionGame($id){
        header('Content-Type: application/json');
        if($this->model->suppressionGame($id)){
            echo json_encode(['Grille supprimée']);
        }else{
            echo json_encode(['Erreur lors de la supression de la grille']);
        }
    }


}

?>
