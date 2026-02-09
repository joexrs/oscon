<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo isset($pageDescription) ? htmlspecialchars($pageDescription) : 'Oscon - Servicios profesionales de fabricación y soldadura industrial'; ?>">
    <meta name="keywords" content="fabricación, soldadura, industrial, metal, manufactura">
    
    <!-- Seguridad: Prevención de clickjacking -->
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    
    <!-- Seguridad: Content Security Policy básico -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com">
    
    <!-- Seguridad: Prevención de MIME type sniffing -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    
    <!-- Seguridad: Referrer Policy -->
    <meta name="referrer" content="strict-origin-when-cross-origin">
    
    <title><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) : 'Oscon - Fabricación y Soldadura Industrial'; ?></title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap"
        rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">

    <!-- Estilos -->
    <link rel="stylesheet" href="assets/css/main.css">
</head>

<body>
    <!-- Navegación -->
    <nav class="navbar">
        <div class="container nav-container">
            <div class="logo">
                <i class="fas fa-industry"></i>
                <span class="logo-text">OS<span class="accent">CON</span></span>
            </div>

            <ul class="nav-menu" id="navMenu">
                <li><a href="index.php" class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'active' : ''; ?>">Inicio</a></li>
                <li class="nav-dropdown">
                    <a href="servicios.php" class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'servicios.php') ? 'active' : ''; ?>">
                        Servicios
                        <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu">
                        <a href="fabricacion.php" class="dropdown-item">
                            <i class="fas fa-hammer"></i>
                            <div>
                                <strong>Fabricación</strong>
                                <span>Estructuras metálicas</span>
                            </div>
                        </a>
                        <a href="soldadura.php" class="dropdown-item">
                            <i class="fas fa-fire"></i>
                            <div>
                                <strong>Soldadura</strong>
                                <span>Soldadura especializada</span>
                            </div>
                        </a>
                    </div>
                </li>
                <li><a href="nosotros.php" class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'nosotros.php') ? 'active' : ''; ?>">Nosotros</a></li>
                <li><a href="contacto.php" class="nav-link <?php echo (basename($_SERVER['PHP_SELF']) == 'contacto.php') ? 'active' : ''; ?>">Contacto</a></li>
            </ul>

            <div class="nav-actions">
                <button class="btn btn-outline" id="adminBtn" onclick="window.location.href='admin/login.php'">
                    <i class="fas fa-lock"></i>
                    Admin
                </button>
                <button class="nav-toggle" id="navToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </nav>
