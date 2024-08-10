import React, { useEffect, useState } from 'react';
import '../Styles/ArtistPage.css';
import ArtistsFetchCol from '../customHooks/ArtistsFetchCol';
import { Link, useNavigationType, useParams } from 'react-router-dom';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const ArtistPage = () => {
  const { userID } = useParams();
  const { artist, isLoading } = ArtistsFetchCol('artistHubUsers', userID);
  const [artistData, setArtistData] = useState(null);
  const navigation = useNavigationType();

  useEffect(() => {
    if (artist) {
      console.log('Fetched artist data:', artist);
      setArtistData(artist);
    }
  }, [artist]);

  const [artworks, setArtworks] = useState([]);
  const [loadArts, setLoadArts] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworksRef = collection(db, 'posts');
        const q = query(artworksRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        const artsDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArtworks(artsDocs);
        setLoadArts(false);
      } catch (error) {
        console.error('Error fetching artwork data:', error);
        setLoadArts(false);
      }
    };

    if (userID) {
      setLoadArts(true);
      fetchArtworks();
    }
  }, [userID]);

  return (
    <section className='artistmainCon'>
      {isLoading ? (
        <h1 style={{ marginTop: 40, fontSize: 20 }}>Loading...</h1>
      ) : (
        <div className='artistsContents'>
          <img src={artistData?.profImg} alt='profImg' />
          <div>
            <h1>{artistData?.displayName}</h1>
            <p>{artistData?.bio}</p>
          </div>
        </div>
      )}


      <div className='divider' style={{marginTop: 50}}></div>

      {loadArts ? (
        <h1>Loading arts</h1>
      ) : (
        <div className='artitsArtworksContainer'>
          {artworks.map((art) => (
            <div className='artistConent' key={art.id}>
              <Link to={`/product-details/${art.id}`}>
                <img src={art?.image} alt='art' />
              </Link>             
               
              <div>
                <h2>{art?.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ArtistPage;
