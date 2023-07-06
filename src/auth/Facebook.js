  import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const loginInWithFacebook = () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
     signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;             
        console.log(user)         
      }).catch((error) => {        
       console.log(error)
      });
    
}

export default loginInWithFacebook