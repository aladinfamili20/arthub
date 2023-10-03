import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { NavLink,useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword,AuthErrorCodes, getAuth } from 'firebase/auth'

 import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'
const Registration =()=>{
const { signUp, error } = useAuth();
const [displayName, setDisplayName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [errors, setErrors] = useState('')
const navigate = useNavigate()
const auth = getAuth();
// const userAuth = firebase 
const RegisterHandler = async (e) =>  {

    try{
      e.preventDefault()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const ref = doc(db, 'users', user.uid)
      const docRef =  await setDoc(ref, {displayName, 
         lastName, 
         email,
         userID:user.uid})
      navigate('/profile')
   }
   catch(error){
      if(error.code == "auth/email-already-in-use"){
         setErrors("Email already in use")
      }else if(error.code === AuthErrorCodes.WEAK_PASSWORD){
         setErrors("Password should be at least 6 characters")
      }else{
         setErrors(error.message)
      }
   }
}

  return (
    <main>
<section>
<div className='upContainer'>
<div className='upContent'>
<div className='upImg'>
<img src='https://images.unsplash.com/photo-1536849460588-696219a9e98d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80' alt='Netflix Logo' />
</div>
<div className='upInfo'>
<h1>Sign Up</h1>
<div className='signupError'>
{
      error ? (
         <span>{error}</span>
      ) :(
         errors && <span>{errors}</span>
      )
 }
</div>
<form onSubmit={RegisterHandler}>
   <div className='upInfoConetents'>
<form>
<input 
type='text' placeholder='First Name'
className='signInput' value={displayName} 
onChange={(e)=>setDisplayName(e.target.value)}
id='displayName'/> 
<input 
type='text' placeholder='Last Name'
className='signInput' value={lastName} 
onChange={(e)=>setLastName(e.target.value)}
id='fullName'/>    
<input type='email' placeholder='Email' 
label="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)} 
required
className='signInput' id='email'/>   
<input type='password' 
placeholder='Password' 
label="Password"
onChange={(e)=>setPassword(e.target.value)}
value={password}
required
className='signInput' 
id='password'/>
</form>
<button className='signButton'
type="submit" 
onClick={RegisterHandler}
>Sign Up</button>

 
<small>Already have an account? <a href='/login' className='sgnupin'>Sign In</a></small>
<div>
<small>By signing up, you agree to our <a href='privacypolicy' style={{textDecoration: 'underline'}}>Privacy and Policy</a>.</small>   
</div>
 

</div>
</form>
</div>
</div>
</div>
</section>
</main>
  )

}

export default Registration