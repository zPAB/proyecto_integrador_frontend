// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwsYNs7fxaMW-iIcS4PiHbH82prWLlIXU",
  authDomain: "tiendaderopa-12605.firebaseapp.com",
  projectId: "tiendaderopa-12605",
  storageBucket: "tiendaderopa-12605.firebasestorage.app",
  messagingSenderId: "652015449294",
  appId: "1:652015449294:web:585852698dc45e27254c9f",
  measurementId: "G-YKHLG5PJV1"
};

// 🔥 Inicializar Firebase (solo una vez)
const app = initializeApp(firebaseConfig);

// 🔥 Autenticación
export const auth = getAuth(app);

// 🔥 Proveedor de Google
export const googleProvider = new GoogleAuthProvider();

// 🔥 Función que abrirá el popup cuando presiones el botón
export const googlePopup = () => signInWithPopup(auth, googleProvider);
