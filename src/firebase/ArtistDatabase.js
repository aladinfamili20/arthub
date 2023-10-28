import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBgvFz8noj6AUZlsLEQSCFc2doHRrZoATs",
    authDomain: "arthub-2baca.firebaseapp.com",
    projectId: "arthub-2baca",
    storageBucket: "arthub-2baca.appspot.com",
    messagingSenderId: "422949007958",
    appId: "1:422949007958:web:dcce43b0eefbd49ff741f7",
    measurementId: "G-MSWM5DG1PL"
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
export const artAuth = getAuth(app);
export const artDB = getFirestore(app);
export const ArtStorage = getStorage(app);

export default app;
