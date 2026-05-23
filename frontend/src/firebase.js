// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATqIsOXMTbZaU4KYOU76yMUX2FPvvfork",
  authDomain: "fusion-portal-clone.firebaseapp.com",
  projectId: "fusion-portal-clone",
  storageBucket: "fusion-portal-clone.firebasestorage.app",
  messagingSenderId: "670151993602",
  appId: "1:670151993602:web:53081957f6c879ebfd3a1b",
  measurementId: "G-8K74YWNFCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);