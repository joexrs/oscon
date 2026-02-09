/**
 * Sistema de Componentes - OSCON
 * Carga dinámica de header y footer
 */

// Función para cargar componentes HTML
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Función para resaltar la página activa en el menú
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Función para sanitizar HTML (prevenir XSS)
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para validar teléfono (formato mexicano)
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
}

// Rate limiting usando localStorage
class RateLimiter {
    constructor(action, maxAttempts = 5, timeWindow = 300000) { // 5 minutos por defecto
        this.action = action;
        this.maxAttempts = maxAttempts;
        this.timeWindow = timeWindow;
        this.storageKey = `rateLimit_${action}`;
    }

    check() {
        const now = Date.now();
        const data = this.getData();

        if (!data) {
            this.setData({ attempts: 1, firstAttempt: now });
            return true;
        }

        const timePassed = now - data.firstAttempt;

        if (timePassed > this.timeWindow) {
            // Resetear contador
            this.setData({ attempts: 1, firstAttempt: now });
            return true;
        }

        if (data.attempts >= this.maxAttempts) {
            return false;
        }

        data.attempts++;
        this.setData(data);
        return true;
    }

    getData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    setData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving rate limit data:', e);
        }
    }

    reset() {
        localStorage.removeItem(this.storageKey);
    }
}

// Sistema de mensajes toast
function showToast(message, type = 'info') {
    // Verificar si ya existe un contenedor de toast
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        `;
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const colors = {
        success: '#00ff00',
        error: '#ff0000',
        warning: '#ffaa00',
        info: '#00aaff'
    };

    toast.style.cssText = `
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        margin-bottom: 10px;
        border-radius: 10px;
        border-left: 4px solid ${colors[type] || colors.info};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
        min-width: 300px;
        max-width: 400px;
    `;

    const icon = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        info: '<i class="fas fa-info-circle"></i>'
    };

    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: ${colors[type]}; font-size: 1.2rem;">
                ${icon[type] || icon.info}
            </span>
            <span>${sanitizeHTML(message)}</span>
        </div>
    `;

    toastContainer.appendChild(toast);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Exportar funciones globalmente
window.osconUtils = {
    sanitizeHTML,
    validateEmail,
    validatePhone,
    RateLimiter,
    showToast,
    highlightActivePage
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    highlightActivePage();
});
