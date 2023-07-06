 import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

const loginWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;  
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log(user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      console.log(error)
      const errorCode = error.code;       
    });
}

export default loginWithTwitter