// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuxQHI__lvsKCsTVla1PqbZdsb6V6K6Bk",
  authDomain: "newgen-50974.firebaseapp.com",
  projectId: "newgen-50974",
  storageBucket: "newgen-50974.firebasestorage.app",
  messagingSenderId: "20394819851",
  appId: "1:20394819851:web:d1b513c3065058586c620e",
  measurementId: "G-YX6R9NNJMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);