import React,{useEffect, useState} from 'react'
import '../Styles/Profile.css'
import { getAuth,   onAuthStateChanged } from 'firebase/auth'
 import { FaPlus } from 'react-icons/fa';
 import {collection , where, query, getDocs, getDoc, doc, orderBy, deleteDoc, onSnapshot} from "firebase/firestore";
 import Artwork from '../components/ProfileNav/Artwork';
import { db } from '../firebase/config';
import { Link } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';
 
      const ArtistProfile =()=>{  
      const [prof, setProf] = useState([]);
      // const [isLoading, setIsLoading] = useState(false);
   const [displayName, setDisplayName]=useState('')  
  //  const {user} = useAuth()
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

 useEffect(() => {
  onAuthStateChanged(auth, (user)=>{
    if (user){
      const uid =  user.uid;
      console.log(uid)
      const artistDocRef = doc(db, 'users', uid);
      const fetchArtist = async () => {
        const docSnap = await getDoc(artistDocRef);
        setProf([{...docSnap.data(), id: docSnap.id}]);
      };
      fetchArtist();
      const fetchData = async () => {
        const timestamp = ('timestamp', 'desc')
          const citiesRef = collection(db, 'profileUpdate');
        const querySnapshot = query(citiesRef, 
          where("profID", "==", uid));  
        orderBy(timestamp);
        const snapshot = await getDocs(querySnapshot);
        console.log(snapshot)
        const documents = snapshot.docs.map((doc) => ({
         id: doc.id,
            ...doc.data(),
           }));
           setProf(documents);
      };    
      fetchData();
    }
  })      
},[]) 
 
          return (
      <section>                
  <section>
     <div className='prof1'>
    <div className='settingsH1a'>
     </div> 
     <input type='file' id='CoverImg'   style={{display:'none'}}/>
    {/* cover image */}
   
    <div className='artProfileContainer'>  
    <div>
    {/* profile image */}
     
    <div className='profileContainer1'>       
    <input type='file' id='profileImage' 
    style={{display:'none'}}/>
 
 { 

  prof.map((profile)=>{
    return (
      <>
      <div id='profile'>
       
      <img src={profile.profImage} alt='profImage' /> 
      </div>
      <div>
      {/* profile informations */}
      <div className='profileInfo0'>
      <div className='profileInfo1'>
         <div>        
  {/* <h1>{profile.firstName} {profile.lastName}</h1> */}
  <h1>{displayName}</h1>
    </div>         
         
        <h3>Location: {profile.country}</h3>
        <h3>Email: {profile.email}</h3>
        <h3>Phone: {profile.phone_number}</h3>
        <h3>Bio: {profile.desc}</h3>
      </div> 
       </div>     
      </div> 
      </>
    )
  })
 
   
    }
   
    </div>    
    </div>       
    <div className='editProf' >
 

 <Link to={'/editprofile'}>
 <a>
 <button className='btn'>
  Edit Profile
  </button>
 </a>
 </Link>
 </div>
    </div>       
    </div>  
  

    <>
    <div className='profileInfo3' id='profileContainer2'>
      <hr></hr>
      <div className='profileNav'>      
       <nav>
          <ul  >
             <li><a href='/addArtwork/ADD'>Upload<FaPlus/></a></li>
          </ul>
        </nav>
       </div>
    <Artwork/>
    </div>
    </>

 
  </section>    
         
 
      </section>
    ) 
}
    
  
 

export default ArtistProfile