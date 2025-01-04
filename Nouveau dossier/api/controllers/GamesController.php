<?php
require_once 'models/GamesModels.php';
require_once 'views/GamesView.php';

class GamesController {
    private $model;
    private $view;

    public function __construct($db) {
        $this->model = new GamesModels($db);
        $this->view = new GamesView();
    }

    public function getAllGames() {
        $games = $this->model->getAllGames();
        header('Content-Type: application/json');
        echo json_encode($games);
        // $this->view->render($games);
    }

    public function getFilteredGames() {
        $niveau_difficulte = $_GET['niveau_difficulte'] ?? null;
        $date_de_creation = $_GET['date_de_creation'] ?? null;

        try{
            $filteredGames = $this->model->getFilteredGames($niveau_difficulte,$date_de_creation);  
            header('Content-Type: application/json');
            echo json_encode($filteredGames);
        }catch(Exception $e){
            header('Content-Type: application/json', true, 500);
            echo json_encode($e->getMessage());
        }

        
        
    }
}
?>
