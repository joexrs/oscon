<?php
require_once 'includes/config.php';

$pageTitle = 'Contacto - Oscon';
$pageDescription = 'Contáctenos para solicitar información sobre nuestros servicios de fabricación y soldadura industrial';

// Generar token CSRF
$csrfToken = generateCSRFToken();

$successMessage = '';
$errorMessage = '';

// Procesar formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar token CSRF
    if (!isset($_POST['csrf_token']) || !validateCSRFToken($_POST['csrf_token'])) {
        $errorMessage = 'Error de seguridad. Por favor, intente nuevamente.';
    }
    // Rate limiting
    elseif (!checkRateLimit('contact_form', 3, 600)) {
        $errorMessage = 'Ha excedido el límite de intentos. Por favor, espere unos minutos.';
    }
    else {
        // Sanitizar y validar datos
        $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
        $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
        $service = isset($_POST['service']) ? sanitizeInput($_POST['service']) : '';
        $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
        
        $errors = [];
        
        if (empty($name) || strlen($name) < 3) {
            $errors[] = 'El nombre debe tener al menos 3 caracteres';
        }
        
        if (empty($email) || !validateEmail($email)) {
            $errors[] = 'Email inválido';
        }
        
        if (!empty($phone) && !validatePhone($phone)) {
            $errors[] = 'Teléfono inválido';
        }
        
        if (empty($service)) {
            $errors[] = 'Debe seleccionar un servicio';
        }
        
        if (empty($message) || strlen($message) < 10) {
            $errors[] = 'El mensaje debe tener al menos 10 caracteres';
        }
        
        if (empty($errors)) {
            // Aquí enviarías el email o guardarías en base de datos
            // Por ahora solo mostramos mensaje de éxito
            $successMessage = 'Mensaje enviado exitosamente. Nos pondremos en contacto pronto.';
            
            // Limpiar variables después de envío exitoso
            $name = $email = $phone = $service = $message = '';
            
            // Regenerar token
            unset($_SESSION['csrf_token']);
            $csrfToken = generateCSRFToken();
        } else {
            $errorMessage = implode('<br>', $errors);
        }
    }
}

include 'includes/header.php';
?>

    <section class="contact-section" id="contacto">
        <div class="container">
            <div class="section-header-centered">
                <h1 class="section-title">Contáctanos</h1>
                <p class="section-subtitle">Estamos listos para ayudarte con tu proyecto</p>
            </div>

            <?php if ($successMessage): ?>
                <div style="padding: 1rem; background: rgba(0,255,0,0.1); border: 1px solid rgba(0,255,0,0.3); border-radius: 10px; margin-bottom: 2rem; text-align: center;">
                    <i class="fas fa-check-circle" style="color: #00ff00;"></i>
                    <?php echo escapeOutput($successMessage); ?>
                </div>
            <?php endif; ?>

            <?php if ($errorMessage): ?>
                <div style="padding: 1rem; background: rgba(255,0,0,0.1); border: 1px solid rgba(255,0,0,0.3); border-radius: 10px; margin-bottom: 2rem; text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="color: #ff0000;"></i>
                    <?php echo $errorMessage; ?>
                </div>
            <?php endif; ?>

            <div class="contact-grid">
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <strong>Ubicación</strong>
                            <span>Ciudad Industrial, México</span>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <div>
                            <strong>Teléfono</strong>
                            <span>+52 (555) 123-4567</span>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <strong>Email</strong>
                            <span>contacto@oscon.com</span>
                        </div>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <strong>Horario</strong>
                            <span>Lun - Vie: 8:00 AM - 6:00 PM</span>
                        </div>
                    </div>
                </div>

                <form class="contact-form" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
                    <input type="hidden" name="csrf_token" value="<?php echo escapeOutput($csrfToken); ?>">

                    <div class="form-group">
                        <label for="name">Nombre *</label>
                        <input type="text" id="name" name="name" required minlength="3" maxlength="100" 
                               value="<?php echo isset($name) ? escapeOutput($name) : ''; ?>">
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required maxlength="100"
                               value="<?php echo isset($email) ? escapeOutput($email) : ''; ?>">
                    </div>

                    <div class="form-group">
                        <label for="phone">Teléfono</label>
                        <input type="tel" id="phone" name="phone" maxlength="15"
                               value="<?php echo isset($phone) ? escapeOutput($phone) : ''; ?>">
                    </div>

                    <div class="form-group">
                        <label for="service">Servicio de Interés *</label>
                        <select id="service" name="service" required>
                            <option value="">Seleccionar servicio</option>
                            <option value="fabricacion" <?php echo (isset($service) && $service === 'fabricacion') ? 'selected' : ''; ?>>Fabricación</option>
                            <option value="soldadura" <?php echo (isset($service) && $service === 'soldadura') ? 'selected' : ''; ?>>Soldadura</option>
                            <option value="ambos" <?php echo (isset($service) && $service === 'ambos') ? 'selected' : ''; ?>>Ambos servicios</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Mensaje *</label>
                        <textarea id="message" name="message" rows="4" required minlength="10" maxlength="1000"><?php echo isset($message) ? escapeOutput($message) : ''; ?></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block">
                        <i class="fas fa-paper-plane"></i>
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </div>
    </section>

<?php include 'includes/footer.php'; ?>
