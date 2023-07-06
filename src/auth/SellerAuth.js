import React, { useState } from 'react'
import '../Styles/signup.css'
import {createUserWithEmailAndPassword}from 'firebase/auth'
import {auth } from '../backend/firebase'
import {useNavigate} from 'react-router-dom'
 

const Signup = () => {
// firebase data base variables
const navigate = useNavigate(); 
const [email, setEmail] = useState('')
const [password, setPassword] = useState('');
const [username, setUsername] = useState('');
 const [displayName, setDisplayName] = useState('');    
const signup = (e) => {
e.preventDefault();
createUserWithEmailAndPassword(auth, email, password, displayName)
.then((authUser)=>{
// return authUser.user.updateProfile({
// displayName:username
// })
console.log(authUser)
navigate('/')  
})
.catch((error)=>alert(error.message))   
}    

 return (
<main>
<section>
<div className='upContainer'>
    <div className='sellerH1'>
        <h1>Sign up to become an Artist</h1>
    </div>
 <div className='upContent'>
<div className='upImg'>
<img src={require('../images/Peter Wu/62.png')} alt='Netflix Logo' />
</div>
<div className='upInfo'>
<h1>Sign Up</h1>
<div className='upInfoConetents'>
<form className='form'>
<input 
type='text' placeholder='Full Name'
className='signInput' value={displayName} 
onChange={(e)=>setDisplayName(e.target.value)}
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
onClick={signup}
>Sign Up</button>

{/* <button className='signButton'
type="submit" 
onClick={()=>navigate.push('/addpost')}
>Sign Up</button> */}
<small>Already have an account? <a href='/login' className='sgnupin'>Sign In</a></small>
<div>
<small>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</small>  
</div>
 

</div>
</div>
</div>
</div>
</section>
</main>
)
}

export default Signup