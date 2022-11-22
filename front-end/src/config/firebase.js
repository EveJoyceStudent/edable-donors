import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyDa0jpr3yOri73lSbUvPg1BiB2HbRy4PPw",
  authDomain: "edable-admin.firebaseapp.com",
  projectId: "edable-admin",
  storageBucket: "edable-admin.appspot.com",
  messagingSenderId: "285521431356",
  appId: "1:285521431356:web:1f90580beaa0b5d82c6c39",
  measurementId: "G-58BXC3GZBB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// app check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcdgQ0jAAAAAKLxfGbIvbOLXudIU1DZjI1PV9oX"),
  isTokenAutoRefreshEnabled: true,
});

export { db };
