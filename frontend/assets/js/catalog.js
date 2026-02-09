/**
 * JavaScript para el catálogo de videos
 */

// Credenciales de admin (en producción deberían estar en backend)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'oscon2026'
};

let isLoggedIn = false;
let currentFilter = 'todos';

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
    setupEventListeners();
    checkUrlParams();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            loadVideos();
        });
    });

    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchVideos(e.target.value);
        });
    }

    // Admin modal
    const adminBtn = document.getElementById('adminBtn');
    const closeAdminModal = document.getElementById('closeAdminModal');
    const adminModal = document.getElementById('adminModal');

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            adminModal.classList.add('active');
        });
    }

    if (closeAdminModal) {
        closeAdminModal.addEventListener('click', () => {
            adminModal.classList.remove('active');
        });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Upload form
    const uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUpload);
    }

    // Video file input
    const videoFile = document.getElementById('videoFile');
    if (videoFile) {
        videoFile.addEventListener('change', handleVideoSelect);
    }

    // Remove video button
    const removeVideo = document.getElementById('removeVideo');
    if (removeVideo) {
        removeVideo.addEventListener('click', clearVideoPreview);
    }

    // Upload area drag and drop
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            document.getElementById('videoFile').click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('video/')) {
                document.getElementById('videoFile').files = files;
                handleVideoSelect({ target: { files: files } });
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Close video modal
    const closeModal = document.getElementById('closeModal');
    const videoModal = document.getElementById('videoModal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            videoModal.classList.remove('active');
            const modalVideo = document.getElementById('modalVideo');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.src = '';
            }
        });
    }

    // Close modal al hacer clic en overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.parentElement.classList.remove('active');
        });
    });
}

// Verificar parámetros de URL
function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const servicio = params.get('servicio');

    if (servicio) {
        currentFilter = servicio;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === servicio) {
                btn.classList.add('active');
            }
        });
    }
}

// Cargar videos
async function loadVideos() {
    const videos = await Storage.getVideos();
    const videoGrid = document.getElementById('videoGrid');
    const emptyState = document.getElementById('emptyState');

    if (!videoGrid) return;

    let filteredVideos = videos;

    if (currentFilter !== 'todos') {
        filteredVideos = videos.filter(v => v.service === currentFilter);
    }

    if (filteredVideos.length === 0) {
        videoGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    videoGrid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    videoGrid.innerHTML = filteredVideos.map(video => createVideoCard(video)).join('');

    // Agregar event listeners a las tarjetas
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            openVideoModal(parseInt(card.dataset.videoId));
        });
    });
}

// Crear tarjeta de video
function createVideoCard(video) {
    const serviceNames = {
        fabricacion: 'Fabricación',
        soldadura: 'Soldadura'
    };

    const date = new Date(video.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return `
        <div class="video-card" data-video-id="${video.id}">
            <div class="video-thumbnail">
                <video src="${video.videoUrl}" preload="metadata"></video>
                <div class="play-icon">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${escapeHtml(video.title)}</h3>
                ${video.description ? `<p class="video-description">${escapeHtml(video.description)}</p>` : ''}
                <div class="video-meta">
                    <span class="service-badge">${serviceNames[video.service] || video.service}</span>
                    <span><i class="fas fa-calendar"></i> ${date}</span>
                </div>
                ${video.tags && video.tags.length > 0 ? `
                    <div class="video-tags">
                        ${video.tags.slice(0, 3).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Abrir modal de video
async function openVideoModal(videoId) {
    const video = await Storage.getVideoById(videoId);
    if (!video) return;

    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const serviceBadge = document.getElementById('serviceBadge');
    const videoDate = document.getElementById('videoDate');
    const videoTags = document.getElementById('videoTags');

    const serviceNames = {
        fabricacion: 'Fabricación',
        soldadura: 'Soldadura'
    };

    const date = new Date(video.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    modalVideo.src = video.videoUrl;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description || 'Sin descripción';
    serviceBadge.textContent = serviceNames[video.service] || video.service;
    videoDate.textContent = date;

    if (video.tags && video.tags.length > 0) {
        videoTags.innerHTML = video.tags.map(tag =>
            `<span class="tag">${escapeHtml(tag)}</span>`
        ).join('');
    } else {
        videoTags.innerHTML = '';
    }

    modal.classList.add('active');
    modalVideo.play().catch(err => console.log('Autoplay bloqueado'));
}

// Buscar videos
async function searchVideos(query) {
    if (!query.trim()) {
        loadVideos();
        return;
    }

    const videos = await Storage.searchVideos(query);
    const videoGrid = document.getElementById('videoGrid');
    const emptyState = document.getElementById('emptyState');

    let filteredVideos = videos;
    if (currentFilter !== 'todos') {
        filteredVideos = videos.filter(v => v.service === currentFilter);
    }

    if (filteredVideos.length === 0) {
        videoGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    videoGrid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    videoGrid.innerHTML = filteredVideos.map(video => createVideoCard(video)).join('');

    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            openVideoModal(parseInt(card.dataset.videoId));
        });
    });
}

// Manejo de login
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isLoggedIn = true;
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('uploadSection').style.display = 'block';
        loadUploadedVideos();
    } else {
        alert('Credenciales incorrectas');
    }
}

// Manejo de logout
function handleLogout() {
    isLoggedIn = false;
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('loginForm').reset();
}

// Manejar selección de video
function handleVideoSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
        alert('Por favor selecciona un archivo de video');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        const previewVideo = document.getElementById('previewVideo');
        const videoPreview = document.getElementById('videoPreview');
        const uploadArea = document.getElementById('uploadArea');

        previewVideo.src = event.target.result;
        videoPreview.style.display = 'block';
        uploadArea.style.display = 'none';
    };

    reader.readAsDataURL(file);
}

// Limpiar preview de video
function clearVideoPreview() {
    const previewVideo = document.getElementById('previewVideo');
    const videoPreview = document.getElementById('videoPreview');
    const uploadArea = document.getElementById('uploadArea');
    const videoFile = document.getElementById('videoFile');

    previewVideo.src = '';
    videoPreview.style.display = 'none';
    uploadArea.style.display = 'block';
    videoFile.value = '';
}

// Manejar subida de video
async function handleUpload(e) {
    e.preventDefault();

    const videoFile = document.getElementById('videoFile').files[0];
    if (!videoFile) {
        alert('Por favor selecciona un video');
        return;
    }

    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const service = document.getElementById('projectService').value;
    const tagsInput = document.getElementById('projectTags').value;
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

    // Mostrar mensaje de carga
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subiendo...';
    submitBtn.disabled = true;

    try {
        // Subir video y obtener URL
        const videoUrl = await Storage.uploadVideoFile(videoFile);

        const video = {
            title: title,
            description: description,
            service: service,
            tags: tags,
            videoUrl: videoUrl
        };

        await Storage.addVideo(video);

        // Limpiar formulario
        document.getElementById('uploadForm').reset();
        clearVideoPreview();

        // Recargar lista de videos
        await loadUploadedVideos();
        await loadVideos();

        alert('Video publicado exitosamente');
    } catch (error) {
        console.error('Error al subir video:', error);
        alert('Error al subir el video. Por favor intenta de nuevo.');
    } finally {
        // Restablecer botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Cargar videos subidos en el panel de admin
async function loadUploadedVideos() {
    const videos = await Storage.getVideos();
    const uploadedList = document.getElementById('uploadedList');

    if (!uploadedList) return;

    if (videos.length === 0) {
        uploadedList.innerHTML = '<p style="color: var(--text-secondary)">No hay videos publicados</p>';
        return;
    }

    uploadedList.innerHTML = videos.map(video => `
        <div class="uploaded-item">
            <div class="uploaded-item-info">
                <strong>${escapeHtml(video.title)}</strong>
                <span>${video.service}</span>
            </div>
            <button onclick="deleteVideo(${video.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Eliminar video
async function deleteVideo(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este video?')) {
        await Storage.deleteVideo(id);
        await loadUploadedVideos();
        await loadVideos();
    }
}

// Hacer la función disponible globalmente
window.deleteVideo = deleteVideo;

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
