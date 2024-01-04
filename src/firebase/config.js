import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAcHuNI3RRkPjT7toju0vyLFCrEzEFoG5o",
  authDomain: "kwetu-store.firebaseapp.com", 
  projectId: "kwetu-store",
  storageBucket: "kwetu-store.appspot.com",
  messagingSenderId: "214380482063",
  appId: "1:214380482063:web:de4cb0a4c43252c9a81d7a",
  measurementId: "G-K0ZTBTB8TY"
};

 


// apiKey: "AIzaSyBgvFz8noj6AUZlsLEQSCFc2doHRrZoATs",
//   authDomain: "arthub-2baca.firebaseapp.com",
//   projectId: "arthub-2baca",
//   storageBucket: "arthub-2baca.appspot.com",
//   messagingSenderId: "422949007958",
//   appId: "1:422949007958:web:dcce43b0eefbd49ff741f7",
//   measurementId: "G-MSWM5DG1PL"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
