import firebase from 'firebase/compat/app';

import "firebase/compat/auth";


const config ={
  apiKey: "AIzaSyCau3nhShCUDB96-wpjNL2TviZW7_jXBzQ",
  authDomain: "ozioma-db.firebaseapp.com",
  projectId: "ozioma-db",
  storageBucket: "ozioma-db.firebasestorage.app",
  messagingSenderId: "741002159624",
  appId: "1:741002159624:web:f4ff12de5b290b086d13bd",
  measurementId: "G-3HMG53Q17P"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle =()=>auth.signInWithPopup(provider);

export default firebase;