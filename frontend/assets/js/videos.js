/**
 * Gestor de Videos
 */

const VideoManager = {
    currentVideo: null,

    /**
     * Renderizar todos los videos
     */
    renderVideos(videos = null) {
        const grid = document.getElementById('videoGrid');
        const emptyState = document.getElementById('emptyState');

        if (!grid) return;

        const videosToRender = videos || Storage.getVideos();

        if (videosToRender.length === 0) {
            grid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        if (emptyState) emptyState.style.display = 'none';

        grid.innerHTML = videosToRender.map(video => this.createVideoCard(video)).join('');

        // Agregar event listeners
        this.attachCardListeners();
    },

    /**
     * Crear tarjeta de video
     */
    createVideoCard(video) {
        const categoryName = CategoryManager.getCategoryName(video.categoryId);
        const categoryColor = CategoryManager.getCategoryColor(video.categoryId);
        const date = new Date(video.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const tags = video.tags && video.tags.length > 0
            ? `<div class="video-tags">
                ${video.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
               </div>`
            : '';

        return `
            <div class="video-card" data-video-id="${video.id}">
                <div class="video-thumbnail">
                    ${video.thumbnailUrl
                ? `<img src="${video.thumbnailUrl}" alt="${video.title}">`
                : `<video src="${video.videoUrl}" preload="metadata"></video>`
            }
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                    ${video.duration
                ? `<span class="video-duration">${this.formatDuration(video.duration)}</span>`
                : ''
            }
                </div>
                <div class="video-info">
                    <h3 class="video-title">${this.escapeHtml(video.title)}</h3>
                    ${video.description
                ? `<p class="video-description">${this.escapeHtml(video.description)}</p>`
                : ''
            }
                    <div class="video-meta">
                        <span class="category-badge" style="background: ${categoryColor}">
                            ${categoryName}
                        </span>
                        <span>
                            <i class="fas fa-eye"></i>
                            ${video.views || 0}
                        </span>
                        <span>
                            <i class="fas fa-calendar"></i>
                            ${date}
                        </span>
                    </div>
                    ${tags}
                </div>
            </div>
        `;
    },

    /**
     * Adjuntar listeners a las tarjetas
     */
    attachCardListeners() {
        const cards = document.querySelectorAll('.video-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const videoId = card.dataset.videoId;
                this.playVideo(videoId);
            });
        });
    },

    /**
     * Reproducir video
     */
    playVideo(videoId) {
        const video = Storage.getVideoById(videoId);
        if (!video) return;

        this.currentVideo = video;

        // Incrementar vistas
        Storage.incrementViews(videoId);

        // Actualizar estadísticas en la UI
        UIManager.updateStats();

        // Mostrar modal de reproducción
        const modal = document.getElementById('playModal');
        const playerVideo = document.getElementById('playerVideo');
        const playerTitle = document.getElementById('playerTitle');
        const playerDescription = document.getElementById('playerDescription');
        const playerCategory = document.getElementById('playerCategory');
        const playerViews = document.getElementById('playerViews');
        const playerDate = document.getElementById('playerDate');
        const playerTags = document.getElementById('playerTags');

        if (!modal || !playerVideo) return;

        // Configurar video
        playerVideo.src = video.videoUrl;
        playerTitle.textContent = video.title;
        playerDescription.textContent = video.description || 'Sin descripción';

        const categoryName = CategoryManager.getCategoryName(video.categoryId);
        const categoryColor = CategoryManager.getCategoryColor(video.categoryId);
        playerCategory.textContent = categoryName;
        playerCategory.style.background = categoryColor;

        playerViews.textContent = (video.views || 0) + 1; // +1 por la vista actual

        const date = new Date(video.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        playerDate.textContent = date;

        // Renderizar etiquetas
        if (video.tags && video.tags.length > 0) {
            playerTags.innerHTML = video.tags.map(tag =>
                `<span class="tag">${this.escapeHtml(tag)}</span>`
            ).join('');
        } else {
            playerTags.innerHTML = '';
        }

        // Mostrar modal
        modal.classList.add('active');

        // Reproducir video automáticamente
        playerVideo.play().catch(err => {
            console.log('Autoplay bloqueado:', err);
        });
    },

    /**
     * Cerrar reproductor
     */
    closePlayer() {
        const modal = document.getElementById('playModal');
        const playerVideo = document.getElementById('playerVideo');

        if (modal) {
            modal.classList.remove('active');
        }

        if (playerVideo) {
            playerVideo.pause();
            playerVideo.src = '';
        }

        this.currentVideo = null;

        // Re-renderizar videos para actualizar vistas
        this.renderVideos();
    },

    /**
     * Eliminar video actual
     */
    deleteCurrentVideo() {
        if (!this.currentVideo) return;

        if (confirm('¿Estás seguro de que deseas eliminar este video?')) {
            Storage.deleteVideo(this.currentVideo.id);
            this.closePlayer();
            this.renderVideos();
            UIManager.updateStats();

            // Mostrar notificación
            UIManager.showNotification('Video eliminado exitosamente', 'success');
        }
    },

    /**
     * Formatear duración de video
     */
    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Escapar HTML para prevenir XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Buscar videos
     */
    search(query) {
        if (!query.trim()) {
            this.renderVideos();
            return;
        }

        const results = Storage.searchVideos(query);
        this.renderVideos(results);
    }
};
