// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// VITE_APIKEY=AIzaSyBT0djzM3Z0tjbBehdKfBClhlBxBve1L_0
// VITE_AUTHDOMAIN=bistro-restaurant-f5a61.firebaseapp.com
// VITE_PROJECTID=bistro-restaurant-f5a61
// VITE_STORAGEBUCKET=bistro-restaurant-f5a61.appspot.com
// VITE_MESSAGINGSENDERID=390627977767
// VITE_APPID=1:390627977767:web:19589d015758cfe3ee7c02
