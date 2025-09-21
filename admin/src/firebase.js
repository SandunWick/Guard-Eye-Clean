// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA35jujGq4mLvvjpDdr0xqwcVcVHzmY3EE",
  authDomain: "login-se-ecf51.firebaseapp.com",
  databaseURL: "https://login-se-ecf51-default-rtdb.firebaseio.com",
  projectId: "login-se-ecf51",
  storageBucket: "login-se-ecf51.firebasestorage.app",
  messagingSenderId: "144741436350",
  appId: "1:144741436350:web:bd6a83584250bf6fa687ef",
  measurementId: "G-E2T8X78GEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app); // ✅ centralized storage
