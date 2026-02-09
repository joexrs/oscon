<?php
/**
 * Archivo de Configuración de Seguridad
 * OSCON - Fabricación y Soldadura Industrial
 */

// Iniciar sesión de manera segura
if (session_status() === PHP_SESSION_NONE) {
    // Configuración segura de sesión
    ini_set('session.cookie_httponly', 1);
    ini_set('session.cookie_secure', 1); // Solo en HTTPS
    ini_set('session.use_strict_mode', 1);
    ini_set('session.cookie_samesite', 'Strict');
    session_start();
}

// Regenerar ID de sesión para prevenir session fixation
if (!isset($_SESSION['initiated'])) {
    session_regenerate_id(true);
    $_SESSION['initiated'] = true;
}

// Headers de Seguridad
header("X-Frame-Options: SAMEORIGIN");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection: 1; mode=block");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Permissions-Policy: geolocation=(), microphone=(), camera=()");

// Solo en producción, habilitar HSTS
// header("Strict-Transport-Security: max-age=31536000; includeSubDomains");

/**
 * Genera un token CSRF y lo almacena en la sesión
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Valida el token CSRF
 */
function validateCSRFToken($token) {
    if (!isset($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Sanitiza datos de entrada
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Valida email
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Valida teléfono (formato mexicano)
 */
function validatePhone($phone) {
    $phone = preg_replace('/[^0-9]/', '', $phone);
    return (strlen($phone) >= 10 && strlen($phone) <= 15);
}

/**
 * Protección contra XSS
 */
function escapeOutput($data) {
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

/**
 * Rate limiting básico (prevenir spam)
 */
function checkRateLimit($action, $maxAttempts = 5, $timeWindow = 300) {
    $key = 'rate_limit_' . $action . '_' . $_SERVER['REMOTE_ADDR'];
    
    if (!isset($_SESSION[$key])) {
        $_SESSION[$key] = [
            'attempts' => 1,
            'first_attempt' => time()
        ];
        return true;
    }
    
    $timePassed = time() - $_SESSION[$key]['first_attempt'];
    
    if ($timePassed > $timeWindow) {
        // Resetear contador
        $_SESSION[$key] = [
            'attempts' => 1,
            'first_attempt' => time()
        ];
        return true;
    }
    
    if ($_SESSION[$key]['attempts'] >= $maxAttempts) {
        return false;
    }
    
    $_SESSION[$key]['attempts']++;
    return true;
}

/**
 * Configuración de base de datos (ejemplo)
 * IMPORTANTE: En producción, usar variables de entorno
 */
define('DB_HOST', 'localhost');
define('DB_NAME', 'oscon_db');
define('DB_USER', 'oscon_user');
define('DB_PASS', 'CAMBIAR_EN_PRODUCCION'); // Usar variables de entorno

/**
 * Configuración de correo (ejemplo)
 */
define('CONTACT_EMAIL', 'contacto@oscon.com');
define('ADMIN_EMAIL', 'admin@oscon.com');

/**
 * Configuración de reCAPTCHA (opcional)
 * Registrarse en: https://www.google.com/recaptcha/admin
 */
define('RECAPTCHA_SITE_KEY', '');
define('RECAPTCHA_SECRET_KEY', '');

/**
 * Modo de desarrollo/producción
 */
define('DEVELOPMENT_MODE', true); // Cambiar a false en producción

if (DEVELOPMENT_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/../logs/php-errors.log');
}
