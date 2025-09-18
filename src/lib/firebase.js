// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5SbjOW30S8-wQ1Bi7yiBwQdqutGDEMs8",
  authDomain: "remote-classroom-c85a7.firebaseapp.com",
  projectId: "remote-classroom-c85a7",
  storageBucket: "remote-classroom-c85a7.firebasestorage.app",
  messagingSenderId: "43417303957",
  appId: "1:43417303957:web:0b276ad344b3ed20df949c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
