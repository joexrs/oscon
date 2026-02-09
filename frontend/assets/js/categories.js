/**
 * Gestor de Categorías
 */

const CategoryManager = {
    /**
     * Renderizar filtros de categorías
     */
    renderFilters() {
        const filtersContainer = document.getElementById('categoryFilters');
        if (!filtersContainer) return;

        const categories = Storage.getCategories();

        // HTML para el botón "Todas"
        let html = `
            <button class="category-btn active" data-category="todas">
                <i class="fas fa-th"></i>
                Todas
            </button>
        `;

        // Agregar botones de categorías
        categories.forEach(category => {
            html += `
                <button class="category-btn" data-category="${category.id}" style="--cat-color: ${category.color}">
                    <i class="fas ${category.icon}"></i>
                    ${category.nombre}
                </button>
            `;
        });

        filtersContainer.innerHTML = html;

        // Agregar event listeners
        this.attachFilterListeners();
    },

    /**
     * Adjuntar listeners a los filtros
     */
    attachFilterListeners() {
        const filterButtons = document.querySelectorAll('.category-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remover clase active de todos los botones
                filterButtons.forEach(b => b.classList.remove('active'));

                // Agregar clase active al botón clickeado
                btn.classList.add('active');

                // Filtrar videos
                const category = btn.dataset.category;
                this.filterVideos(category);
            });
        });
    },

    /**
     * Filtrar videos por categoría
     */
    filterVideos(categoryId) {
        let videos;

        if (categoryId === 'todas') {
            videos = Storage.getVideos();
        } else {
            videos = Storage.filterByCategory(parseInt(categoryId));
        }

        // Renderizar videos filtrados
        VideoManager.renderVideos(videos);
    },

    /**
     * Renderizar opciones de categorías en select
     */
    renderSelectOptions(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;

        const categories = Storage.getCategories();

        let html = '<option value="">Seleccionar categoría</option>';

        categories.forEach(category => {
            html += `<option value="${category.id}">${category.nombre}</option>`;
        });

        select.innerHTML = html;
    },

    /**
     * Obtener nombre de categoría por ID
     */
    getCategoryName(id) {
        const category = Storage.getCategoryById(id);
        return category ? category.nombre : 'Sin categoría';
    },

    /**
     * Obtener color de categoría por ID
     */
    getCategoryColor(id) {
        const category = Storage.getCategoryById(id);
        return category ? category.color : '#667eea';
    },

    /**
     * Obtener ícono de categoría por ID
     */
    getCategoryIcon(id) {
        const category = Storage.getCategoryById(id);
        return category ? category.icon : 'fa-folder';
    }
};
