<?php
require_once 'controllers/MessageController.php';
require_once 'controllers/GameController.php';
require_once 'controllers/GamesController.php';

// Determine the route
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove '/api' from the request URI for simplicity
$route = str_replace('/api', '', $requestUri);

// Define route handling
switch ($route) {
    case '/message':
        $controller = new MessageController();
        $controller->getMessage();
        break;

        case '/games':
            $controller = new GamesController();
            $controller->getAllGames();
            break;

    // Nouvelle route dynamique pour le jeu
    case (preg_match('/^\/game\/(\d+)$/', $route, $matches) ? true : false):
        $gameId = $matches[1]; // Récupérer l'ID du jeu (ici, '34')
        $controller = new GameController();
        $controller->getGame($gameId);
        break;
    
        

    default:
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
        break;
}
