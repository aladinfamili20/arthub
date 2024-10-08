import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
 
const ArtistsFetchCol = (collectionName, userID) => {
  const [artist, setArtist] = useState(null); // Change to a single artist object
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, where("userID", "==", userID));
      onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setArtist({ id: doc.id, ...doc.data() });
        } else {
          setArtist(null);
          toast.error("No matching artist found.");
        }
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCollection();
  }, [userID]); // Re-fetch data when profID changes

  return { artist, isLoading };
};

export default ArtistsFetchCol;
