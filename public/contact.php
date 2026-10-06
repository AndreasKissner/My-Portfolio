<?php
declare(strict_types=1);

/**
 * Kontaktformular-Backend: JSON-POST -> Pruefung -> SMTP ueber IONOS.
 * Aufbau, Antwortcodes und Hintergruende: email.md im Projekt.
 *
 * Reihenfolge (billige Pruefungen zuerst, Datei-I/O und SMTP erst bei gueltiger Eingabe):
 * Methode -> Origin -> Groesse/JSON -> Honeypot/Ausfuelldauer -> Validierung
 * -> Konfiguration -> Rate-Limit -> Mail an den Besitzer -> Bestaetigung an den Besucher
 */

const ALLOWED_ORIGINS = [
    'https://andreas-kissner.cloud',
    'https://www.andreas-kissner.cloud',
];
const RECIPIENT_EMAIL = 'developer@andreas-kissner.cloud';
const SITE_HOST = 'andreas-kissner.cloud';
const OWNER_NAME = 'Andreas Kissner';

const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600;
const MIN_FILL_MS = 3000;

const MAX_NAME = 80;
const MAX_EMAIL = 120;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 2000;
const MAX_BODY_BYTES = 16384;

ini_set('display_errors', '0');
error_reporting(E_ALL);
date_default_timezone_set('Europe/Zurich');

set_exception_handler(static function (Throwable $e): void {
    error_log('contact: unhandled ' . get_class($e) . ': ' . $e->getMessage());
    respond(500, ['error' => 'server_error']);
});

// 1. Nur POST
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'method_not_allowed']);
}

// 2. Origin (faellt auf Referer zurueck, wenn kein Origin-Header gesendet wird)
if (!in_array(requestOrigin(), ALLOWED_ORIGINS, true)) {
    respond(403, ['error' => 'forbidden_origin']);
}

// 3. Groesse und JSON
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    respond(413, ['error' => 'too_large']);
}
$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false) {
    respond(400, ['error' => 'invalid_json']);
}
if (strlen($raw) > MAX_BODY_BYTES) {
    respond(413, ['error' => 'too_large']);
}
try {
    $payload = json_decode($raw, true, 8, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    respond(400, ['error' => 'invalid_json']);
}
if (!is_array($payload) || ($payload !== [] && array_keys($payload) === range(0, count($payload) - 1))) {
    respond(400, ['error' => 'invalid_json']);
}

// 4. Honeypot und Mindest-Ausfuelldauer: Bots bekommen ein falsches "ok", es wird nichts gesendet
if (($payload['hp_extra'] ?? '') !== '') {
    respond(200, ['status' => 'ok']);
}
$elapsed = $payload['elapsed'] ?? null;
if ((!is_int($elapsed) && !is_float($elapsed)) || $elapsed < MIN_FILL_MS) {
    respond(200, ['status' => 'ok']);
}

// 5. Validierung
$name = cleanText($payload['name'] ?? null, false);
$email = cleanText($payload['email'] ?? null, false);
$message = cleanText($payload['message'] ?? null, true);
$lang = ($payload['lang'] ?? 'en') === 'de' ? 'de' : 'en';

$invalid = [];
if ($name === null || textLength($name) < 1 || textLength($name) > MAX_NAME) {
    $invalid[] = 'name';
}
if ($email === null || textLength($email) > MAX_EMAIL || !isValidEmail($email)) {
    $invalid[] = 'email';
}
if ($message === null || textLength($message) < MIN_MESSAGE || textLength($message) > MAX_MESSAGE) {
    $invalid[] = 'message';
}
if ($invalid !== []) {
    respond(422, ['error' => 'validation_failed', 'fields' => $invalid]);
}

// 6. Konfiguration (Zugangsdaten liegen nur auf dem Server)
$configPath = __DIR__ . '/smtp-config.php';
$config = is_file($configPath) ? require $configPath : null;
if (!is_array($config)) {
    error_log('contact: smtp-config.php fehlt oder ist ungueltig');
    respond(500, ['error' => 'server_config']);
}
foreach (['host', 'port', 'username', 'password', 'salt'] as $key) {
    if (empty($config[$key])) {
        error_log("contact: smtp-config.php enthaelt '$key' nicht");
        respond(500, ['error' => 'server_config']);
    }
}
$smtp = [
    'host' => (string) $config['host'],
    'port' => (int) $config['port'],
    'username' => (string) $config['username'],
    'password' => (string) $config['password'],
    'verify_tls' => ($config['verify_tls'] ?? true) !== false,
];
$salt = (string) $config['salt'];

// 7. Rate-Limit pro IP
if (rateLimitExceeded($salt)) {
    respond(429, ['error' => 'rate_limited']);
}

// 8. Mail an den Besitzer (Reply-To = Besucher)
$ownerBody = "Neue Nachricht über das Kontaktformular\n\n"
    . "Name:     $name\n"
    . "E-Mail:   $email\n"
    . 'Sprache:  ' . strtoupper($lang) . "\n"
    . 'Zeit:     ' . date('Y-m-d H:i:s T') . "\n\n"
    . "Nachricht:\n$message\n";

try {
    sendMail(
        $smtp,
        RECIPIENT_EMAIL,
        'Kontaktformular ' . SITE_HOST,
        'Neue Nachricht von ' . truncateText($name, 30),
        $ownerBody,
        $email
    );
} catch (Throwable $e) {
    error_log('contact: Mail an Besitzer fehlgeschlagen: ' . $e->getMessage());
    respond(502, ['error' => 'send_failed']);
}

// 9. Bestaetigung an den Besucher (best effort, aendert die Antwort nie)
try {
    $text = confirmationText($lang, $name);
    sendMail(
        $smtp,
        $email,
        OWNER_NAME,
        $text['subject'],
        $text['body'],
        RECIPIENT_EMAIL,
        ['Auto-Submitted: auto-generated']
    );
} catch (Throwable $e) {
    error_log('contact: Bestaetigungsmail fehlgeschlagen: ' . $e->getMessage());
}

respond(200, ['status' => 'ok']);

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

function respond(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($body);
    exit;
}

function requestOrigin(): string
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '') {
        return strtolower($origin);
    }
    $parts = parse_url($_SERVER['HTTP_REFERER'] ?? '');
    if (!is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
        return '';
    }
    return strtolower($parts['scheme'] . '://' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : ''));
}

/**
 * Prueft und bereinigt einen Text. Gibt null zurueck, wenn er ungueltig ist.
 * Einzeilige Felder lehnen alle Steuerzeichen ab (Schutz vor Header-Injection),
 * mehrzeilige behalten nur Zeilenumbruch und Tab.
 */
function cleanText($value, bool $multiline): ?string
{
    if (!is_string($value) || preg_match('//u', $value) !== 1) {
        return null;
    }
    // unsichtbare und bidirektionale Zeichen entfernen
    $value = preg_replace('/[\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2060}-\x{2064}\x{2066}-\x{2069}\x{FEFF}]/u', '', $value);
    if ($value === null) {
        return null;
    }
    if ($multiline) {
        $value = str_replace(["\r\n", "\r"], "\n", $value);
        $value = preg_replace('/[^\P{Cc}\n\t]/u', '', $value);
        if ($value === null) {
            return null;
        }
    } elseif (preg_match('/[\x00-\x1F\x7F\x{0080}-\x{009F}\x{2028}\x{2029}]/u', $value) === 1) {
        return null;
    }
    return trim($value);
}

function textLength(string $text): int
{
    return (int) preg_match_all('/./us', $text);
}

function truncateText(string $text, int $max): string
{
    $chars = preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY);
    return $chars === false || count($chars) <= $max ? $text : implode('', array_slice($chars, 0, $max));
}

function isValidEmail(string $email): bool
{
    return $email !== ''
        && preg_match('/[\s<>,;"\\\\]/', $email) !== 1
        && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function confirmationText(string $lang, string $name): array
{
    if ($lang === 'de') {
        return [
            'subject' => 'Danke für die Nachricht',
            'body' => "Hallo $name,\n\n"
                . "ich werde mich so schnell wie möglich mit dir in Verbindung setzen.\n"
                . "Solltest du mich nicht kontaktiert haben, sehe diese Email als erledigt.\n\n"
                . "Viele Grüße\n" . OWNER_NAME . "\n",
        ];
    }
    return [
        'subject' => 'Thank you for your message',
        'body' => "Hello $name,\n\n"
            . "I will get back to you as soon as possible.\n"
            . "If you don't hear back from me soon, feel free to reach out again.\n\n"
            . "Best regards\n" . OWNER_NAME . "\n",
    ];
}

/**
 * Rate-Limit: JSON-Datei mit flock. IPs werden nur als HMAC gespeichert.
 * Faellt offen aus, wenn die Datei nicht beschreibbar ist, damit das Formular
 * nicht wegen Dateirechten stirbt.
 */
function rateLimitExceeded(string $salt): bool
{
    $path = __DIR__ . '/.contact-rate-limit.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false) {
        error_log('contact: Rate-Limit-Datei nicht beschreibbar');
        return false;
    }
    try {
        if (!flock($handle, LOCK_EX)) {
            error_log('contact: Rate-Limit-Datei nicht sperrbar');
            return false;
        }
        $data = json_decode((string) stream_get_contents($handle), true);
        if (!is_array($data)) {
            $data = [];
        }
        $now = time();
        foreach ($data as $key => $stamps) {
            $fresh = array_values(array_filter(
                is_array($stamps) ? $stamps : [],
                static fn($t) => is_int($t) && $t > $now - RATE_LIMIT_WINDOW_SECONDS
            ));
            if ($fresh === []) {
                unset($data[$key]);
            } else {
                $data[$key] = $fresh;
            }
        }
        $key = hash_hmac('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), $salt);
        $exceeded = count($data[$key] ?? []) >= RATE_LIMIT_MAX_REQUESTS;
        if (!$exceeded) {
            $data[$key][] = $now;
        }
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode($data));
        fflush($handle);
        flock($handle, LOCK_UN);
        return $exceeded;
    } finally {
        fclose($handle);
    }
}

// ---------------------------------------------------------------------------
// Mailversand ueber SMTP (STARTTLS, AUTH LOGIN), ohne mail() und ohne Bibliothek
// ---------------------------------------------------------------------------

function sendMail(array $smtp, string $to, string $fromName, string $subject, string $body, string $replyTo, array $extraHeaders = []): void
{
    $headers = array_merge([
        'Date: ' . date('r'),
        'From: ' . formatAddress($fromName, $smtp['username']),
        'To: <' . $to . '>',
        'Reply-To: <' . $replyTo . '>',
        'Subject: ' . encodeHeader($subject),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . SITE_HOST . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ], $extraHeaders);

    $message = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body), 76, "\r\n");
    $message = preg_replace('/^\./m', '..', rtrim($message, "\r\n"));

    $context = stream_context_create(['ssl' => [
        'verify_peer' => $smtp['verify_tls'],
        'verify_peer_name' => $smtp['verify_tls'],
        'peer_name' => $smtp['host'],
        'allow_self_signed' => !$smtp['verify_tls'],
    ]]);
    $socket = @stream_socket_client(
        'tcp://' . $smtp['host'] . ':' . $smtp['port'],
        $errno,
        $errstr,
        10,
        STREAM_CLIENT_CONNECT,
        $context
    );
    if ($socket === false) {
        throw new RuntimeException("SMTP: Verbindung fehlgeschlagen ($errno)");
    }
    stream_set_timeout($socket, 15);

    try {
        [$code] = smtpRead($socket);
        if ($code !== 220) {
            throw new RuntimeException("SMTP: unerwartete Begruessung ($code)");
        }
        smtpCommand($socket, 'EHLO ' . SITE_HOST, [250], 'EHLO');
        smtpCommand($socket, 'STARTTLS', [220], 'STARTTLS');
        if (stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) {
            throw new RuntimeException('SMTP: TLS-Handshake fehlgeschlagen');
        }
        smtpCommand($socket, 'EHLO ' . SITE_HOST, [250], 'EHLO (TLS)');
        smtpCommand($socket, 'AUTH LOGIN', [334], 'AUTH LOGIN');
        smtpCommand($socket, base64_encode($smtp['username']), [334], 'AUTH Benutzer');
        smtpCommand($socket, base64_encode($smtp['password']), [235], 'AUTH Passwort');
        smtpCommand($socket, 'MAIL FROM:<' . $smtp['username'] . '>', [250], 'MAIL FROM');
        smtpCommand($socket, 'RCPT TO:<' . $to . '>', [250, 251], 'RCPT TO');
        smtpCommand($socket, 'DATA', [354], 'DATA');
        smtpWrite($socket, $message . "\r\n.\r\n");
        [$code] = smtpRead($socket);
        if ($code !== 250) {
            throw new RuntimeException("SMTP: Nachricht abgelehnt ($code)");
        }
        @fwrite($socket, "QUIT\r\n");
    } finally {
        fclose($socket);
    }
}

/** Liest eine (ggf. mehrzeilige) SMTP-Antwort und gibt [Code, Text] zurueck. */
function smtpRead($socket): array
{
    $text = '';
    do {
        $line = fgets($socket, 1024);
        if ($line === false) {
            throw new RuntimeException('SMTP: Verbindung unterbrochen oder Zeitueberschreitung');
        }
        $text .= $line;
    } while (isset($line[3]) && $line[3] === '-');
    return [(int) substr($text, 0, 3), $text];
}

/** Sendet einen Befehl und prueft den Antwortcode. Die Befehle selbst werden nie geloggt (Zugangsdaten). */
function smtpCommand($socket, string $command, array $okCodes, string $label): void
{
    smtpWrite($socket, $command . "\r\n");
    [$code] = smtpRead($socket);
    if (!in_array($code, $okCodes, true)) {
        throw new RuntimeException("SMTP: $label abgelehnt ($code)");
    }
}

function smtpWrite($socket, string $data): void
{
    $length = strlen($data);
    $written = 0;
    while ($written < $length) {
        $n = @fwrite($socket, substr($data, $written));
        if ($n === false || $n === 0) {
            throw new RuntimeException('SMTP: Schreiben fehlgeschlagen');
        }
        $written += $n;
    }
}

/** Anzeigename plus Adresse. Namen stammen nur aus Konstanten, nie aus Benutzereingaben. */
function formatAddress(string $name, string $email): string
{
    $display = preg_match('/^[\x20-\x7E]*$/', $name) === 1
        ? '"' . addcslashes($name, '"\\') . '"'
        : encodeHeader($name);
    return $display . ' <' . $email . '>';
}

/** RFC 2047: nicht-ASCII-Text in Encoded-Words (Base64) aufteilen, damit keine Zeile zu lang wird. */
function encodeHeader(string $value): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $value) === 1) {
        return $value;
    }
    $words = [];
    $current = '';
    foreach (preg_split('//u', $value, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $char) {
        if (strlen($current) + strlen($char) > 42) {
            $words[] = $current;
            $current = '';
        }
        $current .= $char;
    }
    if ($current !== '') {
        $words[] = $current;
    }
    return implode("\r\n ", array_map(
        static fn($word) => '=?UTF-8?B?' . base64_encode($word) . '?=',
        $words
    ));
}
