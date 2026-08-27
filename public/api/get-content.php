<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$file = __DIR__ . '/content.json';

if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true);
    // Return only public content without exposing password
    $publicData = isset($data['content']) ? $data['content'] : $data;
    echo json_encode([
        'status' => 'success',
        'data' => $publicData,
        'updatedAt' => isset($data['updatedAt']) ? $data['updatedAt'] : date('c')
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        'status' => 'error',
        'message' => 'Content file not found'
    ]);
}
