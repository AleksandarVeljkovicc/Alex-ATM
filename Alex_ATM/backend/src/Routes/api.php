<?php
require_once __DIR__ . '/../../vendor/autoload.php'; 

// CORS
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Set-Cookie: PHPSESSID=' . session_id() . '; path=/; HttpOnly');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Expires: 0');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

use Src\Controller\LanguageController;
use Src\Controller\UserCardController;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


function log_error($message) {
    error_log("Error: " . $message, 3, __DIR__ . "/../../logs/error_log");
}

try {       
    //Get the route parameter from the URL
    $route = $_GET['route'] ?? '';

    if ($route === 'languages') {
        $languageController = new LanguageController();
        $languageController->getLanguages();
    } elseif ($route === 'select-language' && isset($_GET['language'])) {
        $languageController = new LanguageController();
        $languageController->getLanguageByValue($_GET['language']);    
    }
    elseif ($route === 'check-card' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = file_get_contents('php://input');
        error_log("Received data: " . $data); 
    
        if (!$data) {
            echo json_encode(['error' => 'No input data provided']);
            exit;
        }
    
        $decoded = json_decode($data, true);
    
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['error' => 'Invalid JSON format']);
            exit;
        }
    
        if (isset($decoded['card_number'])) {
            $userCardController = new UserCardController(); 
            $userCardController->checkCard($decoded['card_number']);
            //echo json_encode($userCardController);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing card number']);
        }
    }
    elseif ($route === 'update-account-balance' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = file_get_contents('php://input');
        error_log("Received data: " . $data); 
    
        if (!$data) {
            echo json_encode(['error' => 'No input data provided']);
            exit;
        }
    
        $decoded = json_decode($data, true);
    
        if (json_last_error() !== JSON_ERROR_NONE) {
            error_log("JSON decode error: " . json_last_error_msg());
            echo json_encode(['error' => 'Invalid JSON format', 'details' => json_last_error_msg()]);
            exit;
        }
    
        if (isset($decoded['fullName']) && isset($decoded['newBalance'])) {
            $fullName = $decoded['fullName'];
            $newBalance = $decoded['newBalance'];
    
            
            $userCardController = new UserCardController();
            $response = $userCardController->updateAccountBalance($fullName, $newBalance);
            echo json_encode($response);
        } else {
            echo json_encode(['success' => false, 'message' => 'Missing required data']);
        }
    }
    else {
        echo json_encode(['message' => 'Invalid route']);
    }
} catch (Exception $e) {
    log_error($e->getMessage());
    echo json_encode(['error' => 'An internal server error occurred.']);
    http_response_code(500);
}
