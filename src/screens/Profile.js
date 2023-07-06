import React,{useEffect, useRef, useState} from 'react'
import '../Styles/Profile.css'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../firebase/config'
import {FaHeart, FaPlus } from 'react-icons/fa';
import { FiEdit} from 'react-icons/fi';
import {collection , where, query, getDocs, getDoc, doc, orderBy} from "firebase/firestore";
import { Link } from 'react-router-dom';
import ProfileNav from '../components/ProfileNav/ProfileNav';
import Artwork from '../components/ProfileNav/Artwork';

    const Profile =()=>{  
   const [posts, setPost]=useState([])
  const [displayName, setDisplayName]=useState('')  
 const auth = getAuth();  
 useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){
      const uid =  user.id;
      console.log(uid)
      setDisplayName(user.displayName)
    }
    else{
      setDisplayName('')
    }
  })
 }) 
  

    const CoverImg = 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'

          return (
      <section>                
  <section>
     <div className='prof1'>
    <div className='settingsH1a'>
     </div>
     <input type='file' id='CoverImg'   style={{display:'none'}}/>
    {/* cover image */}
    <div className='CoverImg' id='cover'
    // onClick={CoverImg}
    >  
    <img src={require('../images/62.JPG')}alt='' />  
    </div>
    <div className='artProfileContainer'>  
    <div>
    {/* profile image */}
     
    <div className='profileContainer1'>       
    <input type='file' id='profileImage' 
    // onChange={handleChangeProfile}      
    style={{display:'none'}}/>
    <div id='profile'
    //  onClick={profileImage}
     >
    <img src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg' />

    {/* <div className='addPhoto'>
        Add Photo
    </div> */}
    </div>
    <div>
    {/* profile informations */}
    <div className='profileInfo0'>
    <div className='profileInfo1'>
       <div>        
<h1>{displayName}</h1>
  </div>         
     <h3>Artist Type</h3>
      <h3>Location</h3>
      <h3>Bio</h3>
    </div> 
    <a href='signupdetails'><FiEdit className='icon3'/></a>
    </div>     
    </div>    
    </div>    
    </div>       
    </div>   
    </div>   
  </section>    
        <section>
        <div className='profileContainer2'>       
        
          <div className='profileInfo3'>     
          <hr></hr>      
          <>
          
       <div className='profileNav'>
      
       <nav>
          <ul  >
            <li><a href='/artworks'>Artworks</a></li>
            <li><a href='/upload'>Upload<FaPlus/></a></li>
          </ul>
        </nav>
       </div>
          
          </>
            <section>
    <Artwork/>
            </section>
          </div>
        </div>      
       </section>
       <div className='SaveText2'>
      <button>
        Save
      </button>
       </div>
      </section>
    ) 
}
    
  
 

export default Profile