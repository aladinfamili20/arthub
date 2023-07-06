import React, { useEffect, useState } from 'react'
import {collection , where, query, getDocs, getDoc, doc, orderBy} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
 import '../../Styles/AddPost.css'
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';

const Artwork = () => {
  const [posts, setPost]=useState([])
  const auth = getAuth();  
 
 useEffect(() => {
  onAuthStateChanged(auth, (user)=>{
    if (user){
      const uid =  user.uid;
      console.log(uid)
      const artistDocRef = doc(db, 'users', uid);
      const fetchArtist = async () => {
        const docSnap = await getDoc(artistDocRef);
        setPost([{...docSnap.data(), id: docSnap.id}]);
      };
      fetchArtist();
      const fetchData = async () => {
        const timestamp = ('timestamp', 'desc')
          const citiesRef = collection(db, "posts");
        const querySnapshot = query(citiesRef, 
          where("userID", "==", uid));  
        orderBy(timestamp);
        const snapshot = await getDocs(querySnapshot);
        console.log(snapshot)
        const documents = snapshot.docs.map((doc) => ({
         id: doc.id,
            ...doc.data(),
           }));
           setPost(documents);
      };    
      fetchData();
    }
  })      
},[]) 
  return (
    <>
    <div className='artsection' id='artsection'>  
<section>        
       <div className='artsection' id='artsection'>
 {
  posts.map((post)=>(
    <div className='artwork' key={post.id}>
  <div className='artcollectionbox'>   
  <div>    
 <Link to={`/product-details/${post.id}`}>
 <img src={post.image} alt=""/>  
 </Link> 
  </div>
  <div className='artcollectInfo'>
  <div>           
   <h1>{post.displayName}</h1>
   <h2>{post.name}</h2>
  <p>{post.medium}</p>
  <p>{post.size}</p>
  <p>${post.price}</p>
  </div>
   </div>
   </div>
    </div>
  ))
}
</div>         
   </section> 
</div>
    </>
  )
}

export default Artwork