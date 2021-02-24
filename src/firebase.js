import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCfeCKs5Vt1amrU_xt0nqOHcXBHpnLHpGQ",
  authDomain: "todoapp-ca23f.firebaseapp.com",
  projectId: "todoapp-ca23f",
  storageBucket: "todoapp-ca23f.appspot.com",
  messagingSenderId: "429722728213",
  appId: "1:429722728213:web:37eba8f2e559b64c929b1c",
  measurementId: "G-0L0L3TCHK4"
});

const db = firebaseApp.firestore();

export default db;