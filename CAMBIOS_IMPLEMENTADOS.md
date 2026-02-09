# 🔒 OSCON - Refactorización y Mejoras de Seguridad

## ✅ Cambios Implementados

### 📁 1. Separación de Header y Footer

**Archivos creados:**
- `includes/header.php` - Header con navegación y meta tags de seguridad
- `includes/footer.php` - Footer reutilizable
- `includes/config.php` - Configuración centralizada y funciones de seguridad

**Beneficios:**
- ✓ Código modular y mantenible
- ✓ Actualización centralizada de navegación y footer
- ✓ Menor duplicación de código

### 🌐 2. Páginas Individuales Creadas

| Página | Archivo | Descripción |
|--------|---------|-------------|
| Inicio | `index.php` | Página principal con hero y preview |
| Servicios | `servicios.php` | Listado completo de servicios |
| Fabricación | `fabricacion.php` | Detalles de servicios de fabricación |
| Soldadura | `soldadura.php` | Detalles de servicios de soldadura |
| Nosotros | `nosotros.php` | Información de la empresa |
| Contacto | `contacto.php` | Formulario de contacto seguro |

**Beneficios:**
- ✓ Separación clara de contenido
- ✓ Mejor SEO (cada página con su propio título y descripción)
- ✓ URLs amigables
- ✓ Mantenimiento más fácil

### 🔐 3. Mejoras de Seguridad Implementadas

#### A. Headers de Seguridad HTTP
```
✓ X-Frame-Options: SAMEORIGIN
✓ X-Content-Type-Options: nosniff
✓ X-XSS-Protection: 1; mode=block
✓ Content-Security-Policy
✓ Referrer-Policy
✓ Permissions-Policy
```

#### B. Protección CSRF
- ✓ Generación de tokens únicos por sesión
- ✓ Validación en todos los formularios
- ✓ Prevención de ataques CSRF

#### C. Sanitización de Datos
- ✓ Función `sanitizeInput()` para limpiar entradas
- ✓ Función `escapeOutput()` para salidas seguras
- ✓ Validación de email y teléfono
- ✓ Protección contra XSS

#### D. Rate Limiting
- ✓ Límite de 3 intentos cada 10 minutos en formulario de contacto
- ✓ Prevención de spam
- ✓ Protección contra fuerza bruta

#### E. Sesiones Seguras
```php
session.cookie_httponly = 1  // Previene acceso via JS
session.cookie_secure = 1    // Solo HTTPS
session.use_strict_mode = 1  // Modo estricto
session.cookie_samesite = Strict
```

#### F. Archivo .htaccess
- ✓ Protección de archivos sensibles
- ✓ Prevención de listado de directorios
- ✓ Protección contra inyección SQL en URLs
- ✓ Bloqueo de acceso a includes/ y logs/
- ✓ Compresión GZIP
- ✓ Cache de recursos estáticos

### 📊 Estructura del Proyecto

```
Oscon/
├── includes/
│   ├── header.php          ← Nuevo
│   ├── footer.php          ← Nuevo
│   └── config.php          ← Nuevo (Seguridad)
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── index.html              ← Original (mantener para referencia)
├── index.php               ← Nuevo
├── servicios.php           ← Nuevo
├── fabricacion.php         ← Nuevo
├── soldadura.php           ← Nuevo
├── nosotros.php            ← Nuevo
├── contacto.php            ← Nuevo (con validación)
├── catalogo.html           ← Existente
├── .htaccess               ← Nuevo (Seguridad)
└── README_SEGURIDAD.md     ← Nuevo (Documentación)
```

## 🚀 Cómo Usar

### 1. Acceder al sitio
Ahora puede acceder a:
- http://localhost/Oscon/index.php
- http://localhost/Oscon/servicios.php
- http://localhost/Oscon/fabricacion.php
- http://localhost/Oscon/soldadura.php
- http://localhost/Oscon/nosotros.php
- http://localhost/Oscon/contacto.php

### 2. Navegación
La navegación en el header ahora apunta a las páginas individuales:
- Inicio → index.php
- Servicios → servicios.php (con dropdown a fabricacion.php y soldadura.php)
- Nosotros → nosotros.php
- Contacto → contacto.php

### 3. Formulario de Contacto
El formulario ahora incluye:
- ✓ Validación del lado del servidor
- ✓ Protección CSRF
- ✓ Sanitización de datos
- ✓ Rate limiting
- ✓ Mensajes de error/éxito

## ⚙️ Configuración Requerida

### Para Desarrollo (XAMPP)
1. Asegúrate de que Apache está corriendo
2. mod_rewrite debe estar habilitado
3. Accede a http://localhost/Oscon/index.php

### Para Producción
Ver archivo `README_SEGURIDAD.md` para checklist completo:
- [ ] Cambiar DEVELOPMENT_MODE a false
- [ ] Configurar certificado SSL
- [ ] Habilitar HTTPS
- [ ] Configurar variables de entorno
- [ ] Revisar permisos de archivos

## 🛡️ Funciones de Seguridad Disponibles

| Función | Uso | Descripción |
|---------|-----|-------------|
| `generateCSRFToken()` | Token CSRF | Genera token único |
| `validateCSRFToken($token)` | Validación | Valida token CSRF |
| `sanitizeInput($data)` | Limpieza | Limpia datos de entrada |
| `validateEmail($email)` | Validación | Valida formato de email |
| `validatePhone($phone)` | Validación | Valida teléfono |
| `escapeOutput($data)` | Salida | Escapa HTML para salida |
| `checkRateLimit()` | Rate limit | Limita intentos |

## 📝 Ejemplo de Uso en Nuevas Páginas

```php
<?php
require_once 'includes/config.php';

$pageTitle = 'Mi Página - Oscon';
$pageDescription = 'Descripción de mi página';

include 'includes/header.php';
?>

<!-- Tu contenido aquí -->
<section>
    <div class="container">
        <h1>Mi Contenido</h1>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
```

## 🔍 Verificación de Seguridad

Para verificar que la seguridad está funcionando:

1. **Headers HTTP**: Usa herramientas como securityheaders.com
2. **CSRF**: Intenta enviar el formulario sin token
3. **Rate Limiting**: Intenta enviar el formulario más de 3 veces
4. **XSS**: Intenta enviar `<script>alert('test')</script>` en el formulario
5. **Acceso a includes**: Intenta acceder a http://localhost/Oscon/includes/config.php

## ⚠️ Importante

- El archivo `index.html` original se mantuvo para referencia
- Ahora debes usar `index.php` como página principal
- Todas las páginas usan PHP para incluir header/footer
- La seguridad está configurada para desarrollo, revisar para producción

## 📚 Documentación

- `README_SEGURIDAD.md` - Documentación completa de seguridad
- `includes/config.php` - Comentarios en el código de configuración

## 🎯 Próximos Pasos Recomendados

1. **Testing**: Probar todas las páginas y formularios
2. **Contenido**: Agregar contenido real a las páginas
3. **Imágenes**: Agregar imágenes reales para servicios
4. **Base de datos**: Conectar formulario a base de datos
5. **Email**: Configurar envío de emails desde el formulario
6. **reCAPTCHA**: Agregar Google reCAPTCHA al formulario
7. **Admin**: Crear área de administración

---

**Fecha de implementación**: 2026-02-09
**Desarrollador**: Antigravity AI
**Estado**: ✅ Completado
