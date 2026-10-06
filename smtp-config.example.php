<?php
// Vorlage. Kopiere diese Datei nach smtp-config.php und trage die echten Werte ein.
// smtp-config.php gehoert NIE ins Git (steht in .gitignore) und wird nur auf dem
// Server neben contact.php abgelegt.
return [
    'host' => 'smtp.ionos.de',
    'port' => 587,
    'username' => 'postfach@example.com',      // Postfach bei IONOS, gleichzeitig Absender-Adresse
    'password' => 'POSTFACH-PASSWORT',         // Passwort des Postfachs, NICHT das Hosting-Login
    'salt' => 'LANGER-ZUFAELLIGER-TEXT',       // zum Hashen der IPs beim Rate-Limit
    // 'verify_tls' => false,                  // nur wenn die Zertifikatskette des Hosts kaputt ist
];
