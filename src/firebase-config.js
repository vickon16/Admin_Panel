import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "fb-general-tutorials.firebaseapp.com",
  projectId: "fb-general-tutorials",
  storageBucket: "fb-general-tutorials.appspot.com",
  messagingSenderId: "772992404185",
  appId: "1:772992404185:web:c1688516162b6e22840cc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const userCollectionRef = collection(db, "admin-users");
export const storage = getStorage(app);
