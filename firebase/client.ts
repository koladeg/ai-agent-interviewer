// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2dGKY_xSXBzYEbllgOdj76ayPbzDLrF0",
  authDomain: "prepai-13b15.firebaseapp.com",
  projectId: "prepai-13b15",
  storageBucket: "prepai-13b15.firebasestorage.app",
  messagingSenderId: "670636413524",
  appId: "1:670636413524:web:6fec2315c13f13588093c1",
  measurementId: "G-SK6JN3CJ1C"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);