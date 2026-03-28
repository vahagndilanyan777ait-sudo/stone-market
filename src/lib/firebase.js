import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvZ_fG6D62e9KG-m2VO4qn1Rr2mvGhAWc",
  authDomain: "stone-market-703d0.firebaseapp.com",
  databaseURL: "https://stone-market-703d0-default-rtdb.firebaseio.com", 
  projectId: "stone-market-703d0",
  storageBucket: "stone-market-703d0.firebasestorage.app",
  messagingSenderId: "822774441877",
  appId: "1:822774441877:web:eedd92ae3a3ba18d52389c",
  measurementId: "G-PNCBQVZM6X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);