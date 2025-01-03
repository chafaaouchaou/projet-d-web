<?php
require_once '../config/connectDB.php';
require_once 'controllers/GameController.php';
require_once 'controllers/GamesController.php';
require_once 'controllers/UserController.php';
require_once 'controllers/SavedGameController.php';
require_once 'models/SavedGameModel.php';
require_once 'controllers/admin/AdminController.php';
require_once 'models/admin/AdminModel.php';
require_once 'controllers/admin/AdminManipController.php';
require_once 'models/admin/AdminManipModel.php';
//require_once 'controllers/MessageModel.php';

//connexion a la base de données

$database = new Database();
$db = $database->getDbConnexion();

// Determine the route
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove '/api' from the request URI for simplicity
$route = str_replace('/projet-d-web/api', '', $requestUri);

// Define route handling
switch ($route) {
    case '/message':
        $controller = new MessageController();
        $controller->getMessage();
        break;

    case '/games':
        $controller = new GamesController($db);
        $controller->getAllGames();
        break;

    case '/games/filtered' :
        $controller = new GamesController($db);
        $controller->getFilteredGames();
        break; 
        
    // Nouvelle route dynamique pour le jeu
    case (preg_match('/^\/game\/(\d+)$/', $route, $matches) ? true : false):
        $gameId = $matches[1]; 
        $controller = new GameController($db);
        $controller->getGame($gameId);
        break;

    case '/register' :
        $controller = new UserController($db);
        $controller->register($_POST);    
        break;
        
        case '/login':
            $controller = new UserController($db);
            $data = json_decode(file_get_contents("php://input"), true); // Récupère les données JSON
            if (!$data) {
                echo json_encode(['erreur' => 'Aucune donnée reçue']);
                return;
            }
            $controller->login($data);
            break;
        
    
    case '/logout' : 
        $controller = new UserController($db);
        $controller->logout();
        break;

    case '/addGridForm':
        $controller = new GameController($db);
        $controller->showAddGridForm();
        break;

    case '/addGrid':
        $controller = new GameController($db);
        $data = json_decode(file_get_contents("php://input"),true);
        if(!$data){
            echo json_encode(['erreur'=>'aucune donnée dans /addGrid reçue']);
            return;
        }
        $controller->addGrid($data);
        break;
    
          

            case '/saveGame':
                $controller = new SavedGameController($db);
                $gridId = $_GET['gridId'] ?? null;
                $data = json_decode(file_get_contents("php://input"), true);
                if (!$gridId) {
                    echo json_encode(['erreur' => 'Aucun ID de grille fourni']);
                    return;
                }
                $controller->saveGame(
                    $gridId,
                    $data['solutionPartielle'] ?? null
                );
                break;

        case (preg_match('/^\/getSavedGame\/(\d+)$/', $route, $matches) ? true : false):
            $savedGridId = $matches[1];  
            $controller = new SavedGameController($db);
            $controller->getSavedGame($savedGridId);
            break;
    
        case '/getSavedGames':
            $controller = new SavedGameController($db);
            $controller->getSavedGames();  
            break;
        
        case (preg_match('/^\/deleteSaveGame\/(\d+)$/', $route, $matches) ? true : false):
            $id = $matches[1];
            $controller = new SavedGameController($db);
            $controller->deleteSaveGame($id);
            break;

        case '/admin/login' :
            $controller = new AdminController($db);
            $data = json_decode(file_get_contents("php://input"), true);
            if (!$data) {
                echo json_encode(['erreur' => 'Aucune donnée reçue']);
                return;
            }
            $controller->connexionAdmin($data);
            
            break;

        case '/admin/logout' :
            $controller = new AdminController($db);
            $controller->deconnexionAdmin();
            break;
        
        case '/admin/getUsers' :
            $controller = new AdminController($db);
            $controller->getUsers();
            break;
        
        case '/admin/getGrids' : 
            $controller = new AdminController($db);
            $controller->getGrids();
            break;
        
        case '/admin/addUser':
            $controller = new AdminManipController($db);
            $data = json_decode(file_get_contents("php://input"), true);
            if (!$data) {
                echo json_encode(['erreur' => 'Aucune donnée reçue']);
                return;
            }
            $controller->createUser($data);
            break;

        case preg_match('/^\/admin\/deleteUser\/(\d+)$/', $route, $matches) ? true : false:
            $userId = $matches[1];  // Récupérer l'ID de l'utilisateur à supprimer
            $controller = new AdminManipController($db);
            $controller->suppressionUser($userId);
            break;

        case preg_match('/^\/admin\/deleteGame\/(\d+)$/', $route, $matches) ? true : false:
            $gridId = $matches[1];  // Récupérer l'ID de l'utilisateur à supprimer
            $controller = new AdminManipController($db);
            $controller->suppressionGame($gridId);
            break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
        break;
}
