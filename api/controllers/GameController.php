<?php
require_once 'models/GameModel.php';
require_once 'views/GameView.php';

class GameController {
    private $model;
    private $view;

    public function __construct() {
        $this->model = new GameModel();
        $this->view = new GameView();
    }


    public function getGame($id) {
        // Ici tu peux récupérer les informations du jeu avec l'ID $id depuis la base de données
        $game = $this->model->getGame($id);
        $this->view->render($game);

    }

    
}
