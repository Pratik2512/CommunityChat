import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  //AIzaSyDBNlTxowlNUK94Mbd4nr3yo7UufgnESd8",
  authDomain: "collabcraze-d0632.firebaseapp.com",
  projectId: "collabcraze-d0632",
  storageBucket: "collabcraze-d0632.appspot.com",
  messagingSenderId: "815509999538",
  appId: "1:815509999538:web:811aa8e6669d6de8cf1eab",
  measurementId: "G-B0J1JMGYXV"
};



firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider()



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);