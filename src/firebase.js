// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCot7qaoAefzVs5VXE9puYKCXPnpMqvYVU",
  authDomain: "durian-classifier.firebaseapp.com",
  projectId: "durian-classifier",
  storageBucket: "durian-classifier.firebasestorage.app",
  messagingSenderId: "873374916706",
  appId: "1:873374916706:web:78df41929666ae8ded313b",
  measurementId: "G-YBL8B3PWQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);