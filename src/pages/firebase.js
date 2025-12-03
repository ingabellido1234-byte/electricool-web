// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlBK-skf1zZdiKVsHab-0C8sv0BA3D23U",
  authDomain: "electricool.firebaseapp.com",
  projectId: "electricool",
  storageBucket: "electricool.firebasestorage.app",
  messagingSenderId: "772543914148",
  appId: "1:772543914148:web:c0ad4bf7df2f140aeb4631",
  measurementId: "G-SBMJRRG8RT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);