import { initializeApp } from "firebase/app";

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