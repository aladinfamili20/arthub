import React,{useEffect, useState} from 'react'
import '../Styles/Profile.css'
import { getAuth,   onAuthStateChanged } from 'firebase/auth'
import {collection , where, query, getDocs, getDoc, doc, orderBy,  } from "firebase/firestore";
import { db } from '../firebase/config';
import CustomerOrder from '../pages/Customer/CustomerOrder';
import ArtistOrder from '../pages/Artist/ArtistOrders';

import { IoChevronDownCircle } from 'react-icons/io5';
import ArtistsFetchCol from "../customHooks/ArtistsFetchCol";

const Profile =()=>{  
const [prof, setProf] = useState([]);
const auth = getAuth();  
let isArtist = false

 useEffect(() => {
  onAuthStateChanged(auth, (user)=>{
    if (user){
      const uid =  user.uid;
      const {artist} = ArtistsFetchCol('profileUpdate')
      console.log(artist)
      artist.forEach(artist=>{
        if (uid == artist.id){
          isArtist = true  
          console.log("isArtist:" , isArtist)
        }
      })
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
    {isArtist ? (
        <CustomerOrder/>
      ) : (
        <ArtistOrder />
      )}
    </div>           
    </div>       
    </div>      
  </section>              
      </section>
    ) 
}
    
  
 

export default Profile