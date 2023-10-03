import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
 import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";

const useFetchCollection = (collectionName) => {
  const [isLoading, setIsLoading] = useState(false);
  const [custumerOrder, setCustumerOrder]=useState([]) 

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user){
        const uid =  user.uid;
        console.log(uid)
        const artistDocRef = doc(db, 'orders', uid);
        const fetchArtist = async () => {
          const docSnap = await getDoc(artistDocRef);
          setCustumerOrder([{...docSnap.data(), id: docSnap.id}]);
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
             setCustumerOrder(documents);
        };    
        fetchData();
      }
    })      
  },[]) 

  return { custumerOrder, isLoading };
};

export default useFetchCollection;
