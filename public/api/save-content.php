<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['content'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid payload']);
    exit();
}

$file = __DIR__ . '/content.json';
$currentData = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$storedPassword = isset($currentData['passwordHash']) ? $currentData['passwordHash'] : 'beautytrap2026';

$providedPassword = isset($input['password']) ? $input['password'] : '';

if ($providedPassword !== $storedPassword) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Invalid Admin Password']);
    exit();
}

// Optionally update password if newPassword provided
$newPassword = !empty($input['newPassword']) ? trim($input['newPassword']) : $storedPassword;

$savePayload = [
    'passwordHash' => $newPassword,
    'updatedAt' => date('c'),
    'content' => $input['content']
];

$success = file_put_contents($file, json_encode($savePayload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

if ($success !== false) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Content successfully updated live on server!',
        'updatedAt' => $savePayload['updatedAt']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to write content to disk']);
}
