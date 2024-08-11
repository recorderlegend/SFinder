import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4K0JbOhXUgOl9v4n6wKwQO3CDshtpROM",
    authDomain: "sfinder-949a5.firebaseapp.com",
    projectId: "sfinder-949a5",
    storageBucket: "sfinder-949a5.appspot.com",
    messagingSenderId: "967191432335",
    appId: "1:967191432335:web:a6ef0208f54b9da8f7f4fa"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };