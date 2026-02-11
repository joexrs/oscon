const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const multer = require('multer');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'your-storage-bucket-name.appspot.com'
});

const db = admin.firestore();
const bucket = admin.storage().bucket();
const app = express();
app.use(express.json());
app.use(express.static('../frontend'));

// User registration (for initial setup)
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').doc(email).set({ password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully' });
});

// User login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await db.collection('users').doc(email).get();
    if (!userDoc.exists) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }
    const user = userDoc.data();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid credentials' });
    }
    res.status(200).send({ message: 'Login successful' });
});

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Video upload
app.post('/upload-video', upload.single('video'), async (req, res) => {
    const { title } = req.body;
    const file = req.file;
    const blob = bucket.file(`videos/${file.originalname}`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => res.status(500).send(err));
    blobStream.on('finish', async () => {
        await db.collection('videos').add({ title, fileName: file.originalname });
        res.status(201).send({ message: 'Video uploaded successfully' });
    });
    blobStream.end(file.buffer);
});

// Flyer upload
app.post('/upload-flyer', upload.single('flyer'), async (req, res) => {
    const { title } = req.body;
    const file = req.file;
    const blob = bucket.file(`flyers/${file.originalname}`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => res.status(500).send(err));
    blobStream.on('finish', async () => {
        await db.collection('flyers').add({ title, fileName: file.originalname });
        res.status(201).send({ message: 'Flyer uploaded successfully' });
    });
    blobStream.end(file.buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});