<?php
require_once 'controllers/MessageController.php';

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

    default:
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
        break;
}
