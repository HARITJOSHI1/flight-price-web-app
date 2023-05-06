import React, { useContext } from "react";
import { firebase } from "../../firebaseInit";
import { Auth } from "firebase/auth";
import './styles.css';
import { AuthStateStore } from "../App";

const handleSignIn = async (auth: Auth) => {
  try {
    const { user } = await firebase.oAuth.signInWithPopup(
      auth,
      new firebase.oAuth.providers.GoogleAuthProvider()
    );

    return user;
  } catch (err) {
    console.log(err);
  }
};

const handleSignOut = async (auth: Auth) => {
  await firebase.signOut(auth);
};

export default function OAuth() {
  const auth = firebase.auth();
  const authState = useContext(AuthStateStore);

  return (
    <div className="sign-in">
      {authState.currentUser ? (
        <button className="sign-out-button" onClick={() => handleSignOut(auth)}>
          Sign Out
        </button>
      ) : (
        <button className="sign-in-button" onClick={() => handleSignIn(auth)}>
          <img
            className="google-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
          />
          Sign In with Google
        </button>
      )}
    </div>
  );
}
