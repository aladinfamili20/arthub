import React, { useState } from 'react'
import '../Styles/Login.css'
import { getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useNavigate} from 'react-router-dom'     
// import signWithGoogle from '../auth/Google' 
// import loginInWithFacebook from '../auth/Facebook';
// import loginWithYahoo from '../auth/Yahoo';
// import loginWithTwitter from '../auth/Twitter';
import {  GoogleAuthProvider,signInWithPopup,FacebookAuthProvider,TwitterAuthProvider,OAuthProvider } from "firebase/auth";
 
 const Login = ()=>{ 
    const navigate = useNavigate();
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [username, setUsername]=useState('')
    const [displayName, setDisplayName] = useState('');
    const auth = getAuth();
    // const authUser = auth.currentUser;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [photoURL, setPhotoURL] = useState('');

    // logos

    const Facebook = ''
    const onLogin =(e)=>{
      const auth = getAuth();
      e.preventDefault();
      const authUser = auth.currentUser;
       signInWithEmailAndPassword(auth, email, password, )
      .then((userCredential) => {
        //Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
        updateProfile(authUser, {
          displayName: displayName,
        })
        navigate('/profile')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        alert('User not signed in, with correct credentials')
        
      })
    }


    // Facebook
 

      // Twitter

    


    const signWithGoogle = ()=>{
      // const navigate = useNavigate()
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
         const user = result.user       
        //  navigate('/profile') 
      }).catch((error) => {
           const errorCode = error.code;
        });
    }


    // Yahoo

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
 
      return (
      <div className='loginMainContainer'>
        <section className='loginContainer'>
        {/* <div className='upImg'>
   <img src='https://images.unsplash.com/photo-1536849460588-696219a9e98d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80' alt='Netflix Logo' />
   </div> */}
        <div className='LoginInfo'>
                <h1>Log In</h1>
                <div className='LoginInfoConetents'>
      <form> 
      <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'
      className='LoginInput' 
      />
      <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='LoginInput' 
        id='password'/>
      </form>
       
      <button className='LoginButton'
      type='submit'
      onClick={onLogin}              
      >Log in</button>   
      {/* <p>Log in with:</p> */}
      {/* <div className='ServiceLogins'>             
      <div>
      <div className='faceTweet'>
      <div 
        className='SocialButtons'
      onClick={signWithGoogle}> <img src={require('../images/Logos/Google.png')} alt='facebook logo'/><h4> Continue with Google</h4>
      </div>
      <div className='SocialButtons'
      onClick={loginWithYahoo}>
       <img src={require('../images/Logos/Yahoo.png')} alt='facebook logo'/><h4> Continue with Yahoo</h4>
      </div>
      </div>
      </div>  
       <div>      
      </div>     
      </div>               */}
      <small>Don't have account? <a href='/Signup' className='sgnupin'>Sign up</a></small>
   <div>
   <small>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</small>  
   </div>
                </div>
             </div>
      </section>
        </div>
    )
      }



      // Sign in With Google

      
 
 export default Login