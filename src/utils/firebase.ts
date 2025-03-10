import {initializeApp} from 'firebase/app'
import {getFirestore, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


console.log(import.meta.env)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const DB = getFirestore(firebaseApp);
const AUTH = getAuth(firebaseApp);

export {DB, AUTH, doc}
