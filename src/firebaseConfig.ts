// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxrSrgRZoTb0rc9VyydE7WLbR8n6U8gNs",
  authDomain: "todo-98cb9.firebaseapp.com",
  projectId: "todo-98cb9",
  storageBucket: "todo-98cb9.appspot.com",
  messagingSenderId: "321782436613",
  appId: "1:321782436613:web:723e5a239ee39bf3be5d6c",
  measurementId: "G-4KPQ18DEHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)