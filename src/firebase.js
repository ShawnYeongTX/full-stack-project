// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQmfT2nxs8V88NsoKzIDsMYGHvC66O-Ng",
  authDomain: "car-rental-service-ce8bc.firebaseapp.com",
  projectId: "car-rental-service-ce8bc",
  storageBucket: "car-rental-service-ce8bc.firebasestorage.app",
  messagingSenderId: "881063543525",
  appId: "1:881063543525:web:910d917f5793f93a054a0c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)