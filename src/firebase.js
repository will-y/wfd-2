import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyC2r48UniL-5JztjocB9C-6sOwOg7Ghf7g",
    authDomain: "whats-for-dinner-2-e8323.firebaseapp.com",
    projectId: "whats-for-dinner-2-e8323",
    storageBucket: "whats-for-dinner-2-e8323.appspot.com",
    messagingSenderId: "364899915608",
    appId: "1:364899915608:web:f8868c2e0d03b6eef2772d",
    measurementId: "G-9RQVP7L0FL"
};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
