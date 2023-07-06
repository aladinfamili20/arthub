import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
 
const loginWithYahoo = () => {
    const auth = getAuth();

    const provider = new OAuthProvider('yahoo.com');
    signInWithPopup(auth, provider)
  .then((result) => {
    // IdP data available in result.additionalUserInfo.profile
    // ...

    // Yahoo OAuth access token and ID token can be retrieved by calling:
    const credential = OAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    const idToken = credential.idToken;
  })
  .catch((error) => {
    // Handle error.
    console.log(error)
  });
}

export default loginWithYahoo