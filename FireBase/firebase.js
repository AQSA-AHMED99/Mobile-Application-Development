// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// ⚠️ REPLACE WITH YOUR ACTUAL CONFIG (get from Firebase Project Settings)
const firebaseConfig = {
 apiKey: "AIzaSyDykZuM6lEFoYJSLgQY2CGCLsMGVNyF3yY",
  authDomain: "mad-work-7f3e8.firebaseapp.com",
  databaseURL: "https://mad-work-7f3e8-default-rtdb.firebaseio.com",
  projectId: "mad-work-7f3e8",
  storageBucket: "mad-work-7f3e8.firebasestorage.app",
  messagingSenderId: "511101515476",
  appId: "1:511101515476:web:b093ac711b6d248a3f6d41",
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

export default app;

