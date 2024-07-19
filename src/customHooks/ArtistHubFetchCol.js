import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { useAuth } from "../auth/AuthContext";
 const ArtistHubFetchCol = (collectionName) => {
    const [artistHub, setArtist] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useAuth()

  const getCollection = () => {
     setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          user:user.uid,
          ...doc.data(),
        }));
        // console.log(allData);
        setArtist(allData);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { artistHub, isLoading };
};

export default ArtistHubFetchCol;
