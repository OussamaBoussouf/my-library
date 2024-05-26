import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "library-93f37.firebaseapp.com",
  projectId: "library-93f37",
  storageBucket: "library-93f37.appspot.com",
  messagingSenderId: "983479564179",
  appId: "1:983479564179:web:a67db6bb90f391cadf1a66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);