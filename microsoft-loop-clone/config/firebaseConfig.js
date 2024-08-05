// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAnalytics, isSupported } from "firebase/analytics";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "loop-ce6c4.firebaseapp.com",
    projectId: "loop-ce6c4",
    storageBucket: "loop-ce6c4.appspot.com",
    messagingSenderId: "815619965017",
    appId: "1:815619965017:web:2f915a3efd9bd65b487148",
    measurementId: "G-3JPCEHZHQS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);