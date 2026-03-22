// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMTnppqZ20T9D_Qrc1RkYqGFGLJ1HZXvs",
  authDomain: "handasiyan-a37be.firebaseapp.com",
  projectId: "handasiyan-a37be",
  storageBucket: "handasiyan-a37be.firebasestorage.app",
  messagingSenderId: "679806681506",
  appId: "1:679806681506:web:474479ebbbb3067ed672fb",
  measurementId: "G-MG6KFFLEP9"
};
console.log("id",import.meta.env.VITE_FIREBASE_API_KEY);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);
export default app;
