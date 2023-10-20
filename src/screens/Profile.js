import React,{useEffect, useState} from 'react'
import '../Styles/Profile.css'
import { getAuth,   onAuthStateChanged, signOut } from 'firebase/auth'
import { getDoc, doc,  } from "firebase/firestore";
import { db } from '../firebase/config';
import CustomerOrder from '../pages/Customer/CustomerOrder';
// import ArtistOrder from '../pages/Artist/ArtistOrders';

// import { IoChevronDownCircle } from 'react-icons/io5';
import ArtistsFetchCol from "../customHooks/ArtistsFetchCol";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoLogOut } from 'react-icons/io5';
// import { useAuth } from '../auth/AuthContext';
 const Profile =()=>{  
  const navigate = useNavigate();

  // const {user} = useAuth()
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
const [prof, setProf] = useState([]);
const [displayName, setDisplayName] = useState(null)
const auth = getAuth();  
let isArtist = false

 useEffect(() => {
  onAuthStateChanged(auth, (user)=>{
    if (user){
      const uid =  user.uid;
      setDisplayName(user.displayName)
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
   
        <>
        <div className='ProfileContainerInformations'>
        <h1>
          {displayName} 
        </h1>
        {/* <h1>
          {user.email} 
        </h1> */}
         <div className='logOut' onClick={logoutUser}>
        <h2><IoLogOut/> Log out</h2>
         </div>
         </div>
        </>
 
 
    </div>  
    {/* {isArtist ? (
        <CustomerOrder/>
      ) : (
        <ArtistOrder />
      )} */}

 
        <CustomerOrder/>
 
 
 
    </div>           
    </div>       
    </div>      
  </section>              
      </section>
    ) 
}
    
  
 

export default Profile