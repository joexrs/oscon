<?php
require_once 'includes/config.php';

$pageTitle = 'Oscon - Fabricación y Soldadura Industrial';
$pageDescription = 'Oscon - Servicios profesionales de fabricación y soldadura industrial con más de 20 años de experiencia';

include 'includes/header.php';
?>

    <!-- Hero Section -->
    <section class="hero" id="inicio">
        <div class="hero-background"></div>
        <div class="container hero-content">
            <h1 class="hero-title">
                Excelencia en
                <span class="gradient-text">Fabricación y Soldadura</span>
            </h1>
            <p class="hero-subtitle">
                Más de 20 años transformando el metal en soluciones industriales de alta calidad
            </p>
            <div class="hero-buttons">
                <button class="btn btn-primary" onclick="window.location.href='servicios.php'">
                    <i class="fas fa-tools"></i>
                    Ver Servicios
                </button>
                <button class="btn btn-outline" onclick="window.location.href='contacto.php'">
                    <i class="fas fa-phone"></i>
                    Contactar
                </button>
            </div>

            <div class="hero-stats">
                <div class="stat-card">
                    <i class="fas fa-award"></i>
                    <span class="stat-number">20+</span>
                    <span class="stat-label">Años Experiencia</span>
                </div>
                <div class="stat-card">
                    <i class="fas fa-project-diagram"></i>
                    <span class="stat-number">500+</span>
                    <span class="stat-label">Proyectos Realizados</span>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Satisfacción</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Preview de Servicios -->
    <section class="services-section" id="servicios-preview">
        <div class="container">
            <div class="section-header-centered">
                <h2 class="section-title">Nuestros Servicios</h2>
                <p class="section-subtitle">Soluciones integrales para la industria</p>
            </div>

            <div class="services-grid">
                <!-- Card de Fabricación -->
                <div class="service-card" data-service="fabricacion">
                    <div class="service-icon">
                        <i class="fas fa-hammer"></i>
                    </div>
                    <div class="service-content">
                        <h3>Fabricación</h3>
                        <p>Fabricación de estructuras metálicas, tanques industriales, escaleras, barandales y todo tipo
                            de trabajos en metal a medida.</p>
                        <ul class="service-features">
                            <li><i class="fas fa-check"></i> Estructuras metálicas</li>
                            <li><i class="fas fa-check"></i> Tanques industriales</li>
                            <li><i class="fas fa-check"></i> Escaleras y barandales</li>
                            <li><i class="fas fa-check"></i> Trabajos personalizados</li>
                        </ul>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-primary" onclick="window.location.href='fabricacion.php'">
                            <i class="fas fa-arrow-right"></i>
                            Ver Más
                        </button>
                        <button class="btn btn-outline"
                            onclick="window.location.href='catalogo.html?servicio=fabricacion'">
                            <i class="fas fa-folder-open"></i>
                            Ver Catálogo
                        </button>
                    </div>
                </div>

                <!-- Card de Soldadura -->
                <div class="service-card" data-service="soldadura">
                    <div class="service-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                    <div class="service-content">
                        <h3>Soldadura</h3>
                        <p>Servicios especializados de soldadura MIG, TIG, arco eléctrico y soldadura de precisión para
                            todo tipo de metales y aplicaciones.</p>
                        <ul class="service-features">
                            <li><i class="fas fa-check"></i> Soldadura MIG/MAG</li>
                            <li><i class="fas fa-check"></i> Soldadura TIG</li>
                            <li><i class="fas fa-check"></i> Arco eléctrico</li>
                            <li><i class="fas fa-check"></i> Soldadura especializada</li>
                        </ul>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-primary" onclick="window.location.href='soldadura.php'">
                            <i class="fas fa-arrow-right"></i>
                            Ver Más
                        </button>
                        <button class="btn btn-outline"
                            onclick="window.location.href='catalogo.html?servicio=soldadura'">
                            <i class="fas fa-folder-open"></i>
                            Ver Catálogo
                        </button>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 3rem;">
                <button class="btn btn-primary" onclick="window.location.href='servicios.php'">
                    <i class="fas fa-tools"></i>
                    Ver Todos los Servicios
                </button>
            </div>
        </div>
    </section>

    <!-- Sección Nosotros (Preview) -->
    <section class="about-section" id="nosotros-preview">
        <div class="container">
            <div class="about-grid">
                <div class="about-content">
                    <h2 class="section-title">Sobre Nosotros</h2>
                    <p class="about-text">
                        En <strong>OSCON</strong>, somos especialistas en fabricación y soldadura industrial con más de
                        20 años de experiencia en el mercado. Nuestro compromiso es ofrecer soluciones de alta calidad
                        que superen las expectativas de nuestros clientes.
                    </p>
                    <p class="about-text">
                        Contamos con un equipo altamente capacitado y equipos de última generación para garantizar la
                        excelencia en cada proyecto, desde los más pequeños hasta los más complejos.
                    </p>
                    <div style="margin-top: 2rem;">
                        <button class="btn btn-primary" onclick="window.location.href='nosotros.php'">
                            <i class="fas fa-info-circle"></i>
                            Conocer Más
                        </button>
                    </div>
                </div>
                <div class="about-image">
                    <div class="image-placeholder">
                        <i class="fas fa-industry"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php include 'includes/footer.php'; ?>
