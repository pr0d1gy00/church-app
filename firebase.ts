import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"; // solo para web
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: "AIzaSyCx_tcdGjeJrsVVba6eVTnhDqT-Py58M94",

  authDomain: "church-6a68a.firebaseapp.com",

  projectId: "church-6a68a",

  storageBucket: "church-6a68a.firebasestorage.app",

  messagingSenderId: "186911403948",

  appId: "1:186911403948:web:0e9a1a5ffc449d08d21409",

  measurementId: "G-QSYKZ6FG5N"

};

export const app = initializeApp(firebaseConfig);