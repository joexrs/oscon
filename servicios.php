<?php
require_once 'includes/config.php';

$pageTitle = 'Servicios - Oscon';
$pageDescription = 'Servicios profesionales de fabricación y soldadura industrial';

include 'includes/header.php';
?>

    <!-- Sección de Servicios -->
    <section class="services-section" id="servicios">
        <div class="container">
            <div class="section-header-centered">
                <h1 class="section-title">Nuestros Servicios</h1>
                <p class="section-subtitle">Soluciones integrales para la industria</p>
            </div>

            <div class="services-grid">
                <!-- Card de Fabricación -->
                <div class="service-card" data-service="fabricacion">
                    <div class="service-icon">
                        <i class="fas fa-hammer"></i>
                    </div>
                    <div class="service-content">
                        <h2>Fabricación</h2>
                        <p>Fabricación de estructuras metálicas, tanques industriales, escaleras, barandales y todo tipo
                            de trabajos en metal a medida.</p>
                        <ul class="service-features">
                            <li><i class="fas fa-check"></i> Estructuras metálicas</li>
                            <li><i class="fas fa-check"></i> Tanques industriales</li>
                            <li><i class="fas fa-check"></i> Escaleras y barandales</li>
                            <li><i class="fas fa-check"></i> Trabajos personalizados</li>
                            <li><i class="fas fa-check"></i> Puertas y portones</li>
                            <li><i class="fas fa-check"></i> Estructuras de soporte</li>
                        </ul>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-primary" onclick="window.location.href='fabricacion.php'">
                            <i class="fas fa-arrow-right"></i>
                            Ver Detalles
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
                        <h2>Soldadura</h2>
                        <p>Servicios especializados de soldadura MIG, TIG, arco eléctrico y soldadura de precisión para
                            todo tipo de metales y aplicaciones.</p>
                        <ul class="service-features">
                            <li><i class="fas fa-check"></i> Soldadura MIG/MAG</li>
                            <li><i class="fas fa-check"></i> Soldadura TIG</li>
                            <li><i class="fas fa-check"></i> Arco eléctrico</li>
                            <li><i class="fas fa-check"></i> Soldadura especializada</li>
                            <li><i class="fas fa-check"></i> Soldadura de aluminio</li>
                            <li><i class="fas fa-check"></i> Soldadura de acero inoxidable</li>
                        </ul>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-primary" onclick="window.location.href='soldadura.php'">
                            <i class="fas fa-arrow-right"></i>
                            Ver Detalles
                        </button>
                        <button class="btn btn-outline"
                            onclick="window.location.href='catalogo.html?servicio=soldadura'">
                            <i class="fas fa-folder-open"></i>
                            Ver Catálogo
                        </button>
                    </div>
                </div>

                <!-- Card de Mantenimiento -->
                <div class="service-card" data-service="mantenimiento">
                    <div class="service-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <div class="service-content">
                        <h2>Mantenimiento Industrial</h2>
                        <p>Servicios de mantenimiento preventivo y correctivo para maquinaria industrial y estructuras metálicas.</p>
                        <ul class="service-features">
                            <li><i class="fas fa-check"></i> Mantenimiento preventivo</li>
                            <li><i class="fas fa-check"></i> Mantenimiento correctivo</li>
                            <li><i class="fas fa-check"></i> Inspección de estructuras</li>
                            <li><i class="fas fa-check"></i> Reparación de equipos</li>
                            <li><i class="fas fa-check"></i> Pintura industrial</li>
                            <li><i class="fas fa-check"></i> Protección anticorrosiva</li>
                        </ul>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-primary" onclick="window.location.href='contacto.php'">
                            <i class="fas fa-paper-plane"></i>
                            Solicitar
                        </button>
                        <button class="btn btn-outline" onclick="window.location.href='contacto.php'">
                            <i class="fas fa-phone"></i>
                            Contactar
                        </button>
                    </div>
                </div>

                <!-- Card de Diseño -->
                <div class="service-card" data-service="diseno">
                    <div class="service-icon">
                        <i class="fas fa-drafting-compass"></i>
                    </div>
                    <div class="service-content">
                        <h2>Diseño y Asesoría</h2>
                        <p>Diseño de proyectos personalizados y asesoría técnica para la optimización de sus procesos industriales.</p>
                        <ul class="service-features">
                            <li><i class="fas fa-check"></i> Diseño CAD</li>
                            <li><i class="fas fa-check"></i> Planos técnicos</li>
                            <li><i class="fas fa-check"></i> Asesoría técnica</li>
                            <li><i class="fas fa-check"></i> Optimización de procesos</li>
                            <li><i class="fas fa-check"></i> Cálculos estructurales</li>
                            <li><i class="fas fa-check"></i> Especificaciones técnicas</li>
                        </ul>
                    </div>
                    <div class="service-actions">
                        <button class="btn btn-primary" onclick="window.location.href='contacto.php'">
                            <i class="fas fa-paper-plane"></i>
                            Solicitar
                        </button>
                        <button class="btn btn-outline" onclick="window.location.href='contacto.php'">
                            <i class="fas fa-phone"></i>
                            Contactar
                        </button>
                    </div>
                </div>
            </div>

            <div style="text-align: center; margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,182,47,0.1)); border-radius: 20px;">
                <h3 style="margin-bottom: 1rem;">¿No encuentra lo que busca?</h3>
                <p style="margin-bottom: 1.5rem; opacity: 0.8;">Contáctenos y con gusto le atenderemos para cualquier proyecto personalizado</p>
                <button class="btn btn-primary" onclick="window.location.href='contacto.php'">
                    <i class="fas fa-phone"></i>
                    Contactar Ahora
                </button>
            </div>
        </div>
    </section>

<?php include 'includes/footer.php'; ?>
