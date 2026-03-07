import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCvZ_fG6D62e9KG-m2VO4qn1Rr2mvGhAWc",
  authDomain: "stone-market-703d0.firebaseapp.com",
  projectId: "stone-market-703d0",
  storageBucket: "stone-market-703d0.firebasestorage.app",
  messagingSenderId: "822774441877",
  appId: "1:822774441877:web:eedd92ae3a3ba18d52389c",
  measurementId: "G-PNCBQVZM6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const rtdb = getDatabase(app);