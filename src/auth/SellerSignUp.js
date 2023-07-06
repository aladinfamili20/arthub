import React, { useState } from 'react'
import '../Styles/signup.css'
import {createUserWithEmailAndPassword}from 'firebase/auth'
import {auth } from '../backend/firebase'
import {useNavigate} from 'react-router-dom'
import '../Styles/SellerSignup.css'
import {NavLink} from 'react-router-dom'
import Login from './Login'


const Signup = () => {
// firebase data base variables
const navigate = useNavigate(); 
const [email, setEmail] = useState('')
const [password, setPassword] = useState('');
const [username, setUsername] = useState('');
const [firstName, setFistName]=useState('')
const [lastName, setLastName]=useState('')
 const [displayName, setDisplayName] = useState('');    
const signup = (e) => {
e.preventDefault();
createUserWithEmailAndPassword(auth, email, password, displayName)
.then((authUser)=>{
// return authUser.user.updateProfile({
// displayName:username
// })
console.log(authUser)
navigate('/addpost')  
})
.catch((error)=>alert(error.message))   
}    

 return (
<main>
<section>
<div className='upContainer' id='sellMain'>
<form>
{/* <div className='sellForm'>
<h1>
    Become an Artist
  </h1>
</div> */}
<div className='upContent' id='SellerLogin'>   
 <div className='loginMainContainer'  >
         <section className='loginContainer'>
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
                     // onClick={onLogin}                                 
                     >Log in</button>                   
                     <div>                                         
                     </div>
                     
                 </div>
              </div>
       </section>
         </div>
 
 <div className='upInfo' id='SellerInfo'>
 <h1>Sign Up</h1>
 <div className='upInfoConetents'>
 <form>
 <input 
 type='text' placeholder='First Name'
 className='signInput' value={firstName} 
 onChange={(e)=>setFistName(e.target.value)}
 id='fullName'/> 
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
</form>
</div>
</section>
</main>
)
}

export default Signup