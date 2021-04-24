import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBfXiF_s7goT1jom5QJn4MmDjABiBSeRw8",
  authDomain: "robinhood-react-84145.firebaseapp.com",
  projectId: "robinhood-react-84145",
  storageBucket: "robinhood-react-84145.appspot.com",
  messagingSenderId: "933066354051",
  appId: "1:933066354051:web:476efd465b073d414c1ab6",
  measurementId: "G-7X0N450FWP"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };