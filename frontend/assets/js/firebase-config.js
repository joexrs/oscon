/**
 * Configuración de Firebase para OSCON
 */

// Importar funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-storage.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCY11RZngBnS-BfYI_xDtTSpBF03ArRqJ4",
    authDomain: "osconpe.firebaseapp.com",
    projectId: "osconpe",
    storageBucket: "osconpe.firebasestorage.app",
    messagingSenderId: "1028455974098",
    appId: "1:1028455974098:web:f6e2458a0de3dc6255190b",
    measurementId: "G-ZQJ1QGBYKK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Exportar instancias para usar en otros archivos
export { app, analytics, storage, db, ref, uploadBytes, getDownloadURL, deleteObject, collection, addDoc, getDocs, doc, deleteDoc, query, where, orderBy };
