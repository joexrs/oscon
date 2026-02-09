# OSCON - Sitio Web Corporativo

## Estructura del Proyecto

```
Oscon/
├── includes/
│   ├── header.php          # Header separado con navegación
│   ├── footer.php          # Footer separado
│   └── config.php          # Configuración y funciones de seguridad
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── index.php               # Página principal
├── servicios.php           # Página de servicios
├── fabricacion.php         # Página de servicio de fabricación
├── soldadura.php           # Página de servicio de soldadura
├── nosotros.php            # Página sobre nosotros
├── contacto.php            # Página de contacto con formulario seguro
├── catalogo.html           # Catálogo de productos
├── .htaccess               # Configuración de seguridad Apache
└── README_SEGURIDAD.md     # Este archivo
```

## Características de Seguridad Implementadas

### 1. Headers de Seguridad HTTP
- **X-Frame-Options**: Previene clickjacking
- **X-Content-Type-Options**: Previene MIME type sniffing
- **X-XSS-Protection**: Protección contra XSS
- **Content-Security-Policy**: Control de recursos permitidos
- **Referrer-Policy**: Control de información de referencia
- **Permissions-Policy**: Restricción de APIs del navegador

### 2. Protección CSRF (Cross-Site Request Forgery)
- Token CSRF generado para cada sesión
- Validación de token en todos los formularios
- Función `generateCSRFToken()` y `validateCSRFToken()` en config.php

### 3. Sanitización y Validación de Datos
- Todas las entradas de usuario son sanitizadas con `sanitizeInput()`
- Validación de email con `validateEmail()`
- Validación de teléfono con `validatePhone()`
- Protección contra XSS con `escapeOutput()`

### 4. Rate Limiting
- Límite de intentos para formularios de contacto
- Prevención de spam y ataques de fuerza bruta
- Función `checkRateLimit()` configurable

### 5. Configuración Segura de Sesiones
- HttpOnly cookies (previene acceso via JavaScript)
- Secure cookies (solo HTTPS)
- Strict mode habilitado
- SameSite=Strict
- Regeneración de ID de sesión periódica

### 6. Protección de Archivos .htaccess
- Bloqueo de acceso a archivos de configuración
- Prevención de listado de directorios
- Protección contra inyección SQL en URLs
- Protección contra hotlinking de imágenes
- Límites de tamaño de upload

### 7. Separación de Responsabilidades
- Header y footer en archivos separados
- Configuración centralizada en config.php
- Páginas individuales para cada sección
- Código modular y mantenible

## Configuración Requerida

### 1. Configuración de PHP (php.ini)
```ini
display_errors = Off
log_errors = On
error_log = /path/to/logs/php-errors.log
expose_php = Off
session.cookie_httponly = 1
session.cookie_secure = 1
session.use_strict_mode = 1
session.cookie_samesite = Strict
```

### 2. Habilitar mod_rewrite en Apache
```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```

### 3. Crear directorio de logs
```bash
mkdir logs
chmod 755 logs
```

### 4. Configurar Variables de Entorno (Producción)
En lugar de hardcodear credenciales en config.php, usar variables de entorno:

```php
define('DB_HOST', getenv('DB_HOST'));
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASS', getenv('DB_PASS'));
```

## Checklist de Seguridad para Producción

- [ ] Cambiar `DEVELOPMENT_MODE` a `false` en config.php
- [ ] Configurar credenciales reales de base de datos
- [ ] Habilitar redirección HTTPS en .htaccess
- [ ] Configurar certificado SSL/TLS
- [ ] Habilitar HSTS (HTTP Strict Transport Security)
- [ ] Configurar copias de seguridad automáticas
- [ ] Revisar y actualizar dependencias
- [ ] Configurar firewall de aplicación web (WAF)
- [ ] Implementar monitoreo de logs
- [ ] Configurar límites de rate limiting apropiados
- [ ] Revisar permisos de archivos y directorios
- [ ] Implementar reCAPTCHA en formularios (opcional pero recomendado)

## Permisos de Archivos Recomendados

```bash
# Archivos PHP
chmod 644 *.php
chmod 644 includes/*.php

# Archivos de configuración
chmod 600 includes/config.php

# Directorios
chmod 755 assets/
chmod 755 includes/

# .htaccess
chmod 644 .htaccess

# Logs (debe ser escribible por el servidor web)
chmod 755 logs/
```

## Funciones de Seguridad Disponibles

### generateCSRFToken()
Genera un token CSRF único para la sesión actual.

```php
$token = generateCSRFToken();
```

### validateCSRFToken($token)
Valida un token CSRF recibido.

```php
if (validateCSRFToken($_POST['csrf_token'])) {
    // Token válido
}
```

### sanitizeInput($data)
Limpia datos de entrada eliminando caracteres peligrosos.

```php
$cleanData = sanitizeInput($_POST['input']);
```

### validateEmail($email)
Valida formato de email.

```php
if (validateEmail($email)) {
    // Email válido
}
```

### validatePhone($phone)
Valida formato de teléfono.

```php
if (validatePhone($phone)) {
    // Teléfono válido
}
```

### escapeOutput($data)
Escapa datos para salida HTML segura.

```php
echo escapeOutput($userData);
```

### checkRateLimit($action, $maxAttempts, $timeWindow)
Verifica límites de intentos.

```php
if (checkRateLimit('contact_form', 5, 300)) {
    // Permitir acción
} else {
    // Bloquear por límite excedido
}
```

## Páginas del Sitio

1. **index.php** - Página principal con hero section y preview de servicios
2. **servicios.php** - Listado completo de todos los servicios
3. **fabricacion.php** - Detalles del servicio de fabricación
4. **soldadura.php** - Detalles del servicio de soldadura
5. **nosotros.php** - Información sobre la empresa
6. **contacto.php** - Formulario de contacto seguro
7. **catalogo.html** - Catálogo de productos (HTML estático)

## Mejoras Futuras Recomendadas

1. Implementar autenticación de dos factores (2FA) para área de administración
2. Agregar reCAPTCHA v3 en formularios
3. Implementar sistema de logs más robusto
4. Configurar WAF (Web Application Firewall)
5. Implementar sistema de detección de intrusos (IDS)
6. Agregar monitoreo de seguridad automatizado
7. Implementar Content Security Policy más restrictivo
8. Configurar backup automatizado
9. Implementar sistema de notificaciones de seguridad

## Mantenimiento

- Revisar logs de errores regularmente: `logs/php-errors.log`
- Actualizar dependencias y frameworks
- Realizar auditorías de seguridad periódicas
- Mantener copias de seguridad actualizadas
- Revisar y actualizar políticas de seguridad

## Soporte

Para preguntas o problemas de seguridad, contactar a:
- Email: admin@oscon.com
- Seguridad: security@oscon.com

---

**Última actualización**: 2026-02-09
**Versión**: 1.0.0
