import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBYWp_2L5WiXAbjwsZouS5uaT4FDWYwmlE",
    authDomain: "thao-crwn-clothing.firebaseapp.com",
    projectId: "thao-crwn-clothing",
    storageBucket: "thao-crwn-clothing.appspot.com",
    messagingSenderId: "877881596667",
    appId: "1:877881596667:web:27c23deae075586819ee5e",
    measurementId: "G-TVKJFKSZCB"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;