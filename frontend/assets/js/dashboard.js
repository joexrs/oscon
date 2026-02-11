document.addEventListener('DOMContentLoaded', () => {
    const videosLink = document.getElementById('videos-link');
    const flyersLink = document.getElementById('flyers-link');
    const videosSection = document.getElementById('videos-section');
    const flyersSection = document.getElementById('flyers-section');
    const videoUploadForm = document.getElementById('videoUploadForm');
    const flyerUploadForm = document.getElementById('flyerUploadForm');

    videosLink.addEventListener('click', () => {
        videosSection.style.display = 'block';
        flyersSection.style.display = 'none';
    });

    flyersLink.addEventListener('click', () => {
        videosSection.style.display = 'none';
        flyersSection.style.display = 'block';
    });

    videoUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Handle video upload
    });

    flyerUploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Handle flyer upload
    });
});