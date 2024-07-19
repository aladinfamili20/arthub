import React, { useEffect, useState } from 'react';
import '../Styles/Artist.css';
import ArtistsFetchCol from '../customHooks/ArtistsFetchCol';
import { IoLocationOutline, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoMailOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const Artists = () => {
  const { profID } = useParams();
  const { artist, isLoading } = ArtistsFetchCol('profileUpdate', profID);
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    if (artist) {
      console.log('Fetched artist data:', artist);
      setArtistData(artist);
    }
  }, [artist]);

  return (
    <section className='artistmainCon'>
      {isLoading ? (
        <h1 style={{ marginTop: 40, fontSize: 20 }}>Loading...</h1>
      ) : (
        <>
          <div className="header"></div>
          <div className="row">
            <div className="col-3 col-s-3 menu1">
              <img src={artistData?.profImage} alt='profileimage' />
            </div>
            <div className="col-6 col-s-9">
              <p>{artistData?.desc}</p>
            </div>
            <div className="col-3 col-s-12">
              <div className="aside">
                <div>
                  <h2>{artistData?.displayName} {artistData?.lastName}</h2>
                  <h2 className='oilineicons'>
                    <IoMailOutline />
                    {artistData?.email}
                  </h2>
                  <h2 className='oilineicons'>
                    <IoLocationOutline />
                    {artistData?.country}
                  </h2>
                  <h2>
                    <a href={artistData?.insta} target='blank' className='oilineicons'>
                      <IoLogoInstagram /> Follow
                    </a>
                  </h2>
                  <h2>
                    <a href={artistData?.twitter} target='blank' className='oilineicons'>
                      <IoLogoTwitter /> Follow
                    </a>
                  </h2>
                  <h2>
                    <a href={artistData?.facebook} target='blank' className='oilineicons'>
                      <IoLogoFacebook /> Follow
                    </a>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Artists;
