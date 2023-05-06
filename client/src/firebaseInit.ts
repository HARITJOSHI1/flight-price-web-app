import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDfkYspBpkwiok7ZwATg8Z6niXB9ueeupg",
    authDomain: "o-auth-339406.firebaseapp.com",
    projectId: "o-auth-339406",
    storageBucket: "o-auth-339406.appspot.com",
    messagingSenderId: "709046278479",
    appId: "1:709046278479:web:5b0d6578e472fa4c3b0d3a",
    measurementId: "G-78EZXMC0W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebase = {
  auth: getAuth.bind(null, app),
  signOut,
  oAuth: {
    signInWithPopup,
    providers: {
      GoogleAuthProvider
    }
  },
};
