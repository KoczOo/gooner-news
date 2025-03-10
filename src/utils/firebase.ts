import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsUJcmUqfYbEjyw3Rr1HKHfqxc3TCy1Uw",
    authDomain: "gooner-news.firebaseapp.com",
    projectId: "gooner-news",
    storageBucket: "gooner-news.firebasestorage.app",
    messagingSenderId: "606048921369",
    appId: "1:606048921369:web:7a1f612b32be1b208e4788",
    measurementId: "G-JFERTQTHBX"
};

initializeApp(firebaseConfig);

const DB = getFirestore();
const AUTH = getAuth();

export {DB, AUTH}
