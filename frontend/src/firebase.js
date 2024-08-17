import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCYEesY_WZBAzZp5aLbc74da2OEvsnjnTI",
    authDomain: "sfinder-a421a.firebaseapp.com",
    projectId: "sfinder-a421a",
    storageBucket: "sfinder-a421a.appspot.com",
    messagingSenderId: "451019128764",
    appId: "1:451019128764:web:5dfd921e6ecb3a125235b9"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };