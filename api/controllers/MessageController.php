<?php
require_once 'models/MessageModel.php';
require_once 'views/MessageView.php';

class MessageController {
    private $model;
    private $view;

    public function __construct() {
        $this->model = new MessageModel();
        $this->view = new MessageView();
    }

    public function getMessage() {
        $message = $this->model->getMessage();
        $this->view->render($message);
    }
}
?>