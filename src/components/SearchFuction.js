import React, { useState } from "react";
import '../Styles/Search.css';
import { collection, getDocs, query, where } from "firebase/firestore";
 import {  IoSearch } from 'react-icons/io5';
 import {  useNavigate } from "react-router-dom";
import { db } from "../firebase/config";

const SearchFuction = () => {
   const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const navigateToProfile = (userID) => {
    console.log('Navigating to Profile screen with user ID:', userID);
    navigate(`/artist/${userID}`);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      // Perform a Firestore query to search for users by displayName
      const displayNameQuery = query(
        collection(db, "artistHubUsers"),
        where("displayName", ">=", searchQuery),
        where("displayName", "<=", searchQuery + '\uf8ff')
      );
      const lastNameQuery = query(
        collection(db, "artistHubUsers"),
        where("lastName", ">=", searchQuery),
        where("lastName", "<=", searchQuery + '\uf8ff')
      );

      const displayNameSnapshot = await getDocs(displayNameQuery);
      const lastNameSnapshot = await getDocs(lastNameQuery);

      const results = [];

      displayNameSnapshot.forEach((doc) => {
        const user = doc.data();
        results.push(user);
      });

      lastNameSnapshot.forEach((doc) => {
        const user = doc.data();
        if (!results.find((u) => u.userID === user.userID)) {
          results.push(user);
        }
      });

      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className='search'>
      <div className='searchContainer'>
        <input 
          type='text' 
          placeholder='Search for artist' 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className='searchBar' 
        />
        <IoSearch onClick={handleSearch} className='searchIcon' />
      </div>

      <div className='searchedUsers'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResults.map((item) => (
            <React.Fragment key={item.displayName}>
              <div className="searchInfo">
                <div onClick={() => navigateToProfile(item.userID)}>
                  <img src={item.profImg} className="profileImage" alt="Profileimg" />
                </div>
                <div onClick={() => navigateToProfile(item.userID)}>
                <div className="displayName">
                  <h2>{item.displayName} {item.lastName}
                  <p>Artist</p>
                  </h2>
                   
                </div>
                </div>
              </div>
              {/* <div className="divider"></div> */}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchFuction;
