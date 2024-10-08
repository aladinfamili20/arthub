import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../productDetails/ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import "../../../Styles/signup.css";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import UseFetchArtistProfDoc from "../../../customHooks/UseFetchArtistProfDoc";
import StarsRating from "react-star-rate";
import { addDoc, collection, getDocs, orderBy, where,query } from "firebase/firestore";
import { db } from "../../../firebase/config";
 const Registration = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [artistInfo, setArtistInfo] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("posts", id);
  const { artist } = UseFetchArtistProfDoc("posts", id);
  const { data } = useFetchCollection("reviews");

  const [showPopup, setShowPopup] = useState(false);
  const [customerDisplayName, setCustomerDisplayName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');
  const [getInguireId, setGetInguiredId] = useState(null)
  const filteredReviews = data.filter((review) => review.productID === id);

  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });
  useEffect(() => {
    setProduct(document);
  }, [document]);

  useEffect(() => {
    setArtistInfo(artist);
  }, [artist]);

  const handleInputChange = (e) => {
    setCustomerMessage(e.target.value);
  };

  const handleDisplayNameInputChange = (e) => {
    setCustomerDisplayName(e.target.value);
  };

  const handleEmailInputChange = (e) => {
    setCustomerEmail(e.target.value);
  };

  const handlePhoneInputChange = (e) => {
    setCustomerPhone(e.target.value);
  };



  // useEffect(() => {         
  //       // console.log(uid)
  //       const fetchData = async () => {
  //         const timestamp = ("timestamp", "desc");
  //         const q = collection(db, "posts");
  //         const querySnapshot = query(q, 
  //           // where("uid", "==", uid)
  //         );
  //         orderBy(timestamp);
  //         const snapshot = await getDocs(querySnapshot);
  //         const documents = snapshot.docs.map((doc) => {
  //           setGetInguiredId({
  //             inguireId: doc.data().inguireId,              
  //           });
  //         });
  //       };
  //       fetchData();
    
  // }, []);


  useEffect(() => {
  
        const fetchData = async () => {
          const timestamp = ("timestamp", "desc");
          const citiesRef = collection(db, "posts");
          const querySnapshot = query(citiesRef
            // , where("uid", "==", uid)
          );
          orderBy(timestamp);
          const snapshot = await getDocs(querySnapshot);
          snapshot.docs.forEach((doc) => {
            setGetInguiredId({
              inguireId:doc.data().inguireId
            });
          });
        };
        fetchData();
      
  }, []);








  
  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();
    const hours = today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const time = today.toLocaleDateString();
     try {
      // const inquireId = product?.inquireId; 

      const inguireRef = addDoc(collection(db, "inquire"), {
        customerDisplayName: customerDisplayName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        customerMessage: customerMessage,
        product: product,
        hourJoined: hours,
        createdAt: today,
        inguireId:getInguireId.inguireId,
        // inquireId: inquireId, 
        // postTime: date,
        dateJoined: time,
      });
      console.log("Inguire sumbitted successfully", inguireRef);
      setShowPopup(false);
    } catch (error) {
      console.log("Error sumbiting inguire", error);
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <main>
      <section>
        <div className="upContainer">
          <div className="upContent">
            <div className="upImg">
              <img src={product?.image} alt="imagedetail" />
            </div>
            <div className="upInfo">
              <div className="imageInfo">
                <div className="imageInfoView">
                  <h2>{product?.displayName}</h2>
                  <div className="detNameInfo">
                    <h2>
                      {product?.name}
                    </h2>
                    <h2>
                      {product?.year}
                    </h2>
                  </div>
                  <h2>{product?.rarity}</h2>
                  <h2>{product?.artSize}</h2>

                  {/* <h3 className=''>{`$${product?.price}`}</h3> */}
                  {/* <h2 className=''>Shipping fee {`$${product?.shipfee}`}</h2> */}

                  {/* <div className='count'>
                  {isCartAdded < 0 ? null : (
<>
  <button
    className="countbtn"
    onClick={() => decreaseCart(product)}
  >
    -
  </button>
  <p>
    <b>{cart.cartQuantity}</b>
  </p>
  <button
    className="btn"
    onClick={() => addToCart(product)}
  >
    +
  </button>
</>
 )}
 </div> */}

                  {/* <a>
 <button className='btn'
  onClick={() => addToCart(product)}
 >Add to Cart</button>
 </a> */}

                  <div>
                    <h2>{product?.desc}</h2>
                  </div>

                  <div className="inguireProdContainer">
                    <h2>Inguire ID:{product?.inguireId}</h2>
                    <button onClick={openPopup}>Inguire</button>

                    {showPopup && (
                      <div className="popupStyles">
                        <div className="popupContentStyles">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={customerDisplayName}
                            onChange={handleDisplayNameInputChange}
                            className="inputStyles"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Email Address"
                            value={customerEmail}
                            onChange={handleEmailInputChange}
                            className="inputStyles"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={customerPhone}
                            onChange={handlePhoneInputChange}
                            className="inputStyles"
                            required
                          />
                          <textarea
                            placeholder="Hi, I'm interested in purchasing this work. Could you please provide more information about the piece?"
                            value={customerMessage}
                            onChange={handleInputChange}
                            required
                            className="inputStyles"
                          />
                          <button onClick={handleSubmit}>Submit</button>
                          <button onClick={closePopup}>Close</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='hr'><hr></hr>  </div> */}
          <div className="aboutArtWork">
            <h2>About the work</h2>
            <div className="abtArtWork">
              <div className="abtArtWorkinpt">
                <h2>Material:</h2>
                <h2>{product?.material} </h2>
              </div>
              <div className="abtArtWorkinpt">
                <h2>Medium: </h2>
                <h2> {product?.medium}</h2>
              </div>

              <div className="abtArtWorkinpt">
                <h2>Signature: </h2>
                <h2>{product?.sign}</h2>
              </div>

              <div className="abtArtWorkinpt">
                <h2>Frame: </h2>
                <h2>{product?.frame}</h2>
              </div>
              <div className="abtArtWorkinpt">
                <h2>Special Features: </h2>
                <h2>{product?.specialfeature}</h2>
              </div>
              <div className="abtArtWorkinpt">
                <h2>Ship from: </h2>
                <h2>{product?.country}</h2>
              </div>
            </div>
          </div>

          <div className="ArtistImgViewConProf">
            <div className="ArtistImgViewContProf">
              {/* <div className='ArtistImgViewConDet'>
           <div className='ArtistImgViewConDet'>
           <img src='https://images.unsplash.com/photo-1686594094819-0685648e8925?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60' alt="profile" />
            <div className='ArtistImgViewConDetNames'>
              <h2>{product?.displayName}</h2>
              <h4>{product?.country}</h4>
            </div>
           </div>
           <div className='btn'>
           <button>Follow</button>
           </div>
           </div>
           <div className='ArtistIamgeViewStory'>
           <h2>
            {artistInfo?.displayName}
           </h2>
           </div> */}
            </div>

            {/* <Card cardClass='reviewcard'>
          <h1>Product Reviews</h1>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
  {filteredReviews.map((item, index) => {
    const { rate, review, reviewDate, userName, image } = item;
    return (
      <div key={index} className='reviewcontainer'>
         <div className='reviewcont'>
         <h1>
          <b>{userName}</b>
        </h1>
        
        <h2>
          <b>{reviewDate}</b>
        </h2>
        <StarsRating value={rate} className="rating" />        
        <p>{review}</p>
        <img src={image}
        style={{width: '50%', 
        marginTop: '20px',marginBottom: '20px', backgroundClip: '#f5f5f5', height: '50%'}}  alt='productreviewimage'/>
         </div>
        
        <hr style={{width: '100%', marginTop: '20px',marginBottom: '20px', backgroundClip: '#f5f5f5'}}></hr>
        
      </div>
    );
  })}
</>
            )}
          </div>
        </Card> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
