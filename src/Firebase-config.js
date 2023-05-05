// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyD4Zyj29Q8cNV0jxViyGh4l0yyGku4npTU",

    authDomain: "dataentry-7e328.firebaseapp.com",

    projectId: "dataentry-7e328",

    storageBucket: "dataentry-7e328.appspot.com",

    messagingSenderId: "859809910149",

    appId: "1:859809910149:web:795af5fc7d2e96d9b088ec",

    measurementId: "G-94B75KHMJR"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();