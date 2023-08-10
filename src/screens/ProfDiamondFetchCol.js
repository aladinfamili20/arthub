import {collection , where, query, getDocs, getDoc, doc, orderBy, deleteDoc, onSnapshot} from "firebase/firestore";
import { useEffect, useState } from "react";
 import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ProfDiamondFetchCol = (collectionName) => {
  const [diamondArtworks, setDiamond] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user){
        const uid =  user.uid;
        console.log(uid)
        const artistDocRef = doc(db, 'users', uid);
        const fetchArtist = async () => {
          const docSnap = await getDoc(artistDocRef);
          setDiamond([{...docSnap.data(), id: docSnap.id}]);
        };
        fetchArtist();
        const fetchData = async () => {
          const timestamp = ('timestamp', 'desc')
            const citiesRef = collection(db, collectionName);
          const querySnapshot = query(citiesRef, 
            where("userID", "==", uid));  
          orderBy(timestamp);
          const snapshot = await getDocs(querySnapshot);
          console.log(snapshot)
          const documents = snapshot.docs.map((doc) => ({
           id: doc.id,
              ...doc.data(),
             }));
             setDiamond(documents);
        };    
        fetchData();
      }
    })      
  },[]) 

  return { diamondArtworks, isLoading };
};

export default ProfDiamondFetchCol;
