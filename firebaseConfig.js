// import firebase from "@react-native-firebase/app";
// import firestore from "@react-native-firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwUYy8025eOVux8tL1py51jHtACnhVaxE",
  authDomain: "lab-4-cab.firebaseapp.com",
  projectId: "lab-4-cab",
  storageBucket: "lab-4-cab.appspot.com",
  messagingSenderId: "288398877163",
  appId: "1:288398877163:web:ca8fcebd1b40d59ddbb9ae",
  measurementId: "G-8W3VTKPZ27",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { firebase, db };
