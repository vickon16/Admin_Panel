// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "admin-dashboard-app-ba762.firebaseapp.com",
  projectId: "admin-dashboard-app-ba762",
  storageBucket: "admin-dashboard-app-ba762.appspot.com",
  messagingSenderId: "538184625896",
  appId: "1:538184625896:web:871f18f877b798424e235d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const userCollectionRef = collection(db, "admin-users");
export const storage = getStorage(app);
