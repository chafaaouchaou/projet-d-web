<?php
require_once 'models/GamesModels.php';
require_once 'views/GamesView.php';

class GamesController {
    private $model;
    private $view;

    public function __construct() {
        $this->model = new GamesModels();
        $this->view = new GamesView();
    }

    public function getAllGames() {
        $games = $this->model->getAllGames();
        $this->view->render($games);
    }
}
?>
