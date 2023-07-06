import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const loginInWithMicrosoft = () => {
    const auth = getAuth();
    const provider = new OAuthProvider('microsoft.com');
    signInWithPopup(auth, provider)
    .then((result) => {
      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
      console.log(accessToken)
      console.log(idToken)
    })
    // provider.setCustomParameters({
    //     prompt: "consent",
    //     tenant: "the tenant id provided by outlook",
    //   })
    .catch((error) => {
      console.log(error)
    });
}

export default loginInWithMicrosoft