import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT4503FXLkcekZzaeBa4nV6ZLgokKKeFA",
  authDomain: "tbcare-2fc13.firebaseapp.com",
  projectId: "tbcare-2fc13",
  storageBucket: "tbcare-2fc13.appspot.com",
  messagingSenderId: "302205379804",
  appId: "1:302205379804:web:87c459340dd777150ac019",
  measurementId: "G-HRHHC8RMJ0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
