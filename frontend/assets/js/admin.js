document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const flyerUploadForm = document.getElementById('flyer-upload-form');
  const videoUploadForm = document.getElementById('video-upload-form');

  let idToken = null;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      idToken = token;
      alert('Login successful!');
    } else {
      alert('Login failed');
    }
  });

  flyerUploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('flyer-file').files[0];
    if (file && idToken) {
      await uploadFile(file, 'flyers', idToken);
    }
  });

  videoUploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = document.getElementById('video-file').files[0];
    if (file && idToken) {
      await uploadFile(file, 'videos', idToken);
    }
  });

  async function uploadFile(file, folder, token) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('name', file.name);


    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert('File uploaded successfully!');
    } else {
      alert('File upload failed');
    }
  }
});
