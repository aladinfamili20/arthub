import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext'; // Initialize Firebase and get the user.
import { getDatabase, ref, query, equalTo, onValue } from 'firebase/database';

function ArtistProfile() {
  const user = useAuth(); // Custom hook to get the authenticated user.
  const [soldArtworks, setSoldArtworks] = useState([]);
  
  useEffect(() => {
    if (user) {
      // Fetch the sold artworks for the artist based on their UID.
      const artistUID = user.uid;
      const db = getDatabase();
      const artworksRef = ref(db, 'orders');
      const soldArtworksQuery = query(artworksRef, equalTo('artistUID', artistUID), equalTo('status', 'sold'));

      // Listen for changes to the artworks and filter for the sold ones.
      const soldArtworksCallback = (snapshot) => {
        const soldArtworksForArtist = [];
        const data = snapshot.val();

        for (const key in data) {
          soldArtworksForArtist.push(data[key]);
        }

        setSoldArtworks(soldArtworksForArtist);
      };

      const soldArtworksRef = onValue(soldArtworksQuery, soldArtworksCallback);

      // Cleanup the listener when the component unmounts.
      return () => {
        soldArtworksRef();
      };
    }
  }, [user]);

  return (
    <div>
      <h1>My Sold Artworks</h1>
      <ul>
        {soldArtworks.map((artwork) => (
          <li key={artwork.key}>{artwork.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistProfile;
