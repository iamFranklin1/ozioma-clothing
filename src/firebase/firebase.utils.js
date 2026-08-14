// Import Firebase v9 modular SDK
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, writeBatch, collection} from "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCau3nhShCUDB96-wpjNL2TviZW7_jXBzQ",
  authDomain: "ozioma-db.firebaseapp.com",
  projectId: "ozioma-db",
  storageBucket: "ozioma-db.firebasestorage.app",
  messagingSenderId: "741002159624",
  appId: "1:741002159624:web:f4ff12de5b29bb886d13bd",
  measurementId: "6-3HM653017P"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const createAuthUserWithEmailAndPassword =(email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Create user profile document
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', userAuth.uid);

  const snapShot = await getDoc(userRef);


  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
    
    }
  }

  return userRef;
};

export const addCollectionAndDocuments =async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db,collectionKey);
  
  const batch =writeBatch(db);
  objectsToAdd.forEach(obj =>{
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef,obj);
  });

  await batch.commit();
};

  export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc =>{
   const {title,items} =doc.data();

   return{
    routeName: encodeURI(title.toLowerCase()),
    id: doc.id,
    title,
    items
   };
  });
  return transformedCollection.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  },{});
};

export const getCurrentUser = () =>{
  return new Promise ((resolve, reject) =>{
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth)
    }, reject)
  });
}

export default firebaseApp;