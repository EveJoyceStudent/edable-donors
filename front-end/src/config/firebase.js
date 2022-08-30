import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDs6EtNxxw7Q9vqGTd9EFzCkpK4aQ9u_dY",
  authDomain: "edable-swinburne.firebaseapp.com",
  projectId: "edable-swinburne",
  storageBucket: "edable-swinburne.appspot.com",
  messagingSenderId: "217658206897",
  appId: "1:217658206897:web:529a69fce1bf349d7ad090",
  measurementId: "G-2R2MP9QZ9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}