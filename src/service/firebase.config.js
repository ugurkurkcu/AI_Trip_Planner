// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj5SGNJhhko2oqD5WmfL0HA9D8J6bAXgM",
  authDomain: "ai-trip-planner-810eb.firebaseapp.com",
  projectId: "ai-trip-planner-810eb",
  storageBucket: "ai-trip-planner-810eb.firebasestorage.app",
  messagingSenderId: "677136921820",
  appId: "1:677136921820:web:99c92ecdff9cc78f163019",
  measurementId: "G-EDZCHWCGC3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
