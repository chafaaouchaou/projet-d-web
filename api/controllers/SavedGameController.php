<?php 

    class SavedGameController{

        protected $savedGameModel;

        public function __construct($db)
        {
            $this->savedGameModel = new SavedGameModel($db);
        }

       
        public function estConecte() {
            session_start();
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(["error" => "Utilisateur non authentifié"]);
                exit;
            }
            return $_SESSION['user_id'];
        }

        public function saveGame($gridId, $solutionPartielle = null){
            try{
                $userId = $this->estConecte();
                $this->savedGameModel->saveGame($userId, $gridId,$solutionPartielle);
                $reponse = ["succes" => "Grille sauvegardée avec succées"];
            }catch(Exception $e){
                http_response_code(500);
                $reponse = ["error" => $e->getMessage()];
            }
            
            header('Content-Type: application/json');
            echo json_encode($reponse);
        }

        public function getSavedGame($gridId)
        {
            // Supposons que l'utilisateur est déjà authentifié et son ID est stocké dans la session
            $userId = $this->estConecte();
             // Récupérer l'ID de l'utilisateur depuis la session
    
            $savedGame = $this->savedGameModel->getSavedGame($gridId, $userId);
            if ($savedGame) {
                header('Content-Type: application/json');
                echo json_encode($savedGame);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Aucune grille sauvegardée trouvée"]);
            }
        }
    

        public function getSavedGames()
        {
            $userId = $this->estConecte();
            $savedGames = $this->savedGameModel->getSavedGames($userId);
            if($savedGames){
                header('Content-Type: application/json');
                echo json_encode($savedGames);
            }else{
                http_response_code(404);
                echo json_encode(["error" => "Aucune données trouvée"]);
            }
           
        }

        public function deleteSaveGame($id)
        {
            $userId = $this->estConecte();
            try{
                $this->savedGameModel->deleteSaveGame($id);
                $reponse = ["succes" => "Grille supprimée avec succées"];

            }catch(Exception $e){
                http_response_code(500);
                $reponse = ["error" => $e->getMessage()];
            }
            header('Content-Type: application/json');
            echo json_encode($reponse);
        }
 } 

?>