// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1DNn24bp28Ro3HAClEZHV3Eygpa6N6Hs",
  authDomain: "gaming-cd78d.firebaseapp.com",
  databaseURL: "https://gaming-cd78d-default-rtdb.firebaseio.com",
  projectId: "gaming-cd78d",
  storageBucket: "gaming-cd78d.appspot.com",
  messagingSenderId: "828049397119",
  appId: "1:828049397119:web:16e681033b3ce0cbbc764a",
  measurementId: "G-RFD1GH8W6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize storage

export { storage }; // Export storage
