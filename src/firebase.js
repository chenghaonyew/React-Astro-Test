import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD4YGf81BrDEUD8Yzp8p55cxLtHLh8tlOU",
  authDomain: "astro-testing-6cdac.firebaseapp.com",
  projectId: "astro-testing-6cdac",
  storageBucket: "astro-testing-6cdac.appspot.com",
  messagingSenderId: "855036889989",
  appId: "1:855036889989:web:e09d699a8a90d5b70ad2ec",
  measurementId: "G-4RH71RZ5LT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
