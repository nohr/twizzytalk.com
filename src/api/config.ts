// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUvxXyFO8KCOfH9LA1OBg60TZEGn3TYlo",
    authDomain: "twizzytalk.firebaseapp.com",
    projectId: "twizzytalk",
    storageBucket: "twizzytalk.appspot.com",
    messagingSenderId: "963881914995",
    appId: "1:963881914995:web:1aac904b0be9297f689006",
    measurementId: "G-XHP870SNRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

