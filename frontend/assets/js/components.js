// Cargar header
fetch('includes/header.html')
    .then(response => response.text())
    .then(html => {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = html;
        }
    });

// Cargar footer y actualizar año
fetch('includes/footer.html')
    .then(response => response.text())
    .then(html => {
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = html;
            // The year update script needs to run after the footer is loaded
            const currentYearSpan = document.getElementById('currentYear');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }
        }
    });
