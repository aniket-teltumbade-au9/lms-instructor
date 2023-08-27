import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCn3M2YYJSB37zwO7rxpeTSHTVko2mwvL0",
  authDomain: "learnin-mangemnt-systm.firebaseapp.com",
  projectId: "learnin-mangemnt-systm",
  storageBucket: "learnin-mangemnt-systm.appspot.com",
  messagingSenderId: "1020300647208",
  appId: "1:1020300647208:web:92c0102bc2df46e9bc0e1d"
});
 
// Firebase storage reference
const storage = getStorage(app);
const db = getFirestore(app)
const auth = getAuth(app);
var provider = new GoogleAuthProvider() 
const fireReact = {storage, db, provider, auth}
export default fireReact