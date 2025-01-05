import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  
// };
const firebaseConfig = {
    apiKey: "AIzaSyBw0ErpcB2Y1tUGZrxZLg27K3Pm6fTsemM",
    authDomain: "my-portfolio-5811f.firebaseapp.com",
    projectId: "my-portfolio-5811f",
    storageBucket: "my-portfolio-5811f.firebasestorage.app",
    messagingSenderId: "999540082084",
    appId: "1:999540082084:web:6286213c57087c3841ad31",
    measurementId: "G-GESFZEY3HG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services
export { auth, db };