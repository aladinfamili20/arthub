import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
 import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";

const useFetchCollection = (collectionName) => {
  const [isLoading, setIsLoading] = useState(false);
  const [artistOrders, setartistOrders]=useState([]) 

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user){
        const uid =  user.uid;
        console.log(uid)
        const artistDocRef = doc(db, 'orders', uid);
        const fetchArtist = async () => {
          const docSnap = await getDoc(artistDocRef);
          setartistOrders([{...docSnap.data(), id: docSnap.id}]);
        };
        fetchArtist();
        const fetchData = async () => {
          const timestamp = ('timestamp', 'desc')
          const citiesRef = collection(db, collectionName);
          const querySnapshot = query(citiesRef, 
            where("userID", "==", uid));  
          orderBy(timestamp);
          const snapshot = await getDocs(querySnapshot);
          const artistOrders = []
          snapshot.docs.forEach(doc => {
            const orderDoc = doc.data()
            console.log(doc)
            const orderSellerId = orderDoc.cartItems[0].userID
            if (orderSellerId === uid){
              artistOrders.push(doc)
            }
          })

          const documents = artistOrders.map((doc) => ({
           id: doc.id,
              ...doc.data(),
             }));
             setartistOrders(documents);
        };    
        fetchData();
      }
    })      
  },[]) 

  return { artistOrders, isLoading };
};

export default useFetchCollection;
