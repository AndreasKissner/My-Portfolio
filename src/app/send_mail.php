<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");         
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);
if ($params && isset($params->email) && isset($params->message)) {
    
   include 'config.php';
   $apiKey = $brevoKey;

    $data = [
        "sender" => ["name" => "Portfolio Kontakt", "email" => "kontakt@andreaskissner.info"],
        "to" => [["email" => "andikiss500@gmail.com", "name" => "Andreas Kissner"]],
        "subject" => "Neue Nachricht von " . ($params->name ?? 'Unbekannt'),
        "textContent" => "Name: " . ($params->name ?? 'N/A') . "\n" .
                         "Email: " . $params->email . "\n\n" .
                         "Nachricht:\n" . $params->message
    ];

    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'api-key: ' . $apiKey,
        'Content-Type: application/json',
        'accept: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); 

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code($httpCode);
        echo $response; 
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Daten unvollständig"]);
}
?>