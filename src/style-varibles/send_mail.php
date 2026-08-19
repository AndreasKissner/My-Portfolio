<?php
$allowedOrigins = [
    'https://andreas-kissner.developerakademie.net',
    'https://portfolio.andreas-kissner.cloud',
    'https://www.andreas-kissner.cloud',
    'https://andreas-kissner.cloud',
    'http://localhost:4200'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}


header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);
if ($params && isset($params->email) && isset($params->message)) {
    
   include 'config.php';
   $apiKey = $brevoKey;

    $lang = ($params->lang ?? 'en') === 'de' ? 'de' : 'en';
    $name = $params->name ?? 'Unbekannt';

    $autoresponderTexts = [
        'de' => [
            'subject' => 'Danke für die Nachricht',
            'body' => "Hallo $name,\n\nich werde mich so schnell wie möglich mit dir in Verbindung setzen.\nSolltest du mich nicht kontaktiert haben, sehe diese Email als erledigt.",
            'greeting' => "Hallo $name,",
            'line1' => "ich werde mich so schnell wie möglich mit dir in Verbindung setzen.",
            'line2' => "Solltest du mich nicht kontaktiert haben, sehe diese Email als erledigt.",
            'signature' => "Viele Grüße<br>Andreas Kissner"
        ],
        'en' => [
            'subject' => 'Thank you for your message',
            'body' => "Hello $name,\n\nI will get back to you as soon as possible.\nIf you don't hear back from me soon, feel free to reach out again.",
            'greeting' => "Hello $name,",
            'line1' => "I will get back to you as soon as possible.",
            'line2' => "If you don't hear back from me soon, feel free to reach out again.",
            'signature' => "Best regards<br>Andreas Kissner"
        ]
    ];

    $ownerHtml = "<div style='font-family: Arial, sans-serif; font-size: 15px; color: #222;'>" .
        "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>" .
        "<p><strong>Email:</strong> " . htmlspecialchars($params->email) . "</p>" .
        "<p><strong>Nachricht:</strong><br>" . nl2br(htmlspecialchars($params->message)) . "</p>" .
        "</div>";

    $ownerMail = [
        "sender" => ["name" => "Portfolio Kontakt", "email" => "kontakt@send.andreas-kissner.cloud"],
        "to" => [["email" => "andikiss500@gmail.com", "name" => "Andreas Kissner"]],
        "replyTo" => ["email" => $params->email, "name" => $name],
        "subject" => "Neue Nachricht von " . $name,
        "textContent" => "Name: " . $name . "\n" .
                         "Email: " . $params->email . "\n\n" .
                         "Nachricht:\n" . $params->message,
        "htmlContent" => $ownerHtml
    ];

    $t = $autoresponderTexts[$lang];
    $autoresponderHtml = "<div style='font-family: Arial, sans-serif; font-size: 15px; color: #222; line-height: 1.5;'>" .
        "<p>" . $t['greeting'] . "</p>" .
        "<p>" . $t['line1'] . "<br>" . $t['line2'] . "</p>" .
        "<p>" . $t['signature'] . "</p>" .
        "<hr style='border: none; border-top: 1px solid #ddd; margin: 24px 0;'>" .
        "<p style='font-size: 12px; color: #888;'>Andreas Kissner &middot; andreas-kissner.cloud</p>" .
        "</div>";

    $autoresponderMail = [
        "sender" => ["name" => "Andreas Kissner", "email" => "kontakt@send.andreas-kissner.cloud"],
        "to" => [["email" => $params->email, "name" => $name]],
        "replyTo" => ["email" => "andikiss500@googlemail.com", "name" => "Andreas Kissner"],
        "subject" => $t['subject'],
        "textContent" => $t['body'],
        "htmlContent" => $autoresponderHtml
    ];

    $sendToBrevo = function ($data) use ($apiKey) {
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

        return ['response' => $response, 'httpCode' => $httpCode];
    };

    $ownerResult = $sendToBrevo($ownerMail);
    $autoresponderResult = $sendToBrevo($autoresponderMail);

    if ($ownerResult['httpCode'] >= 200 && $ownerResult['httpCode'] < 300) {
        echo json_encode([
            "status" => "success",
            "autoresponder" => [
                "httpCode" => $autoresponderResult['httpCode'],
                "response" => json_decode($autoresponderResult['response'])
            ]
        ]);
    } else {
        http_response_code($ownerResult['httpCode']);
        echo $ownerResult['response'];
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Daten unvollständig"]);
}
?>