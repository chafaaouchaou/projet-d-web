<?php 

    class SavedGameModel{
        protected $db;

        public function __construct($db)
        {
            return $this->db = $db;
        }


        public function saveGame($userId, $gridId,$solutionPartielle = null)
        {
            //On commence par verifier si la grille est déja sauvegardée par l'utilisateur 
            $requeteVerification = "SELECT COUNT(*) FROM saved_grids WHERE id_user = ? AND id_grid = ?";
            $stm = $this->db->prepare($requeteVerification);
            $stm->execute([$userId,$gridId]);
            $existe = $stm->fetchColumn();
            //si la grille est déja sauvegarder on fait un update
            if($existe > 0){
                $requeteUpdate = "UPDATE saved_grids SET solution_partielle = ?, save_date = CURRENT_TIMESTAMP WHERE id_user = ? AND id_grid = ?";
                $stm = $this->db->prepare($requeteUpdate);
                $stm->execute([$solutionPartielle, $userId, $gridId]);   
            }//sinon on insere 
            else{
                $requeteInsertion = "INSERT INTO saved_grids(id_user,id_grid,solution_partielle) VALUES(?,?,?)";
                $stm = $this->db->prepare($requeteInsertion);
                $stm->execute([$userId, $gridId, $solutionPartielle]);
            }
        }


        public function getSavedGame($gridId,$userId){
            $requeteRecuperationDeLaGrille = "SELECT S.id_saved_grids, S.solution_partielle,S.save_date,G.nom, G.nbr_lignes, G.nbr_colonnes, G.def_horizontales, 
                                              G.def_verticales, G.cases_noire, G.solutions, G.id as grid_id
                                              FROM saved_grids S
                                              JOIN grids G ON S.id_grid = G.id
                                              WHERE S.id_saved_grids = ? AND S.id_user = ?";

            $stm = $this->db->prepare($requeteRecuperationDeLaGrille);
            $stm->execute([$gridId,$userId]);                                
            return $stm->fetch(PDO::FETCH_ASSOC);
        }

        public function getSavedGames($userId){
            $requeteRecuperationDesGrilles = "SELECT S.id_saved_grids,S.save_date,G.nom,G.description
                                              FROM saved_grids S
                                              JOIN grids G ON S.id_grid = G.id
                                              WHERE S.id_user = ?";
            $stm = $this->db->prepare($requeteRecuperationDesGrilles);    
            $stm->execute([$userId]);
            return $stm->fetchAll(PDO::FETCH_ASSOC);             
        }
        
        public function deleteSaveGame($id)
        {
            $requeteSuppressionDeLagrille = "DELETE FROM saved_grids WHERE id_saved_grids = ?";
            $stm = $this->db->prepare($requeteSuppressionDeLagrille);
            $stm->execute([$id]);
        }

    }

?>