// src/lib/firebase/config.js

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1DPd8UBuVHglvUp016ceU_4Bke9S6JYI',
  authDomain: 'hexi-hive.firebaseapp.com',
  projectId: 'hexi-hive',
  storageBucket: 'hexi-hive.firebasestorage.app',
  messagingSenderId: '572007456092',
  appId: '1:572007456092:web:6578b140ddda3429fc7599',
};

// Initialize Firebase
const firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebase_app);
export default firebase_app;
