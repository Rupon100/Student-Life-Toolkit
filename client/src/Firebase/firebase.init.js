// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiVYdnEnztTNLwBDdrjym7GJRE-6K07HM",
  authDomain: "simple-firebase-a6b92.firebaseapp.com",
  projectId: "simple-firebase-a6b92",
  storageBucket: "simple-firebase-a6b92.firebasestorage.app",
  messagingSenderId: "696800558433",
  appId: "1:696800558433:web:a7bb19254b0aef07619920"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);