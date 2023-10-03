import React,{useEffect, useState} from 'react'
import '../Styles/Profile.css'
import { getAuth,   onAuthStateChanged } from 'firebase/auth'
  import {collection , where, query, getDocs, getDoc, doc, orderBy,  } from "firebase/firestore";
 import { db } from '../firebase/config';
import CustomerOrder from '../pages/Customer/CustomerOrder';
  
      const Profile =()=>{  
      const [prof, setProf] = useState([]);
  const auth = getAuth();  
 

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

        fetchArtist()
    }
  })      
},[]) 
 
          return (
      <section>                
  <section>
     <div className='prof1'>       
    <div className='artProfileContainer'>  
    <div>      
    <div className='profileContainer1'>       
    <input type='file' id='profileImage' 
    style={{display:'none'}}/>
  {
    prof.map((profName)=>
 (
        <>
        <div>
        <h1>
          {profName.displayName} {profName.lastName} 
        </h1>
        <h1>
          {profName.email} 
        </h1>
        </div>
        </>
        
      )
)
  }  
    </div>  
      <CustomerOrder/>
    </div>           
    </div>       
    </div>      
  </section>              
      </section>
    ) 
}
    
  
 

export default Profile