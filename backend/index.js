
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const multer = require('multer');
const cors = require('cors');

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Multer is used to handle file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to authenticate users
const authenticate = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    res.status(403).send('Unauthorized');
    return;
  }
};

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // This is a placeholder for a custom token generation. 
        // For a real app, you would verify the user/password against your user database
        // and then create a custom token.
        const user = await admin.auth().getUserByEmail(email);
        // IMPORTANT: The following is NOT a real password check and is insecure.
        // It's a placeholder to allow you to get a token for a user that already exists in Firebase Auth.
        // In a real application, you would NOT have access to the user's password.
        // You would use the Firebase client-side SDK to sign in the user and get an ID token.
        const customToken = await admin.auth().createCustomToken(user.uid);
        res.status(200).send({ token: customToken });

    } catch (error) {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

// File upload endpoint
app.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const bucket = admin.storage().bucket();
  const { folder, name } = req.body;
  const blob = bucket.file(`${folder}/${name}`);

  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send({ message: err.message });
  });

  blobStream.on('finish', () => {
    res.status(200).send({ message: 'File uploaded successfully' });
  });

  blobStream.end(req.file.buffer);
});

exports.api = functions.https.onRequest(app);
