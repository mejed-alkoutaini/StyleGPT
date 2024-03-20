import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBh97c6YZnl0gA0erRTwlc3eZTBsKsCFqY",
    authDomain: "roomai-af76d.firebaseapp.com",
    projectId: "roomai-af76d",
    storageBucket: "roomai-af76d.appspot.com",
    messagingSenderId: "1096651391177",
    appId: "1:1096651391177:web:d84decdacd820b80954d18",
    measurementId: "G-MS2W6K51LV",
  });
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const storage = firebase.storage();
export default firebase;
