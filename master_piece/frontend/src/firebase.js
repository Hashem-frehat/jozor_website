// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA902KhO4dJ4GTFP8kCSzAph97NdjybMeM",
  authDomain: "fire-base-e5ddc.firebaseapp.com",
  databaseURL:
    "https://fire-base-e5ddc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fire-base-e5ddc",
  storageBucket: "fire-base-e5ddc.appspot.com",
  messagingSenderId: "226774166949",
  appId: "1:226774166949:web:ac793afbe53beb61a3cc4c",
  measurementId: "G-R4BMQ14NZ0",
};

const app = initializeApp(firebaseConfig);

// تهيئة Firebase Storage
const storage = getStorage(app);

export { storage };
