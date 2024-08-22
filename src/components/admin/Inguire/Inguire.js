import React, { useEffect, useState } from 'react'
import '../Inguire/Inguire.css'
import { collection, getDocs,query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { IoSearch } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
 const Inguire = () => {
  const [inguire, setInguire] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquires = async () => {
      try {
        const citiesRef = collection(db, "inquire");
        const querySnapshot = await getDocs(citiesRef);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInguire(documents);
      } catch (error) {
        console.error("Error fetching inquires:", error);
      }
    };

    fetchInquires();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);

      // Perform a Firestore query to search by inguireId or customerDisplayName
      const inguireQuery = query(
        collection(db, "inquire"),
        where("inguireId", ">=", searchQuery),
        where("inguireId", "<=", searchQuery + '\uf8ff')
      );
      const customerQuery = query(
        collection(db, "inquire"),
        where("customerDisplayName", ">=", searchQuery),
        where("customerDisplayName", "<=", searchQuery + '\uf8ff')
      );

      const [inguireSnapshot, customerSnapshot] = await Promise.all([
        getDocs(inguireQuery),
        getDocs(customerQuery)
      ]);

      const results = [...inguireSnapshot.docs, ...customerSnapshot.docs].map(doc => doc.data());

      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setIsLoading(false);
    }
  };

  const navigateToArtwork = (productId) => {
    console.log('Navigating to Profile screen with user productId:', productId);
    navigate(`/product-details/${productId}`);
  };



  return (
    <div className='inguireContainer'>
      <div className='search'>
        <div className='searchContainer'>
          <input 
            type='text' 
            placeholder='Search for inquire ID' 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className='searchBar' 
          />
          <IoSearch onClick={handleSearch} className='searchIcon' />
        </div>

        <div className='searchedUsers' id='searchedUsers'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            searchResults.map((item) => (
              <React.Fragment key={item.inguireId}>
                <div className="searchInfo" id='searchInfo'>
                   
                  <div onClick={() => navigateToArtwork(item.product.id)}>
                    {/* Display the artwork image */}
                    {item.product.image && (
                      <>
                      <img src={item.product.image} className="profileImage" alt="Artwork" />
                      <h1>{item.product.displayName}</h1>
                      <h2>{item.product.name}</h2>
                      </>
                    )}
                  </div>
 
                  
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Inguire ID</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inguire.map((inguireId, index) => (
            <tr key={inguireId.id}>
              <td>{index + 1}</td>
              <td>{inguireId.customerDisplayName}</td>
              <td>{inguireId.customerEmail}</td>
              <td>{inguireId.customerPhone}</td>
              <td>{inguireId.inguireId}</td>
              <td>
                <textarea>
                {inguireId.customerMessage}
                </textarea>
              </td>
              <td>{inguireId.dateJoined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Inguire