<?php 

    class AdminController{
        private $db;
        private $model;

        public function __construct($db)
        {
            $this->db = $db;
            $this->model = new AdminModel($db);
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

        public function connexionAdmin($donneesAdmin){
            $email = $donneesAdmin['email'];
            $password = $donneesAdmin['password'];

            $resultat = $this->model->connexionAdmin($email,$password);
            header('Content-Type: application/json');

            if($resultat){
                if (session_status() == PHP_SESSION_NONE) {
                    session_start();  
                }
                $_SESSION['admin_id'] = $resultat['id'];
                $_SESSION['email'] = $resultat['email'];
            
                echo json_encode(['youpi'=>'Utilisateur admin est connecté']);
            }else{
                echo json_encode(['erreur'=>'Utilisateur admin n\'arrive pas a se connecter']);
            }
        }

        public function deconnexionAdmin(){
            header('Content-Type: application/json');
            if (session_status() == PHP_SESSION_NONE) {
                session_start(); 
            }
            session_unset();
            session_destroy();
            echo json_encode(['youpi'=>'Utilisateur admin s\'est deconnecté']);
        }

        public function getUsers(){
            $adminConnecte = $this->adminConnecte();
            header('Content-Type: application/json');
            $resultat = $this->model->getUsers();
            if($resultat > 0){
                echo json_encode($resultat);
            }else{
                echo json_encode(['erreur'=>'aucune donnée récupérée']);
            }
        }

        public function getGrids(){
            $adminConnecte = $this->adminConnecte();
            header('Content-Type: application/json');
            $resultat = $this->model->getGrids();
            if($resultat > 0){
                echo json_encode($resultat);
            }else{
                echo json_encode(['erreur'=>'aucune donnée récupérée']);
            }
        }
    }
?>