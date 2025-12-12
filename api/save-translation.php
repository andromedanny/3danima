<?php
require_once 'config.php';

setCORSHeaders();

try {
    $pdo = getDBConnection();
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['user_text']) || empty(trim($data['user_text']))) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing or empty user_text']);
        exit;
    }
    
    $userText = trim($data['user_text']);
    $language = $data['language'] ?? 'asl';
    
    // Validate language
    $allowedLanguages = ['asl', 'bsl', 'libras'];
    if (!in_array($language, $allowedLanguages)) {
        $language = 'asl';
    }
    
    // Sanitize and limit text length
    if (strlen($userText) > 1000) {
        $userText = substr($userText, 0, 1000);
    }
    
    $signsUsed = isset($data['signs_used']) && is_array($data['signs_used']) 
        ? json_encode($data['signs_used']) 
        : json_encode([]);
    
    $stmt = $pdo->prepare("INSERT INTO translations (user_text, language, signs_used) VALUES (?, ?, ?)");
    $stmt->execute([$userText, $language, $signsUsed]);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    error_log('Database error in save-translation.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Failed to save translation. Please try again later.']);
}
?>

