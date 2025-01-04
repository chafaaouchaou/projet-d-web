<?php

require_once __DIR__ . '/../models/UserModel.php';

class UserController{
    private $userModel;

    public function __construct($db)
    {
        $this->userModel = new User($db);
    }

    //Inscription 
    public function register($userData)
    {
        header("Content-Type: application/json"); // Indique que la réponse est en JSON

    if (!$userData) {
        $userData = json_decode(file_get_contents("php://input"), true); // Récupère les données JSON
    }

    if (empty($userData['username']) || empty($userData['email']) || empty($userData['password'])) {
        echo json_encode(['erreur' => 'Données manquantes']);
        return;
    }

    $result = $this->userModel->register($userData['username'], $userData['email'], $userData['password']);
    if ($result) {
        echo json_encode(['succes' => 'Utilisateur inscrit']);
    } else {
        echo json_encode(['erreur' => 'Erreur lors de l\'inscription']);
    }
    }

    //Connexion 
    public function login($userData){
        header("Content-Type: application/json"); 
        
        if(empty($userData['email'])||empty($userData['password'])){
            echo json_encode(['erreur'=>'Remplissez tous les champs']);
            return ;
        }

        $user = $this->userModel->login($userData['email'],$userData['password']);
        
        if($user){
            //Definir les sessions
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            echo json_encode(['succes'=>'Utilisateur connecté']);
        }else{
            echo json_encode(['erreur' => 'Identifiants incorrects']);
        }
    }

    public function logout()
    {
        header("Content-Type: application/json");
        session_start();
        session_unset();
        session_destroy();
        echo json_encode(['succes'=>'deconnexion réussie ']);

    }


}



?>