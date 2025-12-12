<?php
// Database Configuration
// Update these values for your hosting provider

// For local development (XAMPP)
if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0) {
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'handtalk_db');
    define('DB_USER', 'root');
    define('DB_PASS', '');
}
// For production (shared hosting)
else {
    // Update these with your hosting provider's MySQL credentials
    // Usually found in cPanel → MySQL Databases
    define('DB_HOST', 'localhost');  // Usually 'localhost' on shared hosting
    define('DB_NAME', 'your_username_handtalk_db');  // Format: username_dbname
    define('DB_USER', 'your_username_dbuser');      // Your MySQL username
    define('DB_PASS', 'your_password');             // Your MySQL password
}

// CORS Configuration
define('ALLOWED_ORIGINS', [
    'http://localhost',
    'http://localhost:8080',
    'https://yourdomain.com',  // Add your production domain
    'https://www.yourdomain.com'
]);

function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        error_log('Database connection failed: ' . $e->getMessage());
        throw $e;
    }
}

function setCORSHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, ALLOWED_ORIGINS)) {
        header("Access-Control-Allow-Origin: $origin");
    } else {
        // For development, allow localhost
        if (strpos($origin, 'localhost') !== false || strpos($origin, '127.0.0.1') !== false) {
            header("Access-Control-Allow-Origin: $origin");
        }
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');
    
    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}
?>

