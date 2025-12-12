<?php
require_once 'config.php';

setCORSHeaders();

try {
    $pdo = getDBConnection();
    
    $language = $_GET['language'] ?? 'asl';
    
    // Validate language input
    $allowedLanguages = ['asl', 'bsl', 'libras'];
    if (!in_array($language, $allowedLanguages)) {
        $language = 'asl';
    }
    
    $stmt = $pdo->prepare("SELECT word_phrase, glb_file_path FROM signs WHERE language = ? ORDER BY word_phrase");
    $stmt->execute([$language]);
    $signs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Convert to object format for JavaScript
    $result = [];
    foreach ($signs as $sign) {
        $result[$sign['word_phrase']] = $sign['glb_file_path'];
    }
    
    echo json_encode($result);
} catch (PDOException $e) {
    http_response_code(500);
    error_log('Database error in get-signs.php: ' . $e->getMessage());
    echo json_encode(['error' => 'Failed to load signs. Please try again later.']);
}
?>

