import firebase from 'firebase';
import API_KEY from './API_KEY.config';

var firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "socialreact-d64cb.firebaseapp.com",
    databaseURL: "https://socialreact-d64cb-default-rtdb.firebaseio.com",
    projectId: "socialreact-d64cb",
    storageBucket: "socialreact-d64cb.appspot.com",
    messagingSenderId: "359293089403",
    appId: "1:359293089403:web:e9b73b74904d05a22114de",
    measurementId: "G-NLF2QVSDMH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;

