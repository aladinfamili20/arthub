import React from "react";
// hover over the CSS impost and press the Ctrl key to got to the CSS file for this page.
import "../Styles/ArtistsHub.css";
import ArtistHubFetchCol from "../customHooks/ArtistHubFetchCol";
import { useNavigate } from "react-router-dom";
const ArtistHub = () => {
  const navigate = useNavigate();

  const navigateToProfile = (userID) => {
    console.log("Navigating to Profile screen with user ID:", userID);
    navigate(`/artist/${userID}`);
  };
  const { artistHub } = ArtistHubFetchCol("artistHubUsers");

  return (

    // Change will update automatically once saved.
    <div className="ArtHubContainer">
      <div className="ArtHubSection1">
        <div className="section1"></div>

        <div className="ArtHubSection2">
          {artistHub.map((gall, index) => (
            <>
              <div className="ArtHubGrid" key={index}>
                <div onClick={() => navigateToProfile(gall.userID)}>
                  <img src={gall.profImg} alt="gallery" />
                </div>
                <h2>{gall.displayName}</h2>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistHub;
