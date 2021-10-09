import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyB5YyHpsE7ajvI4Gy2A9gnZqc5VHhaEdaM",
  authDomain: "whatsapp-web-2676e.firebaseapp.com",
  projectId: "whatsapp-web-2676e",
  storageBucket: "whatsapp-web-2676e.appspot.com",
  messagingSenderId: "610580974025",
  appId: "1:610580974025:web:aad7b4a47c4250d67b4018",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
