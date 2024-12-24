<?php 
    class AdminModel{
        protected $db;

        public function __construct($db)
        {
            $this->db = $db;
        } 

        public function connexionAdmin($email,$password){
            $requeteDeConnxion = "SELECT * FROM users WHERE email = ?";
            $stm = $this->db->prepare($requeteDeConnxion);
            $stm->execute([$email]);
            $resultat = $stm->fetch(PDO::FETCH_ASSOC);
            if($resultat){
                if(password_verify($password,$resultat['password'])){
                    return $resultat;
                }
            }
            return false; 
        }

        public function getUsers(){
            $requeteRecuperationUsers = "SELECT username,email FROM users";
            $stm = $this->db->prepare($requeteRecuperationUsers);
            $stm->execute();
            $resultat = $stm->fetchAll(PDO::FETCH_ASSOC);
            
            return $resultat;
    }

        public function getGrids(){
            $requeteRecuperationGrids = "SELECT description,nom,niveau_difficulte,date_de_creation FROM grids";
            $stm = $this->db->prepare($requeteRecuperationGrids);
            $stm->execute();
            $resultat = $stm->fetchAll(PDO::FETCH_ASSOC);
            return $resultat;
        }
}
?>