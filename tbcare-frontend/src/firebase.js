// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT4503FXLkcekZzaeBa4nV6ZLgokKKeFA",
  authDomain: "tbcare-2fc13.firebaseapp.com",
  projectId: "tbcare-2fc13",
  storageBucket: "tbcare-2fc13.firebasestorage.app",
  messagingSenderId: "302205379804",
  appId: "1:302205379804:web:87c459340dd777150ac019",
  measurementId: "G-HRHHC8RMJ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
