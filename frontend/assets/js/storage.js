/**
 * Sistema de Almacenamiento Híbrido
 * Usa Firebase si está disponible, sino LocalStorage
 */

// Variable global para detectar si Firebase está disponible
let useFirebase = false;
let firebaseModules = null;

// Intentar cargar Firebase
async function initFirebase() {
    try {
        firebaseModules = await import('./firebase-config.js');
        useFirebase = true;
        console.log('✅ Firebase conectado');
    } catch (error) {
        console.log('⚠️ Usando LocalStorage (Firebase no disponible)');
        useFirebase = false;
    }
}

const Storage = {
    // Claves de almacenamiento
    KEYS: {
        VIDEOS: 'oscon_videos',
        STATS: 'oscon_stats'
    },

    /**
     * Inicializar almacenamiento
     */
    async init() {
        await initFirebase();

        if (!useFirebase) {
            // Inicializar LocalStorage
            if (!this.get(this.KEYS.VIDEOS)) {
                this.set(this.KEYS.VIDEOS, []);
            }
            if (!this.get(this.KEYS.STATS)) {
                this.set(this.KEYS.STATS, {
                    totalVideos: 0,
                    totalViews: 0
                });
            }
        }
    },

    /**
     * Guardar datos en LocalStorage
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error al guardar en localStorage:', e);
            return false;
        }
    },

    /**
     * Obtener datos de LocalStorage
     */
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error al leer de localStorage:', e);
            return null;
        }
    },

    /**
     * Obtener todos los videos
     */
    async getVideos() {
        if (useFirebase && firebaseModules) {
            try {
                const { db, collection, getDocs, query, orderBy } = firebaseModules;
                const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const videos = [];
                querySnapshot.forEach((doc) => {
                    videos.push({ id: doc.id, ...doc.data() });
                });
                return videos;
            } catch (error) {
                console.error('Error al obtener videos de Firebase:', error);
                return this.get(this.KEYS.VIDEOS) || [];
            }
        } else {
            return this.get(this.KEYS.VIDEOS) || [];
        }
    },

    /**
     * Agregar un nuevo video
     */
    async addVideo(video) {
        if (useFirebase && firebaseModules) {
            try {
                const { db, collection, addDoc } = firebaseModules;

                video.createdAt = new Date().toISOString();
                video.views = 0;

                const docRef = await addDoc(collection(db, 'videos'), video);
                video.id = docRef.id;

                await this.updateStats();
                return video;
            } catch (error) {
                console.error('Error al agregar video a Firebase:', error);
                return this.addVideoLocal(video);
            }
        } else {
            return this.addVideoLocal(video);
        }
    },

    /**
     * Agregar video a LocalStorage
     */
    addVideoLocal(video) {
        const videos = this.get(this.KEYS.VIDEOS) || [];

        video.id = Date.now();
        video.createdAt = new Date().toISOString();
        video.views = 0;

        videos.unshift(video);
        this.set(this.KEYS.VIDEOS, videos);
        this.updateStats();

        return video;
    },

    /**
     * Subir video a Firebase Storage
     */
    async uploadVideoFile(file) {
        if (useFirebase && firebaseModules) {
            try {
                const { storage, ref, uploadBytes, getDownloadURL } = firebaseModules;

                const timestamp = Date.now();
                const fileName = `videos/${timestamp}_${file.name}`;
                const storageRef = ref(storage, fileName);

                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);

                return downloadURL;
            } catch (error) {
                console.error('Error al subir video a Firebase Storage:', error);
                // Fallback a Base64 para LocalStorage
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                });
            }
        } else {
            // Usar Base64 para LocalStorage
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        }
    },

    /**
     * Obtener un video por ID
     */
    async getVideoById(id) {
        const videos = await this.getVideos();
        return videos.find(v => v.id === id || v.id === parseInt(id));
    },

    /**
     * Eliminar un video
     */
    async deleteVideo(id) {
        if (useFirebase && firebaseModules) {
            try {
                const { db, doc, deleteDoc } = firebaseModules;
                await deleteDoc(doc(db, 'videos', id.toString()));
                await this.updateStats();
                return true;
            } catch (error) {
                console.error('Error al eliminar video de Firebase:', error);
                return this.deleteVideoLocal(id);
            }
        } else {
            return this.deleteVideoLocal(id);
        }
    },

    /**
     * Eliminar video de LocalStorage
     */
    deleteVideoLocal(id) {
        const videos = this.get(this.KEYS.VIDEOS) || [];
        const filteredVideos = videos.filter(v => v.id !== parseInt(id));
        this.set(this.KEYS.VIDEOS, filteredVideos);
        this.updateStats();
        return true;
    },

    /**
     * Buscar videos
     */
    async searchVideos(query) {
        const videos = await this.getVideos();
        const searchTerm = query.toLowerCase();

        return videos.filter(video => {
            return (
                video.title.toLowerCase().includes(searchTerm) ||
                (video.description && video.description.toLowerCase().includes(searchTerm)) ||
                (video.tags && video.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
        });
    },

    /**
     * Filtrar videos por servicio
     */
    async filterByService(service) {
        const videos = await this.getVideos();
        return videos.filter(v => v.service === service);
    },

    /**
     * Actualizar estadísticas
     */
    async updateStats() {
        const videos = await this.getVideos();

        const stats = {
            totalVideos: videos.length,
            totalViews: videos.reduce((sum, v) => sum + (v.views || 0), 0)
        };

        this.set(this.KEYS.STATS, stats);
        return stats;
    },

    /**
     * Obtener estadísticas
     */
    async getStats() {
        if (useFirebase && firebaseModules) {
            await this.updateStats();
        }
        return this.get(this.KEYS.STATS) || {
            totalVideos: 0,
            totalViews: 0
        };
    }
};

// Inicializar almacenamiento
Storage.init();

// Exportar para uso global
window.Storage = Storage;
