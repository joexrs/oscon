<?php
require_once 'includes/config.php';

$pageTitle = 'Nosotros - Oscon';
$pageDescription = 'Conoce más sobre OSCON, empresa líder en fabricación y soldadura industrial con más de 20 años de experiencia';

include 'includes/header.php';
?>

    <!-- Sección Nosotros -->
    <section class="about-section" id="nosotros">
        <div class="container">
            <div class="section-header-centered">
                <h1 class="section-title">Sobre Nosotros</h1>
                <p class="section-subtitle">Más de 20 años de excelencia en fabricación y soldadura</p>
            </div>

            <div class="about-grid">
                <div class="about-content">
                    <h2 class="section-title">Nuestra Historia</h2>
                    <p class="about-text">
                        En <strong>OSCON</strong>, somos especialistas en fabricación y soldadura industrial con más de
                        20 años de experiencia en el mercado. Fundada en el año 2000, nuestra empresa nació con el objetivo
                        de ofrecer soluciones de alta calidad que superen las expectativas de nuestros clientes.
                    </p>
                    <p class="about-text">
                        Contamos con un equipo altamente capacitado y certificado, además de equipos de última generación
                        que nos permiten garantizar la excelencia en cada proyecto.
                    </p>
                </div>
                <div class="about-image">
                    <div class="image-placeholder">
                        <i class="fas fa-industry"></i>
                    </div>
                </div>
            </div>

            <div class="about-features">
                <div class="feature-item">
                    <i class="fas fa-certificate"></i>
                    <div>
                        <strong>Certificación</strong>
                        <span>Procesos certificados</span>
                    </div>
                </div>
                <div class="feature-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <strong>Entregas a tiempo</strong>
                        <span>Cumplimos plazos</span>
                    </div>
                </div>
                <div class="feature-item">
                    <i class="fas fa-shield-alt"></i>
                    <div>
                        <strong>Garantía</strong>
                        <span>Calidad garantizada</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php include 'includes/footer.php'; ?>
