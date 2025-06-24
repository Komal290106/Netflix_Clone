import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAoF_vMd0Y7haRe-ErgZRS8ogJT5tjReNQ",
  authDomain: "netflix-clone-e331c.firebaseapp.com",
  projectId: "netflix-clone-e331c",
  storageBucket: "netflix-clone-e331c.firebasestorage.app",
  messagingSenderId: "958090119070",
  appId: "1:958090119070:web:79c4effc8f880275a9388f",
  measurementId: "G-NJ27QJEQJL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) =>{
   try{
     const response = await createUserWithEmailAndPassword(auth, email, password);
     const user = response.user;
     await addDoc(collection(db, "users"), {
         uid: user.uid,
         name,
         authProvider: "local",
        email,
     });
   } catch (error) {
     console.log( error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const login = async (email, password) => {
try {
    await signInWithEmailAndPassword(auth, email, password);
} catch (error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}

} 

const logout = () => {
    signOut(auth);
}

export {auth, db, signup, login, logout};